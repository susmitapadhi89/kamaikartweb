// import {
//   X,
//   CreditCard,
//   Package,
//   Truck,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";
// import { useEffect, useCallback, useMemo } from "react";

// const OrderDetailsModal = ({
//   order,
//   isOpen,
//   onClose,
//   formatPrice,
//   formatDate,
// }) => {
//   // Status configuration
//   const STATUS_CONFIG = {
//     ordered: { key: "ordered", label: "Ordered", icon: Package },
//     confirmed: { key: "confirmed", label: "Confirmed", icon: CheckCircle },
//     shipped: { key: "shipped", label: "Shipped", icon: Truck },
//     delivered: { key: "delivered", label: "Delivered", icon: CheckCircle },
//   };

//   // Handle escape key and body scroll
//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   // Get status steps with proper mapping
//   const getStatusSteps = useCallback((status) => {
//     const steps = Object.values(STATUS_CONFIG);

//     const statusMap = {
//       pending: 0,
//       confirmed: 1,
//       shipped: 2,
//       delivered: 3,
//       cancelled: -1,
//     };

//     const statusIndex = statusMap[status] ?? 0;

//     return steps.map((step, index) => ({
//       ...step,
//       completed: index <= statusIndex,
//       current: index === statusIndex,
//       disabled: status === "cancelled",
//     }));
//   }, []);

//   const statusSteps = useMemo(
//     () => getStatusSteps(order?.status),
//     [order?.status, getStatusSteps]
//   );

//   // Calculate items total safely
//   const calculateItemsTotal = useCallback((items) => {
//     if (!items || !Array.isArray(items)) return 0;

//     return items.reduce((total, item) => {
//       try {
//         const price = parseFloat(item.price) || 0;
//         const quantity = parseInt(item.quantity) || 0;
//         return total + price * quantity;
//       } catch (error) {
//         console.error("Error calculating item total:", error);
//         return total;
//       }
//     }, 0);
//   }, []);

//   const calculatedTotal = useMemo(
//     () => calculateItemsTotal(order?.items),
//     [order?.items, calculateItemsTotal]
//   );

//   const hasPaymentDiscrepancy = useMemo(() => {
//     const orderTotal = parseFloat(order?.total_amount) || 0;
//     return Math.abs(calculatedTotal - orderTotal) > 0.01;
//   }, [calculatedTotal, order?.total_amount]);

//   // Handle image errors
//   const handleImageError = useCallback((event) => {
//     const target = event.target;
//     target.src = "https://via.placeholder.com/80x80?text=No+Image";
//     target.onerror = null; // Prevent infinite loop
//   }, []);

//   // Get payment status
//   const getPaymentStatus = useCallback(() => {
//     if (order?.razorpay_payment_id) {
//       return { status: "Paid", color: "text-green-600" };
//     }
//     if (order?.status === "cancelled") {
//       return { status: "Cancelled", color: "text-red-600" };
//     }
//     return { status: "Pending", color: "text-yellow-600" };
//   }, [order]);

//   const paymentStatus = useMemo(() => getPaymentStatus(), [getPaymentStatus]);

//   // Safe data accessors
//   const getOrderId = () => order?.id || "N/A";
//   const getOrderDate = () =>
//     order?.createdAt ? formatDate(order.createdAt) : "Date not available";
//   const getItemsCount = () => order?.items?.length || 0;
//   const getOrderTotal = () => formatPrice(order?.total_amount || 0);

//   // Handle help button click
//   const handleHelpClick = useCallback(() => {
//     console.log("Help requested for order:", order?.id);
//     // Implement actual help functionality here
//     alert(`Contact support for order #${order?.id}`);
//   }, [order?.id]);

//   // Close modal on backdrop click
//   const handleBackdropClick = useCallback(
//     (event) => {
//       if (event.target === event.currentTarget) {
//         onClose();
//       }
//     },
//     [onClose]
//   );

