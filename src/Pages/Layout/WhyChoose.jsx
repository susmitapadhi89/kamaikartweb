import { FaShieldAlt, FaExchangeAlt, FaCheckCircle } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, MotionConfig } from "framer-motion";

export default function WhyChoose() {
  const features = [
    {
      icon: <FaCheckCircle className="text-4xl text-blue-600" />,
      title: "Generated Case Back",
      desc: "Our platform ensures fast and reliable case generation, keeping your data secure and easily accessible at any time.",
    },
    {
      icon: <FaExchangeAlt className="text-4xl text-blue-600" />,
      title: "Token Trading",
      desc: "Trade tokens seamlessly with our efficient and transparent marketplace designed for all types of users.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Secure & Trusted",
      desc: "We prioritize your security with advanced encryption and trusted protocols, ensuring safe transactions.",
    },
  ];

  return (
    <section className="py-16 px-6 from-blue-50 via-white bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kamaikart?
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {features.map((feature, i) => (
          <MotionConfig>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-8 rounded-2xl shadow-lg bg-white
                      hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300
                      border border-gray-100 hover:border-blue-500"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-gray-600 text-center">{feature.desc}</p>
            </motion.div>
          </MotionConfig>
        ))}
      </div>
    </section>
  );
}
