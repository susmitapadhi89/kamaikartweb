import { useState } from "react";
import ProductCard from "./ProductCard";
import { useEffect } from "react";

export default function ProductSlider() {
  const [loading, setLoading] = useState(true);

  // Example Products
  const allProducts = [
    {
      id: 1,
      name: "Sony A6400 Mirrorless Camera With 18-135mm Lens",
      img: "https://demo.readyecommerce.app/storage/products/PSdePmoWJmQlpmd6pc2nulgpBo3nOuCUbct6kzyX.jpg",
      price: 1800,
      oldPrice: null,
      discount: null,
      rating: 0,
      reviews: 0,
      sold: 5,
      isWishlist: true,
      badge: null,
    },
    {
      id: 2,
      name: "Freeman Beauty Korean Cica Soothing Clay Mask",
      img: "https://demo.readyecommerce.app/storage/products/jmqhBMHVDJ4bZeuPyUjRB0xzZEiPZoj7INmcmILF.png",
      price: 60,
      oldPrice: null,
      discount: null,
      rating: 0,
      reviews: 0,
      sold: 6,
      isWishlist: true,
      badge: null,
    },
    {
      id: 3,
      name: "Polar H10 Heart Rate Monitor Chest Strap - ANT + Bluetooth, Waterproof HR Sensor for Men and Women",
      img: "https://demo.readyecommerce.app/storage/products/Z6XrQYfPGDbQumsLQgBDz4gwsl7pebHi7RFW2fP5.png",
      price: 2300,
      oldPrice: 2600,
      discount: "11.54%",
      rating: 0,
      reviews: 0,
      sold: 3,
      isWishlist: true,
      badge: "Sale",
    },
    {
      id: 4,
      name: "Canon EOS Rebel T3i 18.0MP Digital SLR Camera Kit - Black (5169B003)",
      img: "https://demo.readyecommerce.app/storage/products/gTaN4totkHPVorI4zxQBwa5UhjGC6I6YryccDlWc.webp",
      price: 375,
      oldPrice: 380,
      discount: "1.32%",
      rating: 0,
      reviews: 0,
      sold: 1,
      isWishlist: true,
      badge: "Sale",
    },
    {
      id: 5,
      name: "Smart Watch",
      img: "https://demo.readyecommerce.app/storage/products/mze8v7eP9mSDS9VW7Z4xL3g750N6rpSdXKahcYjY.png",
      price: 121,
      oldPrice: 129,
      discount: "6.2%",
      rating: 0,
      reviews: 0,
      sold: 10,
      isWishlist: true,
      badge: "Sale",
    },
    {
      id: 5,
      name: "Smart Watch",
      img: "https://demo.readyecommerce.app/storage/products/mze8v7eP9mSDS9VW7Z4xL3g750N6rpSdXKahcYjY.png",
      price: 121,
      oldPrice: 129,
      discount: "6.2%",
      rating: 0,
      reviews: 0,
      sold: 10,
      isWishlist: true,
      badge: "Sale",
    },
    {
      id: 5,
      name: "Smart Watch",
      img: "https://demo.readyecommerce.app/storage/products/mze8v7eP9mSDS9VW7Z4xL3g750N6rpSdXKahcYjY.png",
      price: 121,
      oldPrice: 129,
      discount: "6.2%",
      rating: 0,
      reviews: 0,
      sold: 10,
      isWishlist: true,
      badge: "Sale",
    },
  ];

  const categories = ["Electronics", "Furniture", "Lighting", "Decoration"];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(20000);
  const [sortBy, setSortBy] = useState("popular");

  // 👉 Filtering logic
  let filteredProducts = allProducts.filter((p) => {
    const inCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);
    const inPrice = p.price <= priceRange;
    return inCategory && inPrice;
  });

  // 👉 Sorting logic
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // 👉 Handle Category Change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    // Show skeleton for 10 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Skeleton placeholder
  const skeletons = Array(8).fill(0);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        {/* Sidebar Filters
        <aside className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Categories</h3>
          <div className="space-y-3 mb-6">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="accent-blue-600"
                />{" "}
                {cat}
              </label>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4">Price</h3>
          <input
            type="range"
            min="0"
            max="20000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-sm text-gray-500 mt-2">
            Price Range: ₹0 - ₹{priceRange}
          </p>
        </aside> */}

        {/* Product Grid Section */}
        <div className="lg:col-span-3">
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-6 p-4">
            {loading
              ? skeletons.map((_, index) => (
                  <div
                    key={index}
                    className="relative bg-white border rounded-xl p-4 shadow-sm animate-pulse"
                  >
                    {/* Discount Badge */}
                    <div
                      style={{ marginLeft: "150px" }}
                      className="absolute top-2 right-2 bg-gray-300 rounded px-2 py-1 w-12 h-5"
                    ></div>

                    {/* Wishlist Heart */}
                    <div className="absolute top-2 left-2 w-5 h-5 bg-gray-300 rounded-full"></div>

                    {/* Product Image */}
                    <div className="mx-auto h-36 w-full bg-gray-200 rounded mb-3"></div>

                    {/* Product Name */}
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>

                    {/* Price */}
                    <div className="flex justify-center gap-2 mb-2">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-10"></div>
                    </div>

                    {/* Rating & Sold */}
                    <div className="flex justify-between text-xs mt-1 mb-2">
                      <div className="h-3 bg-gray-300 rounded w-12"></div>
                      <div className="h-3 bg-gray-300 rounded w-12"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 h-8 bg-gray-300 rounded-lg"></div>
                      <div className="flex-1 h-8 bg-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                ))
              : filteredProducts.map((p) => (
                  <ProductCard key={p.id} item={p} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
