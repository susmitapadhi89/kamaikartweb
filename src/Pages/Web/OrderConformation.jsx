// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   CheckCircle,
//   Truck,
//   Calendar,
//   CreditCard,
//   MapPin,
//   Package,
//   Download,
//   Share2,
//   Home,
//   ShoppingBag,
//   Shield,
//   Clock,
//   Mail,
//   Phone,
//   MapPin as PinIcon,
//   Store,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function OrderConfirmation() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get order data from navigation state (from API response)
//   const orderDataFromAPI = location.state?.orderData;

//   // Transform API data to match frontend format
//   const transformOrderData = () => {
//     if (!orderDataFromAPI) return null;

//     // Handle both single order and orders array
//     const primaryOrder = orderDataFromAPI[0];

//     if (!primaryOrder) return null;

//     return {
//       orderId: primaryOrder.orderId?.toString() || `ORD${Date.now()}`,
//       totalAmount: parseFloat(primaryOrder.totalAmount) || 0,
//       subtotal: parseFloat(primaryOrder.subtotal) || 0,
//       shipping: parseFloat(primaryOrder.shipping) || 0,
//       tax: parseFloat(primaryOrder.tax) || 0,
//       paymentMethod: primaryOrder.paymentMethod || "online",
//       estimatedDelivery: primaryOrder.estimatedDelivery || "",
//       address: primaryOrder.address || {},
//       items: (primaryOrder.items || []).map((item) => ({
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         quantity: item.quantity,
//         sellingPrice: parseFloat(item.sellingPrice) || 0,
//         size:
//           item.variant?.attributes?.find(
//             (attr) => attr.name?.toLowerCase() === "size"
//           )?.value || "Standard",
//         color:
//           item.variant?.attributes?.find(
//             (attr) =>
//               attr.name?.toLowerCase() === "color" ||
//               attr.name?.toLowerCase() === "colour"
//           )?.value || "Default",
//       })),
//     };
//   };

//   const orderData = transformOrderData();

//   // Local state
//   const [estimatedDelivery, setEstimatedDelivery] = useState("");
//   const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

//   // Use API estimated delivery or calculate one
//   useEffect(() => {
//     if (orderData?.estimatedDelivery) {
//       setEstimatedDelivery(
//         new Date(orderData.estimatedDelivery).toLocaleDateString("en-US", {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })
//       );
//     } else {
//       const deliveryDate = new Date();
//       deliveryDate.setDate(
//         deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3
//       );
//       setEstimatedDelivery(
//         deliveryDate.toLocaleDateString("en-US", {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })
//       );
//     }

//     //
//   }, [orderData]);

//   // Calculate order summary from API data
//   const subtotal = orderData?.subtotal || 0;
//   const shipping = orderData?.shipping || 0;
//   const tax = orderData?.tax || 0;
//   const total = orderData?.totalAmount || 0;

//   const handleDownloadInvoice = async () => {
//     if (!orderData) return;

//     setIsGeneratingInvoice(true);
//     toast.loading("Generating invoice...", { id: "invoice" });

//     try {
//       const doc = new jsPDF();

//       // Header with styling
//       doc.setFillColor(59, 130, 246);
//       doc.rect(0, 0, 220, 40, "F");

//       doc.setFontSize(20);
//       doc.setTextColor(255, 255, 255);
//       doc.text("KamaiCart", 105, 20, { align: "center" });

//       doc.setFontSize(10);
//       doc.setTextColor(255, 255, 255);
//       doc.text("INVOICE", 105, 30, { align: "center" });

//       // Order Info
//       doc.setFontSize(8);
//       doc.setTextColor(150, 150, 150);
//       doc.text("Order Details", 14, 55);

//       doc.setFontSize(10);
//       doc.setTextColor(40, 40, 40);
//       doc.text(`Order ID: ${orderData.orderId}`, 14, 62);
//       doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 14, 68);
//       doc.text(`Estimated Delivery: ${estimatedDelivery}`, 14, 74);

//       // Shipping Info
//       if (orderData.address) {
//         doc.setFontSize(8);
//         doc.setTextColor(150, 150, 150);
//         doc.text("Shipping Address", 14, 85);

