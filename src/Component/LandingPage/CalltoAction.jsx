import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Download,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

const CallToAction = () => {
  const appStores = [
    {
      name: "Google Play",
      icon: "📱",
      url: "#",
      color: "from-green-500 to-green-600",
      text: "Get on Google Play",
    },
    {
      name: "App Store",
      icon: "🍎",
      url: "#",
      color: "from-gray-700 to-gray-800",
      text: "Download on the App Store",
    },
  ];

  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "50K+",
      color: "text-blue-600",
    },
    {
      icon: Star,
      label: "App Rating",
      value: "4.8★",
      color: "text-yellow-500",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "+25%",
      color: "text-green-600",
    },
  ];

  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Coins */}
        <motion.div
          className="absolute top-20 left-10 text-yellow-400 opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-6xl">💰</div>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 text-yellow-400 opacity-15"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-4xl">💎</div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 text-white opacity-10"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-5xl">🚀</div>
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Smartphone className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              Download the <span className="text-yellow-400">KamaiKart</span>{" "}
              App
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Start your new shopping journey today! Join thousands of users who
              are already earning with every purchase.
            </p>
          </motion.div>

          {/* App Store Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {appStores.map((store, index) => (
              <motion.button
                key={store.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${store.color} hover:shadow-2xl text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-4 min-w-[200px] group`}
              >
                <span className="text-2xl">{store.icon}</span>
                <div className="text-left">
                  <div className="text-sm opacity-90">Download on the</div>

                  <div className="text-lg font-bold">{store.name}</div>
                </div>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-3">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            What You Get with KamaiKart
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "💰",
                title: "Instant Cashback",
                desc: "Get rewards on every purchase",
              },
              {
                icon: "🔒",
                title: "Secure Wallet",
                desc: "Safe coin storage system",
              },
              {
                icon: "📱",
                title: "Easy Shopping",
                desc: "Simple and intuitive interface",
              },
              {
                icon: "🚀",
                title: "Quick Growth",
                desc: "Earn more with referrals",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-blue-100 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-blue-100 text-lg mb-6">
            Don't miss out on the future of e-commerce
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-12 rounded-full transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 flex items-center space-x-3 mx-auto"
          >
            <Download className="h-6 w-6" />

            <span className="text-xl">Download Now</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
        className="relative z-10 border-t border-white/20 mt-16 pt-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">KamaiKart</span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-blue-100 text-sm">
                © 2025 KamaiKart. The Future of E-Commerce.
              </p>
              <p className="text-blue-200 text-xs mt-1">
                Shop, Earn, and Share with every transaction
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