//   // Early return if not open or no order - MUST BE AFTER ALL HOOKS
//   if (!isOpen || !order) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//       onClick={handleBackdropClick}
//     >
//       <div
//         className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               Order #{getOrderId()}
//             </h2>
//             <p className="text-gray-600">Placed on {getOrderDate()}</p>
//             {order.status === "cancelled" && (
//               <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
//                 Cancelled
//               </span>
//             )}
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Close modal"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Order Status Timeline - Only show for non-cancelled orders */}
//           {order.status !== "cancelled" && (
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Order Status
//               </h3>
//               <div className="flex justify-between relative">
//                 {statusSteps.map((step, index) => {
//                   const IconComponent = step.icon;
//                   return (
//                     <div
//                       key={step.key}
//                       className="flex flex-col items-center relative z-10 flex-1"
//                     >
//                       <div
//                         className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
//                           step.completed
//                             ? "bg-green-500 border-green-500 text-white"
//                             : step.current
//                             ? "bg-blue-500 border-blue-500 text-white"
//                             : "bg-white border-gray-300 text-gray-400"
//                         } ${step.disabled ? "opacity-50" : ""}`}
//                       >
//                         <IconComponent className="w-6 h-6" />
//                       </div>
//                       <span
//                         className={`text-sm font-medium mt-2 text-center ${
//                           step.completed || step.current
//                             ? "text-gray-900"
//                             : "text-gray-500"
//                         } ${step.disabled ? "opacity-50" : ""}`}
//                       >
//                         {step.label}
//                       </span>
//                       {index < statusSteps.length - 1 && (
//                         <div
//                           className={`absolute top-6 left-16 h-0.5 ${
//                             step.completed ? "bg-green-500" : "bg-gray-300"
//                           } ${step.disabled ? "opacity-50" : ""}`}
//                           style={{ width: "calc(100% - 3rem)" }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Order Items */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Order Items ({getItemsCount()})
//             </h3>
//             <div className="space-y-4">
//               {order.items?.map((item) => {
//                 const itemPrice = parseFloat(item.price) || 0;
//                 const itemQuantity = parseInt(item.quantity) || 0;
//                 const itemTotal = itemPrice * itemQuantity;

//                 return (
//                   <div
//                     key={item.id}
//                     className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
//                   >
//                     <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
//                       <img
//                         src={
//                           item.product?.image ||
//                           "https://via.placeholder.com/80x80?text=No+Image"
//                         }
//                         alt={item.product?.name || "Product image"}
//                         className="w-full h-full object-cover"
//                         onError={handleImageError}
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-semibold text-gray-900 mb-1 truncate">
//                         {item.product?.name || "Unknown Product"}
//                       </h4>
//                       <p className="text-gray-600 text-sm mb-2">
//                         {item.product?.brand || "No Brand"} •
//                         {item.variant ? " Customizable" : " Standard"}
//                       </p>
//                       <div className="flex items-center justify-between flex-wrap gap-2">
//                         <div className="flex items-center gap-4 text-sm flex-wrap">
//                           <span className="text-gray-600">
//                             Qty: {itemQuantity}
//                           </span>
//                           <span className="font-semibold text-gray-900">
//                             {formatPrice(itemPrice)} each
//                           </span>
//                         </div>
//                         <span className="font-semibold text-gray-900">
//                           {formatPrice(itemTotal)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {(!order.items || order.items.length === 0) && (
//                 <div className="text-center py-8 text-gray-500">
//                   <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                   <p>No items found in this order</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Payment Information */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <CreditCard className="w-5 h-5" />
//                 Payment Information
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Payment Method:</span>
//                   <span className="font-medium">Razorpay</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Payment ID:</span>
//                   <span
//                     className="font-medium truncate ml-2"
//                     title={String(order.payment_id)}
//                   >
//                     {order.payment_id || "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Razorpay ID:</span>
//                   <span
//                     className="font-medium truncate ml-2"
//                     title={order.razorpay_payment_id || ""}
//                   >
//                     {order.razorpay_payment_id || "Not available"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span className={`font-medium ${paymentStatus.color}`}>
//                     {paymentStatus.status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Order Total */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Order Summary
//               </h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Items Total:</span>
//                   <span>{formatPrice(calculatedTotal)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping:</span>
//                   <span className="text-green-600">FREE</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Taxes:</span>
//                   <span>Included</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-semibold">
//                   <span>Total Amount:</span>
//                   <span>{getOrderTotal()}</span>
//                 </div>

