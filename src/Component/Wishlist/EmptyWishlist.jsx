import { Heart } from "lucide-react";

// In EmptyWishlist.jsx
export const EmptyWishlist = () => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center">
        <Heart className="w-12 h-12 text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Your wishlist is empty
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start exploring our products and add your favorites to your wishlist.
        They'll be waiting for you right here!
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => (window.location.href = "/home")}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-lg hover:from-blue-700 hover:to-orange-700 transition-all transform hover:scale-105"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};
