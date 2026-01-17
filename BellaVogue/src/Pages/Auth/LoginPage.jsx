import React, { useState, useContext, useEffect } from "react";
import { Eye, EyeOff, ShoppingBag, Heart, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextAPI/AuthContext";
import API from "../../api/api";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

 
  useEffect(() => {
    if (user) {
      if (user.is_staff) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("login/", {
        email: form.email,
        password: form.password,
      });

      if (res.data.user.is_blocked) {
        toast.error("🚫 Your account is blocked. Please contact admin.");
        return;
      }

      login(res.data.user, {
        access: res.data.access,
        refresh: res.data.refresh,
      });

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };


return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-indigo-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-2xl mb-4 shadow-lg">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Welcome Back</h2>
            <p className="text-gray-600">Log in to continue shopping ✨</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                Email Address
                <Heart className="w-4 h-4 text-indigo-500" />
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 bg-gray-50/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                Password
                <Sparkles className="w-4 h-4 text-indigo-500" />
              </label>
              <div className="relative">
                <input
                  type={form.showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 bg-gray-50/50"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {form.showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-blue text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <Heart className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/register"
              className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}