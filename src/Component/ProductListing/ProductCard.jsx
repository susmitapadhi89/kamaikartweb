import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200  cursor-pointer group">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/${product.name}/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover "
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-600 mb-1">{product.brand}</p>

        {/* Product Name */}

        <Link to={`/${product.name}/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center ">
          <div className="flex items-center gap-2">
            {/* Stars */}
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.1} // decimal ratings like 4.1
              readOnly
              size="small" // change to "medium" or "large" if needed
            />

            {/* Rating number */}
            <span className="text-sm font-medium text-gray-800">
              {product.rating.toFixed(1)}
            </span>

            {/* Total reviews */}
          </div>
        </div>
        <span className="text-xs text-gray-500 mb-2">
          ({product.reviews} reviews)
        </span>
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}

            {product.discount > 0 && (
              <span className="text-sm text-green-600 font-medium">
                ({product.discount}% OFF)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
