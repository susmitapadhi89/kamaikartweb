import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Store,
  TrendingUp,
  Coins,
  CheckCircle,
  Star,
} from "lucide-react";

const UniqueModel = () => {
  const modelPoints = [
    {
      id: "customer",
      title: "Customer",
      subtitle: "Cashback + Rewards",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      position: "left",
      features: [
        "Instant Cashback",
        "Coin Rewards",
        "Share & Earn",
        "Hybrid Payments",
      ],
      delay: 0.2,
    },
    {
      id: "seller",
      title: "Seller",
      subtitle: "Transparent Fee & More Orders",
      icon: Store,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      position: "right",
      features: [
        "Low Commission",
        "More Orders",
        "Real-time Analytics",
        "Quick Settlement",
      ],
      delay: 0.4,
    },
  ];

  return (
    <section id="unique-model" className="py-20 bg-white">
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
            Our <span className="gradient-text">Unique Model</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            कामाईकार्ट एक 'विन-विन' मॉडल है। जहाँ कस्टमर को कैशबैक, रिवॉर्ड और
            कमाई मिलती है, वहीं सेलर को एक पारदर्शी फीस स्ट्रक्चर और ज्यादा
            ऑर्डर्स मिलते हैं। यह सब मिलकर प्लेटफॉर्म के लिए एक टिकाऊ राजस्व
            मॉडल तैयार करता है।
          </p>
        </motion.div>

        {/* Pyramid Model */}
        <div className="relative max-w-4xl mx-auto">
          {/* Top Point - KamaiKart Platform */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-20 flex justify-center mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl text-white text-center max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
              >
                <Shield className="h-8 w-8" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">KamaiKart</h3>
              <p className="text-purple-100 font-medium">
                Sustainable Revenue Model
              </p>
            </div>
          </motion.div>

          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 z-10">
            <svg width="600" height="200" className="overflow-visible">
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                d="M 300 0 L 150 150 M 300 0 L 450 150"
                stroke="#e5e7eb"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
          </div>

          {/* Bottom Points - Customer and Seller */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {modelPoints.map((point) => (
              <motion.div
                key={point.id}
                initial={{
                  opacity: 0,
                  y: 50,
                  x: point.position === "left" ? -50 : 50,
                }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.8, delay: point.delay }}
                viewport={{ once: true }}
                className={`${point.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                {/* Icon and Title */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: point.delay + 0.2 }}
                    viewport={{ once: true }}
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${point.color} rounded-full mb-4 shadow-lg`}
                  >
                    <point.icon className="h-10 w-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {point.title}
                  </h3>

                  <p className={`text-lg font-semibold ${point.iconColor}`}>
                    {point.subtitle}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {point.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{
                        opacity: 0,
                        x: point.position === "left" ? -20 : 20,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: point.delay + 0.4 + index * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm"
                    >
                      <CheckCircle className={`h-5 w-5 ${point.iconColor}`} />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: point.delay + 0.6 }}
                    viewport={{ once: true }}
                    className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
                  >
                    <Star className="h-4 w-4 text-yellow-500" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: point.delay + 0.8 }}
                    viewport={{ once: true }}
                    className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
                  >
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Why This Model Works
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our innovative approach creates value for everyone in the
                ecosystem
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                  <Coins className="h-8 w-8 text-yellow-500 mx-auto" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Sustainable Revenue
                </h4>
                <p className="text-gray-600">
                  Long-term value creation through coin-based transactions
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-blue-500 mx-auto" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Win-Win for All
                </h4>
                <p className="text-gray-600">
                  Customers earn, sellers grow, platform thrives
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Continuous Growth
                </h4>
                <p className="text-gray-600">
                  Scalable model that grows with user engagement
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UniqueModel;
