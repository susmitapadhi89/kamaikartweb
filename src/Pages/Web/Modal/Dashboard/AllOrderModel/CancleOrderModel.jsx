import { XCircle } from "lucide-react";

// Cancel Order Modal Component
export const CancelOrderModal = ({
  cancelOrderData,
  cancelReason,
  otherReasonText,
  onCancelReasonChange,
  onOtherReasonChange,
  onConfirmCancel,
  onClose,
  cancelReasons,
}) => {
  if (!cancelOrderData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Cancel Order #{cancelOrderData.id}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Please select a reason for cancellation:
          </p>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {cancelReasons.map((item) => (
              <label
                key={item.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="radio"
                  name="cancelReason"
                  value={item.reason}
                  checked={cancelReason === item.reason}
                  onChange={(e) => onCancelReasonChange(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{item.reason}</span>
              </label>
            ))}
          </div>

          {cancelReason === "Other" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please specify:
              </label>
              <textarea
                value={otherReasonText}
                onChange={(e) => onOtherReasonChange(e.target.value)}
                placeholder="Enter your reason for cancellation..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={onConfirmCancel}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
