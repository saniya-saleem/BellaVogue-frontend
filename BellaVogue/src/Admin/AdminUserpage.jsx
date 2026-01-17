import React, { useEffect, useState } from "react";
import { Ban, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Components/AdminBar/AdminSideBar";
import { getAllUsers, toggleUserStatus } from "../api/adminApi";

export default function AdminUserpage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Fetch users error:", err));
  }, []);

  
  const handleToggleButton = async (id) => {
    try {
      const res = await toggleUserStatus(id);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, is_active: res.data.is_active } : u
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <div className="w-64 fixed h-screen bg-white border-r">
        <AdminSidebar />
      </div>

     
      <div className="flex-1 ml-64 p-10">
        
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            👥 Users
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage user access and account status
          </p>
        </div>

       
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">



              <tr>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Joined</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-none hover:bg-blue-50/40 transition-colors"
                >
                  
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {user.username}
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: {user.id}
                    </div>
                  </td>

                  
                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>

                 
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      User
                    </span>
                  </td>

                  
                  <td className="p-4 text-gray-500">
                    {new Date(user.date_joined).toLocaleDateString()}
                  </td>

                  
                  <td className="p-4">
                    {user.is_active ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center gap-1 w-fit">
                        <CheckCircle className="h-4 w-4" /> Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 w-fit">
                        <Ban className="h-4 w-4" /> Blocked
                      </span>
                    )}
                  </td>

                  
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        View
                      </button>

                      
                      <button
                        onClick={() => handleToggleButton(user.id)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                          user.is_active
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {user.is_active ? "Block" : "Unblock"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
