// Review Modal Component - Updated for individual products
export const ReviewModal = ({
  reviewProductData,
  rating,
  reviewText,
  hoverRating,
  onRatingChange,
  onReviewTextChange,
  onHoverRatingChange,
  onSubmitReview,
  onClose,
  formatDate,
}) => {
  if (!reviewProductData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Rate & Review Product
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Order #{reviewProductData.orderId} •{" "}
              {formatDate(reviewProductData.orderDate)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Product Info */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-lg mb-6">
            <img
              src={
                reviewProductData.product?.thumbnail ||
                "../../../../../public/Logo.png"
              }
              alt={reviewProductData.product?.name}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/80x80?text=No+Image";
              }}
            />
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">
                {reviewProductData.product?.name}
              </h4>
              <p className="text-gray-600 text-sm">
                Brand: {reviewProductData.product?.brand || "Unknown"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Rating Section */}
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 mb-4">
                How would you rate this product?
              </p>
              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => onHoverRatingChange(star)}
                    onMouseLeave={() => onHoverRatingChange(0)}
                    className="text-4xl focus:outline-none transform hover:scale-110 transition-transform duration-200"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-current drop-shadow-lg"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {rating === 0
                  ? "Select your rating"
                  : rating === 1
                  ? "Poor"
                  : rating === 2
                  ? "Fair"
                  : rating === 3
                  ? "Good"
                  : rating === 4
                  ? "Very Good"
                  : "Excellent"}
              </p>
            </div>

            {/* Review Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Share your experience *
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => onReviewTextChange(e.target.value)}
                placeholder="Tell us what you liked about this product... Was it as described? How was the quality? Any suggestions for improvement?"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows="6"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Your review helps other shoppers</span>
                <span>{reviewText.length}/500</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onSubmitReview}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