//                 {/* Show discrepancy warning if any */}
//                 {hasPaymentDiscrepancy && (
//                   <div className="flex items-center gap-2 text-xs text-yellow-600 bg-yellow-50 p-2 rounded border border-yellow-200">
//                     <AlertCircle className="w-4 h-4" />
//                     <span>
//                       Note: There's a discrepancy between calculated items total
//                       and order total
//                     </span>
//                   </div>
//                 )}

//                 {/* Debug info - remove in production */}
//                 {process.env.NODE_ENV === "development" && (
//                   <div className="text-xs text-gray-500 border-t pt-2 space-y-1">
//                     <div>Calculated: {formatPrice(calculatedTotal)}</div>
//                     <div>API Total: {getOrderTotal()}</div>
//                     <div>
//                       Difference:{" "}
//                       {formatPrice((order.total_amount || 0) - calculatedTotal)}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modal Footer */}
//         <div className="flex justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Close
//           </button>

//           <button
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onClick={handleHelpClick}
//           >
//             Need Help?
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsModal;
import {
  X,
  CreditCard,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  FileText,
  MessageCircle,
  Star,
  Undo2,
} from "lucide-react";
import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchOrderById } from "../../../../../Redux/Features/OrderServicesSlice";
import { Link } from "react-router-dom";

