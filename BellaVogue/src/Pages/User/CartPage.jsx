// import React, { useState } from "react";
// import { Trash2, ShoppingBag } from "lucide-react";

// export default function CartPage() {
//   const [cart, setCart] = useState([
//     { id: 1, name: "Gold Necklace", price: 1200, qty: 1, img: "https://via.placeholder.com/80" },
//     { id: 2, name: "Pearl Earrings", price: 800, qty: 2, img: "https://via.placeholder.com/80" },
//     { id: 3, name: "Diamond Ring", price: 2500, qty: 1, img: "https://via.placeholder.com/80" },
//   ]);

//   // Update quantity
//   const updateQty = (id, newQty) => {
//     setCart(cart.map(item =>
//       item.id === id ? { ...item, qty: newQty > 0 ? newQty : 1 } : item
//     ));
//   };

//   // Remove item
//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   // Calculate totals
//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-10">
//       <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
//         <ShoppingBag className="text-pink-600" /> Your Cart
//       </h2>

//       {cart.length === 0 ? (
//         <p className="text-gray-600 text-lg">🛒 Your cart is empty!</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="md:col-span-2 space-y-4">
//             {cart.map(item => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between bg-white shadow-md rounded-2xl p-4"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     className="w-20 h-20 rounded-xl object-cover border"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                     <p className="text-pink-600 font-medium">₹{item.price}</p>
//                   </div>
//                 </div>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => updateQty(item.id, item.qty - 1)}
//                     className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     -
//                   </button>
//                   <span className="font-medium">{item.qty}</span>
//                   <button
//                     onClick={() => updateQty(item.id, item.qty + 1)}
//                     className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* Remove Button */}
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 className="w-6 h-6" />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Subtotal</span>
//               <span>₹{subtotal}</span>
//             </div>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Shipping</span>
//               <span className="text-green-600">Free</span>
//             </div>
//             <hr className="my-3" />
//             <div className="flex justify-between text-lg font-bold text-gray-900">
//               <span>Total</span>
//               <span>₹{subtotal}</span>
//             </div>
//             <button className="w-full mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { Trash2, ShoppingBag } from "lucide-react";

// export default function CartPage() {
//   // Sample cart data (later you can connect with localStorage or backend)
//   const [cart, setCart] = useState([
//     { id: 1, name: "Gold Necklace", price: 1200, qty: 1, img: "https://via.placeholder.com/80" },
//     { id: 2, name: "Pearl Earrings", price: 800, qty: 2, img: "https://via.placeholder.com/80" },
//     { id: 3, name: "Diamond Ring", price: 2500, qty: 1, img: "https://via.placeholder.com/80" },
//   ]);

//   // Update quantity
//   const updateQty = (id, newQty) => {
//     setCart(cart.map(item =>
//       item.id === id ? { ...item, qty: newQty > 0 ? newQty : 1 } : item
//     ));
//   };

//   // Remove item
//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   // Calculate totals
//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-10">
//       <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
//         <ShoppingBag className="text-pink-600" /> Your Cart
//       </h2>

//       {cart.length === 0 ? (
//         <p className="text-gray-600 text-lg">🛒 Your cart is empty!</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="md:col-span-2 space-y-4">
//             {cart.map(item => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between bg-white shadow-md rounded-2xl p-4"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     className="w-20 h-20 rounded-xl object-cover border"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                     <p className="text-pink-600 font-medium">₹{item.price}</p>
//                   </div>
//                 </div>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => updateQty(item.id, item.qty - 1)}
//                     className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     -
//                   </button>
//                   <span className="font-medium">{item.qty}</span>
//                   <button
//                     onClick={() => updateQty(item.id, item.qty + 1)}
//                     className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* Remove Button */}
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 className="w-6 h-6" />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Subtotal</span>
//               <span>₹{subtotal}</span>
//             </div>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Shipping</span>
//               <span className="text-green-600">Free</span>
//             </div>
//             <hr className="my-3" />
//             <div className="flex justify-between text-lg font-bold text-gray-900">
//               <span>Total</span>
//               <span>₹{subtotal}</span>
//             </div>
//             <button className="w-full mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