//         doc.setFontSize(10);
//         doc.setTextColor(40, 40, 40);
//         doc.text(orderData.address.name || "Customer", 14, 92);
//         doc.text(
//           `${orderData.address.flat || ""}, ${orderData.address.area || ""}`,
//           14,
//           98
//         );
//         doc.text(orderData.address.address1 || "", 14, 104);
//         if (orderData.address.address2)
//           doc.text(orderData.address.address2, 14, 110);
//         doc.text(
//           `Postal Code: ${orderData.address.postal_code || ""}`,
//           14,
//           116
//         );
//         doc.text(`Phone: ${orderData.address.phone_number || ""}`, 14, 122);
//       }

//       // Table Data
//       const tableData = orderData.items.map((item, index) => [
//         index + 1,
//         item.name.substring(0, 30) + (item.name.length > 30 ? "..." : ""),
//         item.size,
//         item.color,
//         item.quantity,
//         `₹${item.sellingPrice.toLocaleString()}`,
//         `₹${(item.sellingPrice * item.quantity).toLocaleString()}`,
//       ]);

//       autoTable(doc, {
//         startY: orderData.address ? 130 : 85,
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

//       const finalY = doc.lastAutoTable.finalY + 10;

//       // Summary
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

//       // Payment Method
//       doc.setFontSize(10);
//       doc.setFont(undefined, "normal");
//       doc.text(
//         `Payment Method: ${getPaymentMethodText(orderData.paymentMethod)}`,
//         14,
//         finalY + 35
//       );

//       // Footer
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

//       doc.save(`kamaicart-${orderData.orderId}.pdf`);
//       toast.success("OrderDetail downloaded successfully!", {
//         id: "kamaicart",
//       });
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
//     if (!method) return "Unknown Payment Method";

//     const methodName =
//       typeof method === "object"
//         ? method.name || method.payment_name || method.method || ""
//         : method;

//     if (typeof methodName !== "string") return "Unknown Payment Method";

//     const name = methodName.toLowerCase();

//     if (name.includes("cash") || name.includes("cod"))
//       return "Cash on Delivery";
//     if (name.includes("razorpay") || name.includes("card"))
//       return "Paid Online via Razorpay";
//     return "Payment Successful";
//   };

//   const handleShareOrder = () => {
//     if (!orderData) return;

//     const shareData = {
//       title: `Order ${orderData.orderId} - KamaiCart`,
//       text: `I just placed an order on KamaiCart! Order ID: ${orderData.orderId}, Total: ₹${total}`,
//     };

//     if (navigator.share) {
//       navigator.share(shareData);
//     } else {
//       navigator.clipboard.writeText(
//         `Order ID: ${orderData.orderId}\nTotal: ₹${total}\nEstimated Delivery: ${estimatedDelivery}`
//       );
//       toast.success("Order details copied to clipboard");
//     }
//   };

//   const handleContinueShopping = () => {
//     navigate("/products");
//   };

//   const handleContactSupport = () => {
//     window.location.href = "mailto:support@kamaicart.com";
//   };

//   // If no order data, redirect to home
//   if (!orderData) {
//     navigate("/");
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="container mx-auto px-4 py-8 relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
//                 <CheckCircle className="text-green-600" size={48} />
//               </div>
//               <div className="absolute -top-2 -right-2">
//                 <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
//                   ✓
//                 </div>
//               </div>
//             </div>
//           </div>

//           <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//             Order Confirmed!
//           </h1>
//           <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
//             Thank you for your purchase! Your order has been confirmed and is
//             being processed.
//           </p>

//           <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 inline-block shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="bg-blue-100 p-3 rounded-xl">
//                 <Package className="text-blue-600" size={24} />
//               </div>
//               <div className="text-left">
//                 <p className="text-blue-800 font-semibold text-sm">ORDER ID</p>
//                 <p className="text-blue-900 font-bold text-xl">
//                   {orderData.orderId}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {/* Left Column - Order Details */}
//           <div className="xl:col-span-2 space-y-8">
//             {/* Delivery Timeline */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
//                 <div className="bg-green-100 p-2 rounded-lg">
//                   <Truck className="text-green-600" size={24} />
//                 </div>
//                 Delivery Timeline
//               </h2>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//                 {/* Delivery Date */}
//                 <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="bg-green-100 p-3 rounded-xl">
//                       <Calendar className="text-green-600" size={24} />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-green-900 text-lg">
//                         Estimated Delivery
//                       </h3>
//                       <p className="text-green-800 font-semibold text-xl">
//                         {estimatedDelivery}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-green-700 text-sm">
//                     Standard delivery • 3-5 business days
//                   </p>
//                 </div>

