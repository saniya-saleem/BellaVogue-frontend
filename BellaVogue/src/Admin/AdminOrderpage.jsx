// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import AdminSidebar from "../Components/AdminBar/AdminSidebar";
// // import { getAllOrders , updateOrderStatus } from "../api/adminApi";

// // export default function AdminOrderpage() {
// //   const [orders, setOrders] = useState([]);

// //   // useEffect(() => {
// //   //   axios
// //   //     .get("http://localhost:3001/orders")
// //   //     .then((res) => {
// //   //       setOrders(res.data);
// //   //     })
// //   //     .catch((err) => console.error("Error fetching orders:", err));
// //   // }, []);

// //     useEffect(() => {
// //       getAllOrders()
// //         .then((res) => {
// //           setOrders(res.data);
// //         })
// //         .catch((err) => {
// //           console.error("Error fetching orders:", err);
// //         })
// //         .finally(() => setLoading(false));
// //     }, []);
  

// //  const updateOrderStatus = async (orderId, currentStatus) => {
// //     let nextStatus =
// //       currentStatus === "Pending"
// //         ? "Shipped"
// //         : currentStatus === "Shipped"
// //         ? "Delivered"
// //         : currentStatus;

// //     try {
// //       await updateOrderStatus(orderId, nextStatus);

// //       setOrders((prev) =>
// //         prev.map((o) =>
// //           o.id === orderId ? { ...o, status: nextStatus } : o
// //         )
// //       );
// //     } catch (err) {
// //       console.error("Status update failed:", err);
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gray-100">
// //       <div className="w-64 h-screen fixed">
// //         <AdminSidebar />
// //       </div>
// //       <div className="flex-1 ml-64 p-6">
// //         <h2 className="text-2xl font-bold mb-6 text-gray-800">
// //           Admin Orders
// //         </h2>

// //         <div className="overflow-x-auto">
// //           <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
// //             <thead className="bg-gray-200 text-gray-700">
// //               <tr>
// //                 <th className="px-6 py-3 text-left">Order ID</th>
// //                 <th className="px-6 py-3 text-left">Customer</th>
// //                 <th className="px-6 py-3 text-left">Date</th>
// //                 <th className="px-6 py-3 text-left">Amount</th>
// //                 <th className="px-6 py-3 text-left">Status</th>
// //                 <th className="px-6 py-3 text-left">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {orders.length > 0 ? (
// //                 orders.map((order) => (
// //                   <tr
// //                     key={order.id}
// //                     className="border-b hover:bg-gray-50 transition"
// //                   >
// //                     <td className="px-6 py-3 font-medium text-gray-800">
// //                       {order.id}
// //                     </td>
// //                     <td className="px-6 py-3">{order.customer}</td>
// //                     <td className="px-6 py-3">{order.date}</td>
// //                     <td className="px-6 py-3">₹{order.amount}</td>
// //                     <td
// //                       className={`px-6 py-3 font-semibold ${
// //                         order.status === "Pending"
// //                           ? "text-yellow-600"
// //                           : order.status === "Shipped"
// //                           ? "text-blue-600"
// //                           : "text-green-600"
// //                       }`}
// //                     >
// //                       {order.status}
// //                     </td>
// //                     <td className="px-6 py-3 flex gap-2">
// //                       <button
// //                         onClick={() =>
// //                           updateOrderStatus(order.id, order.status)
// //                         }
// //                         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
// //                       >
// //                         Update Status
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td
// //                     colSpan="6"
// //                     className="text-center py-6 text-gray-500 font-medium"
// //                   >
// //                     No orders found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../Components/AdminBar/AdminSidebar";
// import {
//   getAllOrders,
//   updateOrderStatus as updateOrderStatusAPI,
// } from "../api/adminApi";

// export default function AdminOrderpage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllOrders()
//       .then((res) => {
//         setOrders(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleStatusUpdate = async (orderId, currentStatus) => {
//     let nextStatus =
//       currentStatus === "Pending"
//         ? "Shipped"
//         : currentStatus === "Shipped"
//         ? "Delivered"
//         : currentStatus;

//     try {
//       await updateOrderStatusAPI(orderId, nextStatus);

//       setOrders((prev) =>
//         prev.map((o) =>
//           o.id === orderId ? { ...o, status: nextStatus } : o
//         )
//       );
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="w-64 fixed h-screen">
//         <AdminSidebar />
//       </div>

//       <div className="flex-1 ml-64 p-6">
//         <h2 className="text-2xl font-bold mb-6">Admin Orders</h2>

//         {loading ? (
//           <p>Loading orders...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow rounded-lg">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-3 text-left">Order ID</th>
//                   <th className="p-3 text-left">User</th>
//                   <th className="p-3 text-left">Date</th>
//                   <th className="p-3 text-left">Total</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {orders.length ? (
//                   orders.map((order) => (
//                     <tr key={order.id} className="border-b">
//                       <td className="p-3">{order.id}</td>
//                       <td className="p-3">{order.email || order.user}</td>
//                       <td className="p-3">
//                         {new Date(order.created_at).toLocaleDateString()}
//                       </td>
//                       <td className="p-3">₹{order.total}</td>
//                       <td className="p-3 font-semibold">{order.status}</td>
//                       <td className="p-3">
//                         {order.status !== "Delivered" && (
//                           <button
//                             onClick={() =>
//                               handleStatusUpdate(order.id, order.status)
//                             }
//                             className="px-4 py-2 bg-blue-500 text-white rounded"
//                           >
//                             Update Status
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center p-6">
//                       No orders found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminBar/AdminSidebar";
import {
  getAllOrders,
  updateOrderStatus as updateOrderStatusAPI,
} from "../api/adminApi";

export default function AdminOrderpage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (orderId, currentStatus) => {
    const nextStatus =
      currentStatus === "Pending"
        ? "Shipped"
        : currentStatus === "Shipped"
        ? "Delivered"
        : currentStatus;

    try {
      await updateOrderStatusAPI(orderId, nextStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: nextStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-64 fixed h-screen bg-white border-r shadow-sm">
        <AdminSidebar />
      </div>

      {/* Main */}
      <div className="flex-1 ml-64 p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🧾 Orders</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all customer orders
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading orders...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="p-4 text-left">Order</th>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.length ? (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-none hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-semibold text-indigo-600">
                        #{order.id}
                      </td>

                      <td className="p-4 text-gray-700">
                        User #{order.user}
                      </td>

                      <td className="p-4 text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>

                      <td className="p-4 font-semibold">
                        ₹{order.total}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        {order.status !== "Delivered" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, order.status)
                            }
                            className="px-4 py-2 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition"
                          >
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

