// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   CheckCircle,
//   Truck,
//   Calendar,
//   CreditCard,
//   MapPin,
//   Package,
//   ArrowLeft,
//   Download,
//   Share2,
//   Home,
//   ShoppingBag,
//   Shield,
//   Clock,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function OrderConfirmation() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Get order data from navigation state
//   const orderData = location.state || {};
//   const {
//     orderId = `ORD${Date.now()}`,
//     totalAmount = 0,
//     paymentMethod = "online",
//     address = {},
//     items = [],
//   } = orderData;

//   // Local state
//   const [estimatedDelivery, setEstimatedDelivery] = useState("");
//   const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

//   // Calculate estimated delivery date (3-5 days from now)
//   useEffect(() => {
//     const deliveryDate = new Date();
//     deliveryDate.setDate(
//       deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3
//     );
//     setEstimatedDelivery(
//       deliveryDate.toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     );
//   }, []);

//   // Calculate order summary
//   const subtotal = items.reduce(
//     (sum, item) => sum + item.sellingPrice * item.quantity,
//     0
//   );
//   const shipping = subtotal > 50 ? 0 : 9.99;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;
//   const handleDownloadInvoice = async () => {
//     setIsGeneratingInvoice(true);
//     toast.loading("Generating invoice...", { id: "invoice" });

//     try {
//       // Create PDF instance
//       const doc = new jsPDF();

//       // --- Header ---
//       doc.setFontSize(20);
//       doc.setTextColor(40, 40, 40);
//       doc.text("KamaiCart", 105, 20, { align: "center" });

//       doc.setFontSize(10);
//       doc.setTextColor(100, 100, 100);
//       doc.text("INVOICE", 105, 30, { align: "center" });

//       // --- Order Info ---
//       doc.setFontSize(8);
//       doc.setTextColor(150, 150, 150);
//       doc.text("Order Details", 14, 45);

//       doc.setFontSize(10);
//       doc.setTextColor(40, 40, 40);
//       doc.text(`Order ID: ${orderId}`, 14, 52);
//       doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 14, 58);
//       doc.text(`Estimated Delivery: ${estimatedDelivery}`, 14, 64);

//       // --- Shipping Info ---
//       doc.setFontSize(8);
//       doc.setTextColor(150, 150, 150);
//       doc.text("Shipping Address", 14, 75);

//       doc.setFontSize(10);
//       doc.setTextColor(40, 40, 40);
//       doc.text(address.name || "Customer", 14, 82);
//       doc.text(`${address.flat || ""}, ${address.area || ""}`, 14, 88);
//       doc.text(address.address1 || "", 14, 94);
//       if (address.address2) doc.text(address.address2, 14, 100);
//       doc.text(`Postal Code: ${address.postal_code || ""}`, 14, 106);
//       doc.text(`Phone: ${address.phone_number || ""}`, 14, 112);

//       // --- Table Data ---
//       const tableData = items.map((item, index) => [
//         index + 1,
//         item.name.substring(0, 30),
//         item.size,
//         item.color,
//         item.quantity,
//         `₹${item.sellingPrice.toLocaleString()}`,
//         `₹${(item.sellingPrice * item.quantity).toLocaleString()}`,
//       ]);

//       // ✅ Use the correct plugin syntax:
//       autoTable(doc, {
//         startY: 120,
//         head: [["#", "Product", "Size", "Color", "Qty", "Price", "Total"]],
//         body: tableData,
//         theme: "grid",
//         headStyles: {
//           fillColor: [59, 130, 246],
//           textColor: 255,
//           fontStyle: "bold",
//         },
//         styles: {
//           fontSize: 8,
//           cellPadding: 2,
//         },
//         columnStyles: {
//           0: { cellWidth: 10 },
//           1: { cellWidth: 60 },
//           2: { cellWidth: 20 },
//           3: { cellWidth: 25 },
//           4: { cellWidth: 15 },
//           5: { cellWidth: 25 },
//           6: { cellWidth: 25 },
//         },
//       });

//       // --- Summary ---
//       const finalY = doc.lastAutoTable.finalY + 10;