//                 {/* Shipping Address */}
//                 {orderData.address && (
//                   <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="bg-blue-100 p-3 rounded-xl">
//                         <MapPin className="text-blue-600" size={24} />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-blue-900 text-lg">
//                           Shipping Address
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="space-y-2 text-blue-800">
//                       <div className="flex items-center gap-2">
//                         <PinIcon size={16} className="text-blue-600" />
//                         <p className="font-semibold">
//                           {orderData.address.name}
//                         </p>
//                       </div>
//                       <p className="text-sm ml-6">
//                         {orderData.address.flat}, {orderData.address.area}
//                       </p>
//                       <p className="text-sm ml-6">
//                         {orderData.address.address1}
//                       </p>
//                       {orderData.address.address2 && (
//                         <p className="text-sm ml-6">
//                           {orderData.address.address2}
//                         </p>
//                       )}
//                       <div className="flex items-center gap-4 mt-3 pt-3 border-t border-blue-200">
//                         <div className="flex items-center gap-2">
//                           <Mail size={14} className="text-blue-600" />
//                           <span className="text-xs">
//                             Postal: {orderData.address.postal_code}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Phone size={14} className="text-blue-600" />
//                           <span className="text-xs">
//                             {orderData.address.phone_number}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Order Status Steps */}
//             </div>

//             {/* Order Items */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
//                 <div className="bg-blue-100 p-2 rounded-lg">
//                   <Package className="text-blue-600" size={24} />
//                 </div>
//                 Order Items ({orderData.items.length})
//               </h2>

//               <div className="space-y-4">
//                 {orderData.items.map((item, index) => (
//                   <div
//                     key={`${item.id}-${index}`}
//                     className="flex items-center gap-6 p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300 bg-white"
//                   >
//                     <div className="relative">
//                       <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
//                         {item.image ? (
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.style.display = "none";
//                               e.target.nextSibling.style.display = "flex";
//                             }}
//                           />
//                         ) : null}
//                         <div
//                           className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 ${
//                             item.image ? "hidden" : "flex"
//                           }`}
//                         >
//                           <Package size={24} />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-bold text-gray-900 text-lg mb-2 truncate">
//                         {item.name}
//                       </h3>
//                       <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                         <span className="bg-gray-100 px-3 py-1 rounded-full">
//                           Size: {item.size}
//                         </span>
//                         <span className="bg-gray-100 px-3 py-1 rounded-full">
//                           Color: {item.color}
//                         </span>
//                         <span className="bg-gray-100 px-3 py-1 rounded-full">
//                           Qty: {item.quantity}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-bold text-gray-900 text-lg">
//                         ₹{(item.sellingPrice * item.quantity).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
//                 <div className="bg-purple-100 p-2 rounded-lg">
//                   <CreditCard className="text-purple-600" size={24} />
//                 </div>
//                 Payment Information
//               </h2>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
//                   <h3 className="font-bold text-gray-900 mb-4 text-lg">
//                     Payment Details
//                   </h3>
//                   <div className="flex items-center gap-4">
//                     <div className="bg-white p-3 rounded-xl shadow-sm">
//                       <CreditCard className="text-purple-600" size={24} />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900 text-lg">
//                         {getPaymentMethodText(orderData.paymentMethod)}
//                       </p>
//                       <p className="text-gray-600">
//                         {(() => {
//                           const method = orderData.paymentMethod;
//                           const methodName =
//                             typeof method === "object" ? method.name : method;
//                           return methodName?.toLowerCase().includes("cash")
//                             ? "Pay when you receive"
//                             : "Paid successfully";
//                         })()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6">
//                   <h3 className="font-bold text-gray-900 mb-4 text-lg">
//                     Order Summary
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between text-gray-600">
//                       <span>Items ({orderData.items.length})</span>
//                       <span>₹{subtotal.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-gray-600">
//                       <span>Shipping</span>
//                       <span
//                         className={
//                           shipping === 0 ? "text-green-600 font-semibold" : ""
//                         }
//                       >
//                         {shipping === 0 ? "FREE" : `₹${shipping}`}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-gray-600">
//                       <span>Tax</span>
//                       <span>₹{tax.toFixed(2)}</span>
//                     </div>
//                     <div className="border-t border-gray-200 pt-3">
//                       <div className="flex justify-between text-lg font-bold text-gray-900">
//                         <span>Total Amount</span>
//                         <span className="text-blue-600">
//                           ₹{total.toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Quick Actions & Support */}
//           <div className="xl:col-span-1">
//             <div className="sticky top-8 space-y-8">
//               {/* Quick Actions */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Quick Actions
//                 </h2>

