import React, { useState, useEffect, useContext } from "react";
import API from "../../../api/api";

import { CartContext } from "../../../ContextAPI/CartContext";
import { WishlistContext } from "../../../ContextAPI/WishlistContext";
import ProductCard from "../../../Components/Common/ProductCard";
import Navbar from "../../../Components/Common/Navbar";
import Footer from "../../../Components/Common/Footer";

export default function ProductsPage() {
  const { addToCart, isInCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    API.get("/api/products/")
      .then((res) => {
        setProducts(res.data);

      const uniqueCategories = [
      "All",
      ...new Set(res.data.map((p) => p.category_name)),
];

        setCategories(uniqueCategories);
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
    categoryFilter === "All" ||
    p.category_name === categoryFilter;

      return matchesSearch && matchesCategory;
    });

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-12 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Shop All Products
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-xl border border-gray-300"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInCart={isInCart}
                addToCart={addToCart}
                isInWishlist={isInWishlist}
                handleWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products found
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
