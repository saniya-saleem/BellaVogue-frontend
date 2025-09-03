import React, { useEffect, useState } from "react";
import { Ban, CheckCircle, Search } from "lucide-react";
import AdminSidebar from "../Components/AdminBar/AdminSidebar";
import axios from "axios";


export default function AdminUserpage() {
const [users,setUsers]=useState([])

   
 useEffect (()=>{
    axios.get("http://localhost:5000/users")
    .then(res => setUsers(res.data))
    .catch(err => console.error(err))
 },[]);            
  
   const handletogglebutton = async (id)=>{
    try{
      setUsers(users.map((u)=>(
        u.id === id ?{...u,status:u.status==="active"?"blocked":"active"}
        : u
      )))

      const user= users.find((u)=> u.id===id);
      await axios.patch(`http://localhost:5000/users/${id}`,{
        status:user.status ==="active"?"blocked":"active",
      }) 
    }
    catch(error){
      console.error("error uppdating user:",error)
      }
   }

  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed h-full bg-gray-100 shadow-lg">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold">👥 Manage Users</h1>
            <div className="flex items-center gap-2">
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Joined</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{user.id}</td>
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3 text-gray-600">{user.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "Seller"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">{user.joined}</td>
                    <td className="p-3">
                      {user.status === "active" ? (
                        <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle className="h-4 w-4" /> Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full flex items-center gap-1 w-fit">
                          <Ban className="h-4 w-4" /> Blocked
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                        <button onClick={()=>handletogglebutton(user.id)}
                         className={`px-4 py-1 rounded-lg flex items-center gap-1 text-white 
                          ${
                            user.status==="active"
                            ?"bg-red-500 hover:bg-red-600"
                            :"bg-green-500 hover:bg-green-600"
                          }`}>
                            {user.status ==="active"?(
                              <Ban className="h-4 w-4" /> 
                            ):(
                              <CheckCircle className="h-4 w-4"/>
                            )}
                            {user.status ==="active"? "Block":"Unblock"}
                          
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
