import { ShoppingBag } from "lucide-react";
import { Heart } from "lucide-react";
import {
  FaStar,
  FaShoppingCart,
  FaCoins,
  FaEye,
  FaHeart,
} from "react-icons/fa";

export default function ProductCard({ item }) {
  return (
    <div
      key={item?.id}
      className="group relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition hover:shadow-md hover:border-[#C71F46]"
    >
      {/* Discount Badge */}
      {item?.discount && (
        <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {item.discount} OFF
        </span>
      )}

      {/* Wishlist Heart */}
      <button
        onClick={() => handleRemove(item.id, item?.name)}
        className="absolute top-2 left-2 text-red-500 hover:text-red-600"
      >
        <Heart className="w-5 h-5 fill-current" style={{ fill: "red" }} />
      </button>

      {/* Product Image → zoom on card hover */}
      <div className="overflow-hidden mb-3">
        <h1>{item}</h1>
        <img
          src={item?.image}
          alt={item?.name}
          className="mx-auto h-36 object-contain transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-sm font-medium text-gray-700 truncate">
        {item?.name}
      </h3>

      {/* Price */}
      <div className="mt-1">
        <span className="text-red-500 font-semibold text-lg">
          ${item?.price.toFixed(2)}
        </span>
        {item?.oldPrice && (
          <span className="ml-2 text-gray-400 line-through text-sm">
            ${item?.oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Rating & Sold */}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>⭐ {item?.rating} (0)</span>
        <span>{item?.sold} Sold</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3">
        <button className="flex-1 flex items-center justify-center border border-red-400 text-red-500 rounded-lg py-2 text-sm hover:bg-red-50 transition">
          <ShoppingBag className="w-4 h-4 mr-1" />
        </button>
        <button className="flex-1 bg-white border border-red-400 text-red-500 rounded-lg py-2 text-sm font-medium hover:bg-red-50 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
}
