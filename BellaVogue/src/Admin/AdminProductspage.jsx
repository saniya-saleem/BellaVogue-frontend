import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminBar/AdminSidebar";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    img: "",
    stock: "",
    category: "",
    rating: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleAdd = () => {
    if (!validateForm()) {
      alert("All fields are required!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: form.name,
      price: parseFloat(form.price) || 0,
      img: form.img,
      stock: parseInt(form.stock, 10) || 0,
      category: form.category,
      rating: parseFloat(form.rating) || 0,
    };

    axios.post("http://localhost:5000/products", newProduct).then(() => {
      setProducts([...products, newProduct]);
      setForm({
        name: "",
        price: "",
        img: "",
        stock: "",
        category: "",
        rating: "",
      });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      img: p.img,
      stock: p.stock,
      category: p.category || "",
      rating: p.rating || "",
    });
    setEditId(p.id);
  };

  const handleSave = () => {
    if (!validateForm()) {
      alert("All fields are required!");
      return;
    }

    const updatedProduct = {
      ...form,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0,
      rating: parseFloat(form.rating) || 0,
    };

    axios.put(`http://localhost:5000/products/${editId}`, updatedProduct).then(() => {
      const updated = products.map((p) =>
        p.id === editId ? { ...updatedProduct, id: editId } : p
      );
      setProducts(updated);
      setEditId(null);
      setForm({
        name: "",
        price: "",
        img: "",
        stock: "",
        category: "",
        rating: "",
      });
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-full bg-white shadow-md border-r">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Admin Product Management
        </h1>
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="text"
              name="img"
              placeholder="Image URL"
              value={form.img}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="number"
              step="0.1"
              max="5"
              name="rating"
              placeholder="Rating (0-5)"
              value={form.rating}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {editId ? (
            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
            >
               Save Changes
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
            >
              + Add Product
            </button>
          )}
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-3 text-left">Image</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Price</th>
                <th className="border p-3 text-left">Stock</th>
                <th className="border p-3 text-left">Category</th>
                <th className="border p-3 text-left">Rating</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border p-3">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-3 font-medium">{p.name}</td>
                  <td className="border p-3">₹{Number(p.price).toFixed(2)}</td>
                  <td className="border p-3">
                    {p.stock > 0 ? (
                      p.stock
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Out of stock
                      </span>
                    )}
                  </td>
                  <td className="border p-3">{p.category}</td>
                  <td className="border p-3">{p.rating}</td>
                  <td className="border p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow"
                    >
                       Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
