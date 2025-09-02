import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Product Management</h1>

      {/* Form */}
      <div className="space-y-2 mb-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2" />
        <input type="text" name="img" placeholder="Image URL" value={form.img} onChange={handleChange} className="border p-2" />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2" />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2" />
        <input type="number" step="0.1" max="5" name="rating" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} className="border p-2" />

        {editId ? (
          <button onClick={handleSave} className="bg-green-500 text-white p-2">Save</button>
        ) : (
          <button onClick={handleAdd} className="bg-blue-500 text-white p-2">Add</button>
        )}
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">
                <img src={p.img} alt={p.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{Number(p.price).toFixed(2)}</td>
              <td className="border p-2">
                {p.stock > 0 ? p.stock : <span className="text-red-500">Out of stock</span>}
              </td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">{p.rating}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
