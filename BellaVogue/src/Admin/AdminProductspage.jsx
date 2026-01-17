import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/adminApi";
import AdminSidebar from "../Components/AdminBar/AdminSidebar";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    img: "",
    stock: "",
    category: "",
    rating: "",
  });

 
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      img: "",
      stock: "",
      category: "",
      rating: "",
    });
    setEditId(null);
  };

  const validateForm = () => {
    return (
      form.name.trim() &&
      form.price !== "" &&
      form.img.trim() &&
      form.stock !== "" &&
      form.category.trim() &&
      form.rating !== ""
    );
  };

  const handleAdd = async () => {
    if (!validateForm()) {
      alert("All fields are required!");
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      image: form.img,
      stock: Number(form.stock),
      rating: Number(form.rating),
      category: form.category,
    };

    try {
      await createProduct(payload);
      await fetchProducts(); 
      resetForm();
    } catch (err) {
      console.error("Create product error:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      img: p.image,
      stock: p.stock,
      category: p.category?.name || "",
      rating: p.rating || "",
    });
    setEditId(p.id);
  };


  const handleSave = async () => {
    if (!validateForm()) {
      alert("All fields are required!");
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      image: form.img,
      stock: Number(form.stock),
      rating: Number(form.rating),
      category: form.category,
    };

    try {
      await updateProduct(editId, payload);
      await fetchProducts();
      resetForm();
    } catch (err) {
      console.error("Update product error:", err.response?.data);
    }
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      await fetchProducts(); 
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      
      <div className="w-64 fixed h-screen bg-white border-r shadow-sm">
        <AdminSidebar />
      </div>

     
      <div className="flex-1 ml-64 p-10">
       
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📦 Products</h1>
          <p className="text-gray-500 mt-1">
            Create, update and manage store products
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-lg font-semibold mb-4">
            {editId ? "Edit Product" : "Add New Product"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="img"
              placeholder="Image URL"
              value={form.img}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="category"
              placeholder="Category (rings, bangles...)"
              value={form.category}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              step="0.1"
              max="5"
              name="rating"
              placeholder="Rating (0–5)"
              value={form.rating}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="mt-6 flex gap-4">
            {editId ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                + Add Product
              </button>
            )}
          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-semibold">{p.name}</span>
                  </td>

                  <td className="p-4">₹{Number(p.price).toFixed(2)}</td>

                  <td className="p-4">
                    {p.stock > 0 ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        In Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                      {p.category?.name || "—"}
                    </span>
                  </td>

                  <td className="p-4">{p.rating}</td>

                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-6 text-center text-gray-500"
                  >
                    No products found
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
