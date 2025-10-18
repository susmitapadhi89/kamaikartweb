// Order Item Component - Updated with individual product actions

import { Star, HelpCircle } from "lucide-react";
export const OrderItem = ({
  item,
  order,
  onRateReview,
  onAskQuestion,
  formatPrice,
}) => {
  const isDelivered = order.status === "delivered";

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        <img
          src={item.product?.image || "../../../../../public/Logo.png"}
          alt={item.product?.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Product Info */}
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-base mb-2">
              {item.product?.name}
            </h4>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
              <span>Brand: {item.product?.brand || "Unknown"}</span>
              <span>Qty: {item.quantity}</span>
              <span>Price: {formatPrice(item.price)}</span>
            </div>
          </div>

          {/* Product Actions - Only for delivered orders */}
          {isDelivered && (
            <div className="flex flex-col gap-2 sm:items-end">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onRateReview(item.product, order)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                >
                  <Star className="w-4 h-4" />
                  Rate & Review
                </button>

                <button
                  onClick={() => onAskQuestion(item.product, order)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                >
                  <HelpCircle className="w-4 h-4" />
                  Ask Question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