//       doc.setFontSize(10);
//       doc.setTextColor(40, 40, 40);
//       doc.text("Order Summary:", 14, finalY + 5);
//       doc.text(`Subtotal: ₹${subtotal.toLocaleString()}`, 120, finalY + 5, {
//         align: "right",
//       });
//       doc.text(
//         `Shipping: ${shipping === 0 ? "FREE" : `₹${shipping}`}`,
//         120,
//         finalY + 11,
//         { align: "right" }
//       );
//       doc.text(`Tax: ₹${tax.toFixed(2)}`, 120, finalY + 17, { align: "right" });

//       doc.setFontSize(12);
//       doc.setFont(undefined, "bold");
//       doc.text(`Total: ₹${total.toFixed(2)}`, 120, finalY + 25, {
//         align: "right",
//       });

//       // --- Payment Method ---
//       doc.setFontSize(10);
//       doc.setFont(undefined, "normal");
//       doc.text(
//         `Payment Method: ${getPaymentMethodText(paymentMethod)}`,
//         14,
//         finalY + 35
//       );

//       // --- Footer ---
//       doc.setFontSize(8);
//       doc.setTextColor(150, 150, 150);
//       doc.text("Thank you for your purchase!", 105, finalY + 50, {
//         align: "center",
//       });
//       doc.text(
//         "For any queries, contact support@kamaicart.com",
//         105,
//         finalY + 55,
//         {
//           align: "center",
//         }
//       );

//       // ✅ Save PDF
//       doc.save(`invoice-${orderId}.pdf`);
//       toast.success("Invoice downloaded successfully!", { id: "invoice" });
//     } catch (error) {
//       console.error("Error generating invoice:", error);
//       toast.error("Failed to generate invoice. Please try again.", {
//         id: "invoice",
//       });
//     } finally {
//       setIsGeneratingInvoice(false);
//     }
//   };
//   const getPaymentMethodText = (method) => {
//     switch (method) {
//       case "cod":
//         return "Cash on Delivery";
//       case "upi":
//         return "UPI Payment";
//       case "card":
//         return "Credit/Debit Card";
//       default:
//         return "Online Payment";
//     }
//   };

//   const handleShareOrder = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: `Order ${orderId}`,
//         text: `I just placed an order on YourStore! Order ID: ${orderId}`,
//       });
//     } else {
//       navigator.clipboard.writeText(`Order ID: ${orderId}`);
//       toast.success("Order details copied to clipboard");
//     }
//   };

//   const handleTrackOrder = () => {
//     navigate("/track-order", { state: { orderId } });
//     toast.success("Redirecting to order tracking");
//   };

//   const handleContinueShopping = () => {
//     navigate("/");
//   };

//   // If no order data, redirect to home
//   if (!location.state) {
//     navigate("/");
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//               <CheckCircle className="text-green-600" size={40} />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Order Confirmed!
//           </h1>
//           <p className="text-lg text-gray-600 mb-4">
//             Thank you for your purchase. Your order has been confirmed.
//           </p>
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
//             <p className="text-blue-800 font-medium">
//               Order ID: <span className="font-bold">{orderId}</span>
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Order Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Delivery Information */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Truck className="text-green-600" size={20} />
//                 Delivery Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Estimated Delivery */}
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                   <div className="flex items-center gap-3 mb-2">
//                     <Calendar className="text-green-600" size={20} />
//                     <h3 className="font-semibold text-green-900">
//                       Estimated Delivery
//                     </h3>
//                   </div>
//                   <p className="text-green-800 font-medium">
//                     {estimatedDelivery}
//                   </p>
//                   <p className="text-green-700 text-sm mt-1">
//                     3-5 business days
//                   </p>
//                 </div>

//                 {/* Shipping Address */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <div className="flex items-center gap-3 mb-2">
//                     <MapPin className="text-blue-600" size={20} />
//                     <h3 className="font-semibold text-blue-900">
//                       Shipping Address
//                     </h3>
//                   </div>
//                   <div className="text-blue-800">
//                     <p className="font-medium">{address.name}</p>
//                     <p className="text-sm">
//                       {address.flat}, {address.area}
//                     </p>
//                     <p className="text-sm">{address.address1}</p>
//                     {address.address2 && (
//                       <p className="text-sm">{address.address2}</p>
//                     )}
//                     <p className="text-sm">
//                       Postal Code: {address.postal_code}
//                     </p>
//                     <p className="text-sm font-medium mt-1">
//                       Phone: {address.phone_number}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Status Timeline */}
//               <div className="mt-6">
//                 <h3 className="font-semibold text-gray-900 mb-4">
//                   Order Status
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                     <span className="text-green-600 font-medium">
//                       Order Confirmed
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                     <span className="text-gray-500">Processing</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                     <span className="text-gray-500">Shipped</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                     <span className="text-gray-500">Out for Delivery</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                     <span className="text-gray-500">Delivered</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Package className="text-blue-600" size={20} />
//                 Order Items
//               </h2>

