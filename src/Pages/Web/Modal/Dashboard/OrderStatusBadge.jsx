import { CheckCircle, Truck, Clock, XCircle, Package } from "lucide-react";

export const OrderStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();

    switch (statusLower) {
      case "delivered":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          label: "Delivered",
        };
      case "shipped":
        return {
          icon: <Truck className="w-4 h-4" />,
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          borderColor: "border-blue-200",
          label: "Shipped",
        };
      case "pending":
        return {
          icon: <Clock className="w-4 h-4" />,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
          label: "Pending",
        };
      case "cancelled":
        return {
          icon: <XCircle className="w-4 h-4" />,
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          label: "Cancelled",
        };
      default:
        return {
          icon: <Package className="w-4 h-4" />,
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
          label: status || "Processing",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} text-sm font-medium`}
    >
      {config.icon}
      {config.label}
    </div>
  );
};
