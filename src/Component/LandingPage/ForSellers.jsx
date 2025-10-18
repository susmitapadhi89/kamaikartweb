import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  BarChart3,
  Package,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  PieChart,
  ShoppingCart,
  Settings,
} from "lucide-react";

const ForSellers = () => {
  const dashboardStats = [
    {
      label: "Total Orders",
      value: "2,847",
      change: "+12%",
      color: "text-blue-600",
      icon: ShoppingCart,
    },
    {
      label: "Revenue",
      value: "₹1,24,580",
      change: "+8%",
      color: "text-green-600",
      icon: DollarSign,
    },
    {
      label: "Active Products",
      value: "156",
      change: "+5%",
      color: "text-purple-600",
      icon: Package,
    },
    {
      label: "New Customers",
      value: "423",
      change: "+15%",
      color: "text-orange-600",
      icon: Users,
    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Order Management",
      description: "Real-time order tracking and management system",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: PieChart,
      title: "Settlement Reports",
      description: "Transparent and detailed financial reports",
      color: "from-green-500 to-green-600",
    },
    {
      icon: CheckCircle,
      title: "Transparent Fee Structure",
      description: "Simple All-in-One fee structure for maximum profit",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section id="sellers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
            For <span className="gradient-text">Sellers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Grow Your Business with Transparency. हमारा मकसद है आपको ज्यादा
            ऑर्डर्स और कम हेडेक देना। कामाईकार्ट पर आपको एक सिंपल All-in-One Fee
            structure मिलता है, जिससे आपका मुनाफा बढ़ता है।
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="btn-primary text-lg px-8 py-4"
          >
            Become a Seller
          </motion.button>
        </motion.div>

        {/* Dashboard Visual */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Monitor className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      KamaiKart Seller Dashboard
                    </h3>
                    <p className="text-blue-100">Welcome back, John!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                  <TrendingUp className="h-4 w-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    Live Analytics
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts and Reports */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Order Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Order Trends
                    </h4>
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-end justify-around p-4">
                    {[40, 65, 45, 80, 60, 75, 90].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm w-6"
                      ></motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Fee Structure */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Fee Structure
                    </h4>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-700">Platform Fee</span>
                      <span className="font-semibold text-green-600">2.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-700">Payment Processing</span>
                      <span className="font-semibold text-green-600">1.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-green-200">
                      <span className="text-gray-900 font-medium">
                        Total Fee
                      </span>
                      <span className="font-bold text-green-600 text-lg">
                        4%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mb-6 shadow-lg`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Grow Your Business?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of sellers who are already growing their business
              with KamaiKart's transparent and profitable platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Selling Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForSellers;