//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
//                   >
//                     <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900">
//                         {item.name}
//                       </h3>
//                       <p className="text-gray-600 text-sm">
//                         Quantity: {item.quantity}
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         Size: {item.size} | Color: {item.color}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold text-gray-900">
//                         ₹{(item.sellingPrice * item.quantity).toLocaleString()}
//                       </p>
//                       <p className="text-gray-600 text-sm line-through">
//                         ₹{(item.originalPrice * item.quantity).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Information */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <CreditCard className="text-purple-600" size={20} />
//                 Payment Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-2">
//                     Payment Method
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <CreditCard className="text-purple-600" size={20} />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {paymentMethod === "cod"
//                           ? "Cash on Delivery"
//                           : paymentMethod === "upi"
//                           ? "UPI Payment"
//                           : "Credit/Debit Card"}
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         {paymentMethod === "cod"
//                           ? "Pay when you receive"
//                           : "Paid successfully"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Order Summary & Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24 space-y-6">
//               {/* Order Summary */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">
//                   Order Summary
//                 </h2>

//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Shipping</span>
//                     <span className={shipping === 0 ? "text-green-600" : ""}>
//                       {shipping === 0 ? "FREE" : `₹${shipping}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Tax</span>
//                     <span>₹{tax.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 pt-4 mb-6">
//                   <div className="flex justify-between text-lg font-bold text-gray-900">
//                     <span>Total</span>
//                     <span>₹{total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <button
//                     onClick={handleTrackOrder}
//                     className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Truck size={20} />
//                     Track Your Order
//                   </button>

//                   <button
//                     onClick={handleDownloadInvoice}
//                     disabled={isGeneratingInvoice}
//                     className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Download size={20} />
//                     {isGeneratingInvoice ? "Generating..." : "Download Invoice"}
//                   </button>

//                   <button
//                     onClick={handleShareOrder}
//                     className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Share2 size={20} />
//                     Share Order
//                   </button>
//                 </div>
//               </div>

//               {/* Support & Next Steps */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h3 className="font-semibold text-gray-900 mb-4">
//                   What's Next?
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <Clock className="text-blue-600 mt-1" size={16} />
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         Order Processing
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         We'll start preparing your order within 24 hours
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Truck className="text-green-600 mt-1" size={16} />
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         Shipping Updates
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         You'll receive tracking information via email
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Shield className="text-purple-600 mt-1" size={16} />
//                     <div>
//                       <p className="font-medium text-gray-900">Need Help?</p>
//                       <p className="text-gray-600 text-sm">
//                         Contact support for any questions about your order
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Continue Shopping */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="text-center">
//                   <p className="text-gray-600 mb-4">Want to explore more?</p>
//                   <button
//                     onClick={handleContinueShopping}
//                     className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <ShoppingBag size={20} />
//                     Continue Shopping
//                   </button>
//                   <Link
//                     to="/"
//                     className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-3"
//                   >
//                     <Home size={16} />
//                     Back to Home
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  Truck,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Download,
  Share2,
  Home,
  ShoppingBag,
  Shield,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from navigation state (from API response)
  const orderDataFromAPI = location.state?.orderData;

  // Transform API data to match frontend format
  const transformOrderData = (apiData) => {
    if (!apiData) return null;

    return {
      orderId: apiData.orderId?.toString() || `ORD${Date.now()}`,
      totalAmount: parseFloat(apiData.totalAmount) || 0,
      subtotal: parseFloat(apiData.subtotal) || 0,
      shipping: parseFloat(apiData.shipping) || 0,
      tax: parseFloat(apiData.tax) || 0,
      paymentMethod: apiData.paymentMethod || "online",
      estimatedDelivery: apiData.estimatedDelivery || "",
      address: apiData.address || {},
      items: (apiData.items || []).map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        sellingPrice: parseFloat(item.sellingPrice) || 0,
        originalPrice: parseFloat(item.sellingPrice) * 1.2, // Assuming 20% discount
        size:
          item.variant?.attributes?.find(
            (attr) => attr.name === "Size" || attr.name === "size"
          )?.value || "N/A",
        color:
          item.variant?.attributes?.find(
            (attr) => attr.name === "color" || attr.name === "Color"
          )?.value || "N/A",
      })),
    };
  };

  const orderData = transformOrderData(orderDataFromAPI);

  // Local state
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  // Use API estimated delivery or calculate one
  useEffect(() => {
    if (orderData?.estimatedDelivery) {
      setEstimatedDelivery(orderData.estimatedDelivery);
    } else {
      const deliveryDate = new Date();
      deliveryDate.setDate(
        deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3
      );
      setEstimatedDelivery(
        deliveryDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [orderData]);

  // Calculate order summary from API data
  const subtotal = orderData?.subtotal || 0;
  const shipping = orderData?.shipping || 0;
  const tax = orderData?.tax || 0;
  const total = orderData?.totalAmount || 0;

  const handleDownloadInvoice = async () => {
    if (!orderData) return;

    setIsGeneratingInvoice(true);
    toast.loading("Generating invoice...", { id: "invoice" });

    try {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("KamaiCart", 105, 20, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("INVOICE", 105, 30, { align: "center" });

      // Order Info
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Order Details", 14, 45);

      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text(`Order ID: ${orderData.orderId}`, 14, 52);
      doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 14, 58);
      doc.text(`Estimated Delivery: ${estimatedDelivery}`, 14, 64);

      // Shipping Info
      if (orderData.address) {
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Shipping Address", 14, 75);

        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        doc.text(orderData.address.name || "Customer", 14, 82);
        doc.text(
          `${orderData.address.flat || ""}, ${orderData.address.area || ""}`,
          14,
          88
        );
        doc.text(orderData.address.address1 || "", 14, 94);
        if (orderData.address.address2)
          doc.text(orderData.address.address2, 14, 100);
        doc.text(
          `Postal Code: ${orderData.address.postal_code || ""}`,
          14,
          106
        );
        doc.text(`Phone: ${orderData.address.phone_number || ""}`, 14, 112);
      }

      // Table Data
      const tableData = orderData.items.map((item, index) => [
        index + 1,
        item.name.substring(0, 30),
        item.size,
        item.color,
        item.quantity,
        `₹${item.sellingPrice.toLocaleString()}`,
        `₹${(item.sellingPrice * item.quantity).toLocaleString()}`,
      ]);

      autoTable(doc, {
        startY: orderData.address ? 120 : 75,
        head: [["#", "Product", "Size", "Color", "Qty", "Price", "Total"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: "bold",
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 60 },
          2: { cellWidth: 20 },
          3: { cellWidth: 25 },
          4: { cellWidth: 15 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
        },
      });

      const finalY = doc.lastAutoTable.finalY + 10;

      // Summary
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text("Order Summary:", 14, finalY + 5);
      doc.text(`Subtotal: ₹${subtotal.toLocaleString()}`, 120, finalY + 5, {
        align: "right",
      });
      doc.text(
        `Shipping: ${shipping === 0 ? "FREE" : `₹${shipping}`}`,
        120,
        finalY + 11,
        { align: "right" }
      );
      doc.text(`Tax: ₹${tax.toFixed(2)}`, 120, finalY + 17, { align: "right" });

      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(`Total: ₹${total.toFixed(2)}`, 120, finalY + 25, {
        align: "right",
      });

      // Payment Method
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(
        `Payment Method: ${getPaymentMethodText(orderData.paymentMethod)}`,
        14,
        finalY + 35
      );

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Thank you for your purchase!", 105, finalY + 50, {
        align: "center",
      });
      doc.text(
        "For any queries, contact support@kamaicart.com",
        105,
        finalY + 55,
        {
          align: "center",
        }
      );

      doc.save(`invoice-${orderData.orderId}.pdf`);
      toast.success("Invoice downloaded successfully!", { id: "invoice" });
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice. Please try again.", {
        id: "invoice",
      });
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  const getPaymentMethodText = (method) => {
    if (!method) return "Unknown Payment Method";

    // Normalize: extract method name if it's an object
    const methodName =
      typeof method === "object"
        ? method.name || method.payment_name || method.method || ""
        : method;

    if (typeof methodName !== "string") return "Unknown Payment Method";

    const name = methodName.toLowerCase();

    if (name.includes("cash") || name.includes("cod"))
      return "Cash on Delivery";
    if (name.includes("razorpay") || name.includes("card"))
      return "Paid Online via Razorpay";
    return "Payment Successful";
  };

  const handleShareOrder = () => {
    if (!orderData) return;

    if (navigator.share) {
      navigator.share({
        title: `Order ${orderData.orderId}`,
        text: `I just placed an order on KamaiCart! Order ID: ${orderData.orderId}`,
      });
    } else {
      navigator.clipboard.writeText(`Order ID: ${orderData.orderId}`);
      toast.success("Order details copied to clipboard");
    }
  };

  const handleTrackOrder = () => {
    if (!orderData) return;

    navigate("/track-order", { state: { orderId: orderData.orderId } });
    toast.success("Redirecting to order tracking");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  // If no order data, redirect to home
  if (!orderData) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-blue-800 font-medium">
              Order ID: <span className="font-bold">{orderData.orderId}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck className="text-green-600" size={20} />
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Estimated Delivery */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="text-green-600" size={20} />
                    <h3 className="font-semibold text-green-900">
                      Estimated Delivery
                    </h3>
                  </div>
                  <p className="text-green-800 font-medium">
                    {estimatedDelivery}
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    3-5 business days
                  </p>
                </div>

                {/* Shipping Address */}
                {orderData.address && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="text-blue-600" size={20} />
                      <h3 className="font-semibold text-blue-900">
                        Shipping Address
                      </h3>
                    </div>
                    <div className="text-blue-800">
                      <p className="font-medium">{orderData.address.name}</p>
                      <p className="text-sm">
                        {orderData.address.flat}, {orderData.address.area}
                      </p>
                      <p className="text-sm">{orderData.address.address1}</p>
                      {orderData.address.address2 && (
                        <p className="text-sm">{orderData.address.address2}</p>
                      )}
                      <p className="text-sm">
                        Postal Code: {orderData.address.postal_code}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Phone: {orderData.address.phone_number}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Status Timeline */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Order Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      Order Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Shipped</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Out for Delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="text-blue-600" size={20} />
                Order Items
              </h2>

              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Size: {item.size} | Color: {item.color}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{(item.sellingPrice * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="text-purple-600" size={20} />
                Payment Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {getPaymentMethodText(orderData.paymentMethod)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {(() => {
                          const method = orderData.paymentMethod;
                          const methodName =
                            typeof method === "object"
                              ? method.name ||
                                method.payment_name ||
                                method.method ||
                                ""
                              : method;

                          if (
                            typeof methodName === "string" &&
                            methodName.toLowerCase().includes("cash")
                          ) {
                            return "Pay when you receive";
                          } else {
                            return "Paid successfully";
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleTrackOrder}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Truck size={20} />
                    Track Your Order
                  </button>

                  <button
                    onClick={handleDownloadInvoice}
                    disabled={isGeneratingInvoice}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={20} />
                    {isGeneratingInvoice ? "Generating..." : "Download Invoice"}
                  </button>

                  <button
                    onClick={handleShareOrder}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 size={20} />
                    Share Order
                  </button>
                </div>
              </div>

              {/* Support & Next Steps */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  What's Next?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="text-blue-600 mt-1" size={16} />
                    <div>
                      <p className="font-medium text-gray-900">
                        Order Processing
                      </p>
                      <p className="text-gray-600 text-sm">
                        We'll start preparing your order within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="text-green-600 mt-1" size={16} />
                    <div>
                      <p className="font-medium text-gray-900">
                        Shipping Updates
                      </p>
                      <p className="text-gray-600 text-sm">
                        You'll receive tracking information via email
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="text-purple-600 mt-1" size={16} />
                    <div>
                      <p className="font-medium text-gray-900">Need Help?</p>
                      <p className="text-gray-600 text-sm">
                        Contact support for any questions about your order
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Want to explore more?</p>
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-3"
                  >
                    <Home size={16} />
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
