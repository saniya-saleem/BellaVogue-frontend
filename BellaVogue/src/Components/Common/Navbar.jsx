import React from "react";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // 🔎 Later: you can add filtering logic or route to /search
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          BellaVogue
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 text-gray-700 font-medium">
            <a href="#" className="hover:text-pink-500 transition">Home</a>
            <a href="#" className="hover:text-pink-500 transition">Shop</a>
            <a href="#" className="hover:text-pink-500 transition">About</a>
            <a href="#" className="hover:text-pink-500 transition">Contact</a>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative ml-6"
          >
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </form>
        </div>

        {/* Icons */}
        <div className="flex gap-5 items-center">
          <Heart className="w-6 h-6 text-pink-500 cursor-pointer hover:scale-110 transition" />
          <ShoppingBag className="w-6 h-6 text-purple-600 cursor-pointer hover:scale-110 transition" />

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium shadow-lg">
          <a href="#" className="hover:text-pink-500 transition">Home</a>
          <a href="#" className="hover:text-pink-500 transition">Shop</a>
          <a href="#" className="hover:text-pink-500 transition">About</a>
          <a href="#" className="hover:text-pink-500 transition">Contact</a>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mt-2">
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </form>
        </div>
      )}
    </header>
  );
}
