// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Smartphone, ShoppingBag, Coins, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg">
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Digital Coins */}
          <motion.div
            className="absolute top-20 left-10 text-yellow-400 opacity-30"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Coins className="h-12 w-12" />
          </motion.div>

          <motion.div
            className="absolute top-32 right-20 text-yellow-400 opacity-20"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Coins className="h-16 w-16" />
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-20 text-yellow-400 opacity-25"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Coins className="h-14 w-14" />
          </motion.div>

          {/* E-commerce Products */}
          <motion.div
            className="absolute top-40 right-32 text-white opacity-20"
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShoppingBag className="h-10 w-10" />
          </motion.div>

          <motion.div
            className="absolute bottom-40 right-10 text-white opacity-15"
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star className="h-8 w-8" />
          </motion.div>

          <motion.div
            className="absolute top-60 left-1/4 text-white opacity-20"
            animate={{
              y: [0, 25, 0],
              rotate: [0, 90],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Smartphone className="h-12 w-12" />
          </motion.div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-shadow-lg leading-tight"
              >
                KamaiKart:
                <br />
                <span className="text-yellow-400">The Future</span>
                <br />
                of E-Commerce
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-200 text-shadow max-w-2xl mx-auto"
              >
                Shop, Earn, and Share. Welcome to a platform where every
                transaction is a win-win.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                <Link to={"/home"}>Shop Now </Link>
              </button>
              <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                <Link to={"https://www.kamaikart.in/seller/register"}>
                  Become a Seller
                </Link>{" "}
              </button>
            </motion.div>
          </motion.div>

          {/* Central Image - Mobile with App Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem]  shadow-2xl">
                <div className="bg-white rounded-[2rem] h-[600px] relative overflow-hidden">
                  {/* App Interface Mockup */}
                  <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-[2rem]">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <Smartphone className="h-4 w-4" />
                          </div>
                          <span className="font-bold">KamaiKart</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Coins className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">1,250</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 space-y-6">
                      {/* Search Bar */}
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-gray-300 rounded"></div>
                          <span className="text-gray-500 text-sm">
                            Search products...
                          </span>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className="bg-white rounded-xl p-4 shadow-sm"
                          >
                            <div className="w-full h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-2"></div>
                            <div className="text-xs text-gray-600">
                              Category {item}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Featured Products */}
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Featured Products
                        </h3>
                        <div className="space-y-2">
                          {[1, 2].map((item) => (
                            <div
                              key={item}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg"></div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-800">
                                  Product {item}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ₹999 • 50 coins cashback
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements around Phone */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
