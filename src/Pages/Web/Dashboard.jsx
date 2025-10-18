import { FaTruck, FaShoppingBag, FaHeart, FaBoxOpen } from "react-icons/fa";
import React, { useState } from "react";
import Layout from "../Layout/Layout";
import NewAddressModal from "./Modal/NewAddressModal";

const Dashboard = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [summaryCards] = useState([
    {
      id: 1,
      title: "On Going Order",
      count: 57,
      icon: <FaTruck />,
      color: "green",
    },
    {
      id: 2,
      title: "Products in Cart",
      count: 2,
      icon: <FaShoppingBag />,
      color: "pink",
    },
    {
      id: 3,
      title: "Products in Wishlist",
      count: 11,
      icon: <FaHeart />,
      color: "red",
    },
    {
      id: 4,
      title: "Products Ordered",
      count: 64,
      icon: <FaBoxOpen />,
      color: "blue",
    },
  ]);

  const [cartItems] = useState([
    {
      id: 1,
      store: "Razin Shop",
      brand: "Samsung",
      name: "HDR 4K UHD Smart QLED TV",
      price: 319.0,
      quantity: 1,
      rating: 5,
    },
  ]);

  const [recentlyViewed] = useState([
    {
      id: 1,
      name: "Hyaluronic Acid Hydrating Face Mask",
      price: 250.0,
      sold: 1,
    },
    {
      id: 2,
      name: "Fitbit Charge 6 Fitness Tracker",
      price: 1000.0,
      originalPrice: 1200.0,
      discount: "16.67% OFF",
      sold: 13,
    },
  ]);

  return (
    <>
      {/* Main Content */}
      <div className="space-y-6">
        {/* Summary Cards and Address Section */}
        <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
          {/* Summary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1">
            {summaryCards.map((card) => (
              <div
                key={card.id}
                className={`bg-white p-4 h-20 md:h-24 rounded-lg shadow hover:shadow-md transition-shadow flex items-center justify-between border ${
                  card.color === "green"
                    ? "border-green-200"
                    : card.color === "pink"
                    ? "border-pink-200"
                    : card.color === "red"
                    ? "border-red-200"
                    : "border-blue-200"
                }`}
              >
                <div>
                  <p className="text-xl md:text-2xl font-bold">{card.count}</p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {card.title}
                  </p>
                </div>
                <div
                  className={`text-xl md:text-2xl ${
                    card.color === "green"
                      ? "text-green-500"
                      : card.color === "pink"
                      ? "text-pink-500"
                      : card.color === "red"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address Section */}
          <div className="bg-white rounded-lg shadow p-4 w-full xl:w-[400px]">
            <h3 className="text-base md:text-lg mb-4">
              Default Shipping Address
            </h3>
            <div className="border-b border-gray-300 mb-4"></div>
            <div
              onClick={() => setShowAddressModal(true)}
              className="border border-dashed border-red-300 rounded p-4 md:p-6 text-center hover:bg-red-50 transition-colors cursor-pointer"
            >
              <p className="text-gray-500 text-sm md:text-base mb-2">
                No address added yet
              </p>
              <p className="text-pink-600 font-semibold text-sm md:text-base">
                Click to add new address
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* My Cart Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-base md:text-lg mb-4">
              My Cart ({cartItems.length} items)
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded hover:shadow-md transition-shadow"
                >
                  <img
                    src="https://demo.readyecommerce.app/storage/products/mptfI9Kme2RzWCQdcsAzE8zJSmoroAQ3I4T7RO0R.jpg"
                    alt="product"
                    className="w-full sm:w-20 h-16 object-cover rounded"
                  />
                  <div className="flex-1 w-full">
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.brand}
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {item.name}
                    </p>
                    <p className="text-pink-600 font-semibold text-sm sm:text-base">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center border rounded overflow-hidden self-end sm:self-auto">
                    <button className="px-3 py-1 hover:bg-gray-100 text-sm">
                      -
                    </button>
                    <span className="px-3 py-1 text-sm">{item.quantity}</span>
                    <button className="px-3 py-1 hover:bg-gray-100 text-sm">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition-colors text-sm md:text-base">
              Proceed to Checkout
            </button>
          </div>

          {/* Recently Viewed Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-base md:text-lg mb-4">
              Recently Viewed
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {recentlyViewed.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 border rounded hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded flex-shrink-0">
                    <img
                      src="https://demo.readyecommerce.app/storage/products/C4NZOMVlvqCWAumyJT9iyP8bTQ2zrR38jQJTZ0nx.png"
                      alt="recent"
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-1 md:gap-2">
                      <p className="text-pink-600 font-semibold text-sm">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.originalPrice && (
                        <>
                          <p className="text-xs text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-red-500 bg-red-100 px-1 rounded">
                            {product.discount}
                          </p>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{product.sold} Sold</p>
                  </div>
                  <button className="text-xs md:text-sm text-pink-600 hover:underline flex-shrink-0">
                    Buy Now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <NewAddressModal onClose={() => setShowAddressModal(false)} />
      )}
    </>
  );
};

export default Dashboard;
