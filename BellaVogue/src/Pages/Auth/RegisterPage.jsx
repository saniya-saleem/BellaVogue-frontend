import React,{useState} from "react";
import axios from "axios"
import { Eye, EyeOff, ShoppingBag, Sparkles, User, Mail, Lock } from "lucide-react";
import {Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
export default function RegisterPage(){
   const [showPassword,setShowPassword]=useState(false)
   const [showConfirmPassword,setConfirmPassword]=useState(false);
   const navigate=useNavigate();

  const[formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
      ...prev,
     [name]:value,
    }));
  }

const handleRegister=async (e)=>{
  e.preventDefault();

  if (formData.password !== formData.confirmPassword){
   toast.error("your password does not match");
    return;
  }
  else if(formData.password.length <=3){
    toast.error("your password must be greater than three character")
    return;
  }
  try{
    const {data} =await axios.get(`http://localhost:5000/users`, {
        params:{email:formData.email},

})
   if(data.length >0){
    toast("user already exists!!");
    return;

   }
  
  const newUser={
    name:`${formData.firstName} ${formData.lastName}`,
    email:formData.email,
    password:formData.password,
    role:"user",
    isBlock:false,
    cart:[],
    orders:[],
    wishlist:[], 
  };
  await axios.post("http://localhost:5000/users",newUser);

  toast.success("registration successful! you can now login.");
  setFormData({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword :"",
  })
  navigate("/login")
}

catch(err){
  console.error("error registering user:",err);
  alert("something went wrong. please try again")
}
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-indigo-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-2xl mb-4 shadow-lg">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Create Your Account</h2>
            <p className="text-gray-600">Join BellaVogue and start shopping ✨</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-gray-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-gray-50/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-gray-50/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-gray-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-700" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-gray-50/50"
                />
                <button
                  type="button"
                  onClick={() => setConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
             <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Sign in here
             </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
