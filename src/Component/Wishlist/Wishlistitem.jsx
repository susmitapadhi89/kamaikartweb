import { ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

const WishlistItem = ({ item, onRemove }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    alert(`Added ${item.name} to cart!`);
  };

  return (
    <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col sm:flex-row sm:items-start hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 relative overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        )}
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-500
            ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
        <div className="flex-1 mb-3 sm:mb-0">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2">
            {item.name}
          </h3>

          {/* Description - Hidden on mobile to save space */}
          <p className="text-gray-600 text-sm mb-2 line-clamp-2 hidden sm:block">
            {item.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs sm:text-sm ${
                    i < Math.floor(item.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-500 ml-2">
              ({item.rating})
            </span>
          </div>

          {/* Price - Mobile Layout */}
          <div className="sm:hidden mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ₹{item.price}
              </span>
              {item.originalPrice && item.originalPrice > item.price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{item.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 capitalize mt-1 block">
              {item.category}
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Price - Desktop Layout */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{item.price}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{item.originalPrice}
              </span>
            )}
            <span className="text-xs text-gray-500 capitalize">
              {item.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-w-[100px]"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="text-xs sm:text-sm">Add to Cart</span>
            </button>

            <button
              onClick={onRemove}
              className="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
              title="Remove from Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