const OrderDetailsModal = ({ orderId, isOpen, onClose }) => {
  // Status configuration

  const dispatch = useDispatch();

  const { PersonalOrderData, OrderLoading } = useSelector(
    (state) => state.OrderOpration
  );

  useEffect(() => {
    if (isOpen && orderId && PersonalOrderData?.id !== orderId) {
      dispatch(FetchOrderById(orderId));
    }
  }, [isOpen, orderId, dispatch]);

  const STATUS_CONFIG = useMemo(
    () => ({
      ordered: { key: "ordered", label: "Ordered", icon: Package },
      confirmed: { key: "confirmed", label: "Confirmed", icon: CheckCircle },
      shipped: { key: "shipped", label: "Shipped", icon: Truck },
      delivered: { key: "delivered", label: "Delivered", icon: CheckCircle },
    }),
    []
  );
  // Get status steps with proper mapping
  const getStatusSteps = useCallback(
    (status) => {
      const steps = Object.values(STATUS_CONFIG);

      const statusMap = {
        pending: 0,
        confirmed: 1,
        shipped: 2,
        delivered: 3,
        cancelled: -1,
        returned: -1,
      };

      const statusIndex = statusMap[status] ?? 0;

      return steps.map((step, index) => ({
        ...step,
        completed: index <= statusIndex,
        current: index === statusIndex,
        disabled: status === "cancelled" || status === "returned",
      }));
    },
    [STATUS_CONFIG]
  );

  const statusSteps = useMemo(
    () => getStatusSteps(PersonalOrderData?.status),
    [PersonalOrderData?.status, getStatusSteps]
  );

  // Handle image errors
  const handleImageError = useCallback((event) => {
    const target = event.target;
    target.onerror = null;
  }, []);

  // Get payment status
  const getPaymentStatus = useCallback(() => {
    if (PersonalOrderData?.razorpay_payment_id) {
      return { status: "Paid", color: "text-green-600" };
    }
    if (PersonalOrderData?.status === "cancelled") {
      return { status: "Cancelled", color: "text-red-600" };
    }
    if (PersonalOrderData?.status === "returned") {
      return { status: "Returned", color: "text-orange-600" };
    }
    return { status: "Pending", color: "text-yellow-600" };
  }, [PersonalOrderData]);

  const paymentStatus = useMemo(() => getPaymentStatus(), [getPaymentStatus]);

  // Safe data accessors
  const getOrderId = () => PersonalOrderData?.id || "N/A";
  const getOrderDate = () =>
    PersonalOrderData?.createdAt
      ? PersonalOrderData.createdAt
      : "Date not available";
  const getItemsCount = () => PersonalOrderData?.items?.length || 0;

  // Early return if not open or no order data
  if (!isOpen || !PersonalOrderData) return null;
  // Early return if not open or no order

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order Details
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Order placed {getOrderDate()}</span>
              </div>
              <span>•</span>
              <span>Order number {getOrderId()}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Shipping, Payment, and Order Summary in 3 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Shipping Address */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Ship to
              </h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium">
                  {PersonalOrderData?.address?.name}
                </p>
                <p>{PersonalOrderData?.address?.address1}</p>
                <p>{PersonalOrderData?.address?.address2}</p>
                <p>{PersonalOrderData?.address?.flat}</p>
                <p>
                  {PersonalOrderData?.address?.area},{" "}
                  {PersonalOrderData?.address?.postal_code}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium">BHIM UPI</p>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className={`font-medium ${paymentStatus.color}`}>
                    {paymentStatus.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment :</span>
                  <span className="font-medium truncate">
                    {PersonalOrderData.payment_name || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item(s) Subtotal:</span>
                  <span>{PersonalOrderData.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span>{PersonalOrderData.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">tax:</span>
                  <span>{PersonalOrderData.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Promotion Applied:</span>
                  <span className="text-green-600">
                    -{PersonalOrderData.promo_code}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold">
                  <span>Grand Total:</span>
                  <span>{PersonalOrderData.total_amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Return Status Section */}
          {(PersonalOrderData.status === "returned" ||
            PersonalOrderData.status === "cancelled") && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Undo2 className="w-5 h-5 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">
                    Return started
                  </h3>
                  <p className="text-orange-700 text-sm mt-1">
                    Your refund will be processed when we receive your item.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order Status Timeline - Only show for non-cancelled orders */}

          {/* Order Status Timeline - Only show for non-cancelled orders */}
          {PersonalOrderData.status !== "cancelled" &&
            PersonalOrderData.status !== "returned" && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Status
                </h3>

                <div className="relative flex items-center justify-between">
                  {statusSteps.map((step, index) => {
                    const IconComponent = step.icon;
                    const isLast = index === statusSteps.length - 1;

                    return (
                      <div
                        key={step.key}
                        className="flex flex-col items-center relative flex-1"
                      >
                        {/* Connector line */}
                        {!isLast && (
                          <div
                            className={`absolute top-6  transform translate-x-1/2 w-full h-0.5 ${
                              step.completed ? "bg-green-500" : "bg-gray-300"
                            } ${step.disabled ? "opacity-50" : ""}`}
                          ></div>
                        )}

                        {/* Status circle */}
                        <div
                          className={`relative  w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                            step.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : step.current
                              ? "bg-blue-500 border-blue-500 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                          } ${step.disabled ? "opacity-50" : ""}`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>

                        {/* Label */}
                        <span
                          className={`text-sm font-medium mt-2 text-center ${
                            step.completed || step.current
                              ? "text-gray-900"
                              : "text-gray-500"
                          } ${step.disabled ? "opacity-50" : ""}`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Order Items */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items ({getItemsCount()})
            </h3>
            {PersonalOrderData.items?.map((item) => {
              const itemPrice = parseFloat(item.price) || 0;
              const itemQuantity = parseInt(item.quantity) || 0;
              const itemTotal = itemPrice * itemQuantity;

              return (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name || "Product image"}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">
                        {item.product?.name || "Unknown Product"}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {item.product?.short_description ||
                          "Product description not available"}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Sold by:{" "}
                        <span className="font-medium">
                          {item.product?.brand || "Unknown Seller"}
                        </span>
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          {itemTotal}
                        </span>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Buy it again
                          </button>

                          <Link
                            to={`/${item.product?.name}/${item.product?.id}`}
                          >
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              View item
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
