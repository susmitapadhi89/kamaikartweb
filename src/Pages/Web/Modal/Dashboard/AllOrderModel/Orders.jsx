import { React, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, XCircle } from "lucide-react";
import OrderDetailsModal from "./OrderOpenDetailModel";
import {
  CancelOrder,
  CancleReasonOrderQuestion,
  FetchOrderHistory,
} from "../../../../../Redux/Features/OrderServicesSlice";
import { OrderCard } from "./OrderCard";
import { ReviewModal } from "./ReviewModal";
import { CancelOrderModal } from "./CancleOrderModel";
import { QuestionModal } from "./QuestionModal";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { OrderData, OrderLoading, OrderError } = useSelector(
    (state) => state.OrderOpration
  );
  const { CancleReasonOrderQuestionData } = useSelector(
    (state) => state.OrderOpration
  );

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelOrderData, setCancelOrderData] = useState(null);
  const [reviewProductData, setReviewProductData] = useState(null);
  const [questionProductData, setQuestionProductData] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [otherReasonText, setOtherReasonText] = useState("");
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  // ✅ Load order history on mount
  useEffect(() => {
    dispatch(FetchOrderHistory());
  }, [dispatch]);

  useEffect(() => {
    // fetch cancel reasons once on mount
    dispatch(CancleReasonOrderQuestion())
      .unwrap()
      .catch((err) => toast.error("Failed to load cancel reasons"));
  }, [dispatch]);
  // Safe orders extraction with proper error handling
  const orders = useMemo(() => {
    try {
      if (OrderData?.data && Array.isArray(OrderData.data)) {
        return OrderData.data;
      }
      return [];
    } catch (error) {
      console.error("Error parsing orders:", error);
      return [];
    }
  }, [OrderData]);

  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    if (!price || price === "null" || price === "0") return "₹0";
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) return "₹0";
    return `₹${priceNum.toLocaleString("en-IN")}`;
  };

  // Format date with error handling
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Handle view order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handle cancel order
  const handleCancelOrder = (order) => {
    setCancelOrderData(order);
    setCancelReason("");
    setOtherReasonText("");
  };

  // Handle confirm cancel order
  const handleConfirmCancel = () => {
    const finalReason =
      cancelReason === "Other reason" ? otherReasonText : cancelReason;

    if (!finalReason.trim()) {
      alert("Please select or specify a cancellation reason");
      return;
    }

    dispatch(
      CancelOrder({ orderId: cancelOrderData.id, cancel_reason: finalReason })
    )
      .unwrap()
      .then(() => toast.success("Order cancelled successfully"))
      .catch(() => toast.error("Failed to cancel order"));

    setCancelOrderData(null);
    setCancelReason("");
    setOtherReasonText("");
  };

  // Handle rate and review for specific product
  const handleRateReview = (product, order) => {
    setReviewProductData({
      product,
      orderId: order.id,
      orderDate: order.createdAt,
    });
    setRating(0);
    setReviewText("");
  };

  // Handle ask question for specific product
  const handleAskQuestion = (product, order) => {
    setQuestionProductData({
      product,
      orderId: order.id,
      orderDate: order.createdAt,
    });
    setQuestionText("");
  };

  // Handle submit review
  const handleSubmitReview = () => {
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write a review");
      return;
    }

    // Reset state
    setReviewProductData(null);
    setRating(0);
    setReviewText("");

    // Show success message
    alert("Thank you for your review!");
  };

  // Handle submit question
  const handleSubmitQuestion = () => {
    if (!questionText.trim()) {
      alert("Please write your question");
      return;
    }

    // Reset state
    setQuestionProductData(null);
    setQuestionText("");

    // Show success message
    alert("Your question has been submitted! We'll get back to you soon.");
  };

  // Close all modals
  const closeAllModals = () => {
    setCancelOrderData(null);
    setReviewProductData(null);
    setQuestionProductData(null);
    setOtherReasonText("");
  };

  // Loading state
  if (OrderLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (OrderError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load orders
          </h2>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">
            Track and manage your recent purchases
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrders.has(order.id)}
                onToggleExpansion={() => toggleOrderExpansion(order.id)}
                onViewDetails={handleViewDetails}
                onCancelOrder={handleCancelOrder}
                onRateReview={handleRateReview}
                onAskQuestion={handleAskQuestion}
                formatPrice={formatPrice}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        <OrderDetailsModal
          orderId={selectedOrder?.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Cancel Order Modal */}
        <CancelOrderModal
          cancelOrderData={cancelOrderData}
          cancelReason={cancelReason}
          otherReasonText={otherReasonText}
          onCancelReasonChange={setCancelReason}
          onOtherReasonChange={setOtherReasonText}
          onConfirmCancel={handleConfirmCancel}
          onClose={closeAllModals}
          cancelReasons={CancleReasonOrderQuestionData || []}
        />

        {/* Rate & Review Modal */}
        <ReviewModal
          reviewProductData={reviewProductData}
          rating={rating}
          reviewText={reviewText}
          hoverRating={hoverRating}
          onRatingChange={setRating}
          onReviewTextChange={setReviewText}
          onHoverRatingChange={setHoverRating}
          onSubmitReview={handleSubmitReview}
          onClose={closeAllModals}
          formatDate={formatDate}
        />

        {/* Ask Question Modal */}
        <QuestionModal
          questionProductData={questionProductData}
          questionText={questionText}
          onQuestionTextChange={setQuestionText}
          onSubmitQuestion={handleSubmitQuestion}
          onClose={closeAllModals}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

// Empty orders component
const EmptyOrders = () => (
  <div className="text-center py-12">
    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No orders found
    </h3>
    <p className="text-gray-600">You haven't placed any orders yet.</p>
  </div>
);

export default OrderHistory;
