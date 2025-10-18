// New Question Modal Component
export const QuestionModal = ({
  questionProductData,
  questionText,
  onQuestionTextChange,
  onSubmitQuestion,
  onClose,
  formatDate,
}) => {
  if (!questionProductData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Ask a Question</h3>
            <p className="text-sm text-gray-600 mt-1">
              Order #{questionProductData.orderId} •{" "}
              {formatDate(questionProductData.orderDate)}
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
          <div className="flex gap-4 p-4 bg-blue-50 rounded-lg mb-6">
            <img
              src={
                questionProductData.product?.thumbnail ||
                "../../../../../public/Logo.png"
              }
              alt={questionProductData.product?.name}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/80x80?text=No+Image";
              }}
            />
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">
                {questionProductData.product?.name}
              </h4>
              <p className="text-gray-600 text-sm">
                Brand: {questionProductData.product?.brand || "Unknown"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Question Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                What would you like to know? *
              </label>
              <textarea
                value={questionText}
                onChange={(e) => onQuestionTextChange(e.target.value)}
                placeholder="Ask any question about this product... Product specifications, usage instructions, warranty details, or anything else you'd like to know."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="6"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Our team will respond within 24 hours</span>
                <span>{questionText.length}/300</span>
              </div>
            </div>

            {/* Common Questions Suggestions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900 mb-2">
                Common questions:
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• What is the warranty period for this product?</p>
                <p>• How do I use this product properly?</p>
                <p>• What are the maintenance requirements?</p>
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
                onClick={onSubmitQuestion}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
