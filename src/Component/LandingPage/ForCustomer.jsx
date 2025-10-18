import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Share2,
  Wallet,
  CreditCard,
  DollarSign,
  MessageCircle,
  Link,
  CheckSquare,
} from "lucide-react";

const ForCustomers = () => {
  const features = [
    {
      id: 1,
      icon: ShoppingCart,
      title: "Cashback & Rewards",
      description: "Get instant cashback and rewards on every purchase",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      elements: [DollarSign, CreditCard],
      delay: 0.1,
    },
    {
      id: 2,
      icon: Share2,
      title: "Revalue & Share to Earn Margin",
      description: "Share products and earn margins through referrals",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      elements: [MessageCircle, Link],
      delay: 0.2,
    },
    {
      id: 3,
      icon: Wallet,
      title: "Dual Wallet System",
      description: "Secure locked and unlocked wallet system",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      elements: [CheckSquare],
      delay: 0.3,
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Unique Hybrid Payment",
      description: "Pay with coins + cash for maximum flexibility",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      elements: [DollarSign, CheckSquare],
      delay: 0.4,
    },
  ];

  return (
    <section id="customers" className="py-20 bg-white">
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
            For <span className="gradient-text">Customers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            KamaiKart पर, हर क्लिक आपको एक्स्ट्रा बेनिफिट्स देता है। रिवॉर्ड्स
            और कैशबैक के साथ-साथ, आप प्रोडक्ट्स को शेयर करके भी कमा सकते हैं।
            हमारा हाइब्रिड पेमेंट सिस्टम आपको पूरी फ्लेक्सिबिलिटी देता है।
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Feature Card */}
              <div
                className={`${feature.bgColor} h-full flex flex-col rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                </div>

                {/* Main Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: feature.delay + 0.2 }}
                  viewport={{ once: true }}
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full mb-6 shadow-xl relative z-10`}
                >
                  <feature.icon className="h-10 w-10 text-white" />
                </motion.div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 flex space-x-2">
                  {feature.elements.map((Element, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: feature.delay + 0.4 + idx * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
                    >
                      <Element className="h-4 w-4 text-gray-600" />
                    </motion.div>
                  ))}
                </div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: feature.delay + 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl font-bold text-gray-900 mb-4 relative z-10"
                >
                  {feature.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: feature.delay + 0.8 }}
                  viewport={{ once: true }}
                  className="text-gray-600 leading-relaxed text-sm relative z-10"
                >
                  {feature.description}
                </motion.p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Earning?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of customers who are already earning with every
              purchase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Start Shopping</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForCustomers;
