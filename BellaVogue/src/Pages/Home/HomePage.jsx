import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../ContextAPI/CartContext";
import { WishlistContext } from "../../ContextAPI/WishlistContext";
import ProductCard from "../../Components/Common/ProductCard";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import API from "../../api/api";

export default function HomePage() {
  const { addToCart, isInCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  const navigate = useNavigate();

 
    useEffect(() => {
    API.get("/api/products/").then((res) => {
      setProducts(res.data.slice(0, 8));
    });
  }, []);

 
    useEffect(() => {
    API.get("/api/banners/").then((res) => {
      setBanners(res.data);
    });
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div>
      <Navbar/>
      {banners.length > 0 && (
        <div
          className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center text-white transition-all duration-1000"
          style={{
            backgroundImage: `url(${banners[currentBanner].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold">BellaVogue</h1>
            <p className="text-3xl mt-2">Accessories</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              Shop Now
            </button>
          </div>

          <div className="absolute bottom-5 flex space-x-2">
            {banners.map((banner, idx) => (
              <span
                key={banner.id}
                className={`w-3 h-3 rounded-full ${
                  idx === currentBanner ? "bg-white" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 md:px-12 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Featured Products
        </h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
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
            Loading products...
          </p>
        )}
      </div>
      <Footer/>
    </div>
  );
}

