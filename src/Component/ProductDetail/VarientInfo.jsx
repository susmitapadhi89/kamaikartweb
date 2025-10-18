import { FaHeart, FaShoppingBag } from "react-icons/fa";

export const VariantInfo = ({
  canAddToCart,
  isWishlist,
  toggleWishlist,
  handleAddToCart,
  handleBuyNow,
}) => {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="flex-1 bg-white border-2 border-blue-500 text-blue-600 py-4 px-6 rounded-xl font-bold hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
        >
          <FaShoppingBag />
          ADD TO BAG
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!canAddToCart}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg shadow-blue-200"
        >
          BUY NOW
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className={`w-full py-4 border-2 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-lg ${
          isWishlist
            ? "border-red-500 text-red-600 bg-red-50"
            : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        <FaHeart className={isWishlist ? "fill-current text-red-500" : ""} />
        {isWishlist ? "ADDED TO WISHLIST" : "ADD TO WISHLIST"}
      </button>
    </div>
  );
};