//                 <div className="space-y-4">
//                   <button
//                     onClick={handleDownloadInvoice}
//                     disabled={isGeneratingInvoice}
//                     className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                   >
//                     <Download size={24} />
//                     {isGeneratingInvoice
//                       ? "Generating Invoice..."
//                       : "Download Invoice"}
//                   </button>

//                   <button
//                     onClick={handleShareOrder}
//                     className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:border-green-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
//                   >
//                     <Share2 size={24} />
//                     Share Order Details
//                   </button>
//                 </div>
//               </div>

//               {/* Support & Next Steps */}
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200 p-8">
//                 <h3 className="font-bold text-gray-900 mb-6 text-xl">
//                   What's Next?
//                 </h3>
//                 <div className="space-y-6">
//                   <div className="flex items-start gap-4">
//                     <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
//                       <Clock className="text-blue-600" size={20} />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900">
//                         Order Processing
//                       </p>
//                       <p className="text-gray-600 text-sm mt-1">
//                         We'll start preparing your order within the next few
//                         hours
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
//                       <Truck className="text-green-600" size={20} />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900">
//                         Shipping Updates
//                       </p>
//                       <p className="text-gray-600 text-sm mt-1">
//                         Track your order with real-time updates via email & SMS
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="bg-purple-100 p-3 rounded-xl flex-shrink-0">
//                       <Shield className="text-purple-600" size={20} />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900">Need Help?</p>
//                       <p className="text-gray-600 text-sm mt-1">
//                         Our support team is here to help with any questions
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleContactSupport}
//                   className="w-full mt-6 bg-white border-2 border-blue-200 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <Mail size={18} />
//                   Contact Support
//                 </button>
//               </div>

//               {/* Continue Shopping */}
//               <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-8 text-center">
//                 <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                   <ShoppingBag className="text-green-600" size={28} />
//                 </div>

//                 <h3 className="font-bold text-gray-900 mb-3 text-lg">
//                   Explore More
//                 </h3>
//                 <p className="text-gray-600 mb-6 text-sm">
//                   Discover more amazing products and deals
//                 </p>

//                 <div className="space-y-3">
//                   <button
//                     onClick={handleContinueShopping}
//                     className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//                   >
//                     <ShoppingBag size={20} />
//                     Continue Shopping
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
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
  ShoppingBag,
  Shield,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Custom PinIcon component
const PinIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from navigation state (from API response)
  const orderDataFromAPI = location.state?.orderData;

  // Transform API data to match frontend format
  const transformOrderData = () => {
    if (!orderDataFromAPI) return null;

    // Handle the actual API response structure with data.orders
    if (orderDataFromAPI.data && orderDataFromAPI.data.orders) {
      const {
        orders,
        address,
        paymentMethod,
        subtotal,
        tax,
        shipping,
        totalAmount,
      } = orderDataFromAPI.data;

      if (!orders || orders.length === 0) return null;

      const primaryOrder = orders[0];

      return {
        orderId: primaryOrder.orderId?.toString() || `ORD${Date.now()}`,
        totalAmount: parseFloat(totalAmount) || 0,
        subtotal: parseFloat(subtotal) || 0,
        shipping: parseFloat(shipping) || 0,
        tax: parseFloat(tax) || 0,
        paymentMethod: paymentMethod || { name: "Cash on Delivery" },
        estimatedDelivery: primaryOrder.estimatedDelivery || "",
        address: address || {},
        items: orders.flatMap((order) =>
          (order.items || []).map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            sellingPrice: parseFloat(item.sellingPrice) || 0,
            size: "Standard",
            color: "Default",
          }))
        ),
        // Store all orders for grouped display
        allOrders: orders,
      };
    }

    // Handle legacy format (single order)
    const primaryOrder = orderDataFromAPI[0];
    if (!primaryOrder) return null;

    return {
      orderId: primaryOrder.orderId?.toString() || `ORD${Date.now()}`,
      totalAmount: parseFloat(primaryOrder.totalAmount) || 0,
      subtotal: parseFloat(primaryOrder.subtotal) || 0,
      shipping: parseFloat(primaryOrder.shipping) || 0,
      tax: parseFloat(primaryOrder.tax) || 0,
      paymentMethod: primaryOrder.paymentMethod || "online",
      estimatedDelivery: primaryOrder.estimatedDelivery || "",
      address: primaryOrder.address || {},
      items: (primaryOrder.items || []).map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        sellingPrice: parseFloat(item.sellingPrice) || 0,
        size: "Standard",
        color: "Default",
      })),
      allOrders: [primaryOrder],
    };
  };

  const orderData = transformOrderData();

  // Local state
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Handle redirect in useEffect
  useEffect(() => {
    if (!orderData) {
      setShouldRedirect(true);
    }
  }, [orderData]);

  // Perform navigation in useEffect
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  }, [shouldRedirect, navigate]);

  // Use API estimated delivery or calculate one
  useEffect(() => {
    if (orderData?.estimatedDelivery) {
      setEstimatedDelivery(
        new Date(orderData.estimatedDelivery).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
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

      // Header with styling
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, 220, 40, "F");

      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text("KamaiCart", 105, 20, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text("INVOICE", 105, 30, { align: "center" });

      // Order Info
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Order Details", 14, 55);

      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text(`Order ID: ${orderData.orderId}`, 14, 62);
      doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 14, 68);
      doc.text(`Estimated Delivery: ${estimatedDelivery}`, 14, 74);

      // Shipping Info
      if (orderData.address) {
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Shipping Address", 14, 85);

        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        doc.text(orderData.address.name || "Customer", 14, 92);
        doc.text(
          `${orderData.address.flat || ""}, ${orderData.address.area || ""}`,
          14,
          98
        );
        doc.text(orderData.address.address1 || "", 14, 104);
        if (orderData.address.address2)
          doc.text(orderData.address.address2, 14, 110);
        doc.text(
          `Postal Code: ${orderData.address.postal_code || ""}`,
          14,
          116
        );
        doc.text(`Phone: ${orderData.address.phone_number || ""}`, 14, 122);
      }

      // Table Data
      const tableData = orderData.items.map((item, index) => [
        index + 1,
        item.name.substring(0, 30) + (item.name.length > 30 ? "..." : ""),
        item.size,
        item.color,
        item.quantity,
        `₹${item.sellingPrice.toLocaleString()}`,
        `₹${(item.sellingPrice * item.quantity).toLocaleString()}`,
      ]);

      autoTable(doc, {
        startY: orderData.address ? 130 : 85,
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

      doc.save(`kamaicart-${orderData.orderId}.pdf`);
      toast.success("Invoice downloaded successfully!", {
        id: "invoice",
      });
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

    const shareData = {
      title: `Order ${orderData.orderId} - KamaiCart`,
      text: `I just placed an order on KamaiCart! Order ID: ${orderData.orderId}, Total: ₹${total}`,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(
        `Order ID: ${orderData.orderId}\nTotal: ₹${total}\nEstimated Delivery: ${estimatedDelivery}`
      );
      toast.success("Order details copied to clipboard");
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@kamaicart.com";
  };

  // Group items by order for display
  const getItemsGroupedByOrder = () => {
    if (!orderData?.allOrders) return [];

    return orderData.allOrders.map((order) => ({
      orderId: order.orderId,
      sellerId: order.sellerId,
      items: order.items || [],
      orderTotal: order.totalAmount,
    }));
  };

  const ordersGrouped = getItemsGroupedByOrder();

  // Show loading or redirect instead of rendering and then redirecting
  if (shouldRedirect || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                  ✓
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Thank you for your purchase! Your order has been confirmed and is
            being processed.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Order Details */}
          <div className="xl:col-span-2 space-y-8">
            {/* Delivery Timeline */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Truck className="text-green-600" size={24} />
                </div>
                Delivery Timeline
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Delivery Date */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Calendar className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900 text-lg">
                        Estimated Delivery
                      </h3>
                      <p className="text-green-800 font-semibold text-xl">
                        {estimatedDelivery}
                      </p>
                    </div>
                  </div>
                  <p className="text-green-700 text-sm">
                    Standard delivery • 3-5 business days
                  </p>
                </div>

                {/* Shipping Address */}
                {orderData.address && (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <MapPin className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-900 text-lg">
                          Shipping Address
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-2 text-blue-800">
                      <div className="flex items-center gap-2">
                        <PinIcon size={16} className="text-blue-600" />
                        <p className="font-semibold">
                          {orderData.address.name}
                        </p>
                      </div>
                      <p className="text-sm ml-6">
                        {orderData.address.flat}, {orderData.address.area}
                      </p>
                      <p className="text-sm ml-6">
                        {orderData.address.address1}
                      </p>
                      {orderData.address.address2 && (
                        <p className="text-sm ml-6">
                          {orderData.address.address2}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-blue-200">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-blue-600" />
                          <span className="text-xs">
                            Postal: {orderData.address.postal_code}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-blue-600" />
                          <span className="text-xs">
                            {orderData.address.phone_number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Package className="text-blue-600" size={24} />
                </div>
                Order Items ({orderData.items.length})
              </h2>

              <div className="space-y-8">
                {ordersGrouped.map((orderGroup, groupIndex) => (
                  <div
                    key={orderGroup.orderId}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            Order: {orderGroup.orderId}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Seller ID: {orderGroup.sellerId}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Order Total</p>
                          <p className="font-bold text-blue-600">
                            ₹{parseFloat(orderGroup.orderTotal).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 space-y-4">
                      {orderGroup.items.map((item, itemIndex) => (
                        <div
                          key={`${item.id}-${itemIndex}`}
                          className="flex items-center gap-6 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 bg-white"
                        >
                          <div className="relative">
                            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                  }}
                                />
                              ) : null}
                              <div
                                className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 ${
                                  item.image ? "hidden" : "flex"
                                }`}
                              >
                                <Package size={24} />
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-lg mb-2 truncate">
                              {item.name}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span className="bg-gray-100 px-3 py-1 rounded-full">
                                Size: Standard
                              </span>
                              <span className="bg-gray-100 px-3 py-1 rounded-full">
                                Color: Default
                              </span>
                              <span className="bg-gray-100 px-3 py-1 rounded-full">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-gray-900 text-lg">
                              ₹
                              {(
                                parseFloat(item.sellingPrice) * item.quantity
                              ).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              ₹{parseFloat(item.sellingPrice).toLocaleString()}{" "}
                              each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CreditCard className="text-purple-600" size={24} />
                </div>
                Payment Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">
                    Payment Details
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                      <CreditCard className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {getPaymentMethodText(orderData.paymentMethod)}
                      </p>
                      <p className="text-gray-600">
                        {(() => {
                          const method = orderData.paymentMethod;
                          const methodName =
                            typeof method === "object" ? method.name : method;
                          return methodName?.toLowerCase().includes("cash")
                            ? "Pay when you receive"
                            : "Paid successfully";
                        })()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Items ({orderData.items.length})</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span
                        className={
                          shipping === 0 ? "text-green-600 font-semibold" : ""
                        }
                      >
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total Amount</span>
                        <span className="text-blue-600">
                          ₹{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Support */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h2>

                <div className="space-y-4">
                  <button
                    onClick={handleDownloadInvoice}
                    disabled={isGeneratingInvoice}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Download size={24} />
                    {isGeneratingInvoice
                      ? "Generating Invoice..."
                      : "Download Invoice"}
                  </button>

                  <button
                    onClick={handleShareOrder}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:border-green-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                  >
                    <Share2 size={24} />
                    Share Order Details
                  </button>
                </div>
              </div>

              {/* Support & Next Steps */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200 p-8">
                <h3 className="font-bold text-gray-900 mb-6 text-xl">
                  What's Next?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                      <Clock className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Order Processing
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        We'll start preparing your order within the next few
                        hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                      <Truck className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Shipping Updates
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Track your order with real-time updates via email & SMS
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-xl flex-shrink-0">
                      <Shield className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Need Help?</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Our support team is here to help with any questions
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContactSupport}
                  className="w-full mt-6 bg-white border-2 border-blue-200 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Contact Support
                </button>
              </div>

              {/* Continue Shopping */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="text-green-600" size={28} />
                </div>

                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Explore More
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Discover more amazing products and deals
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={20} />
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
