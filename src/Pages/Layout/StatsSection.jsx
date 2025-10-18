import { FaUsers, FaBoxOpen, FaCoins, FaGift,FaShieldAlt  } from "react-icons/fa";

export default function StatsSection() {
const stats = [
  {
    icon: <FaUsers className="text-4xl text-blue-600" />,
    title: "Active Users",
    value: "1M+",
  },
  {
    icon: <FaBoxOpen className="text-4xl text-green-600" />,
    title: "Products Listed",
    value: "500+",
  },
  {
    icon: <FaCoins className="text-4xl text-yellow-600" />,
    title: "Tokens Launched",
    value: "₹2Cr+",
  },
  {
    icon: <FaGift className="text-4xl text-pink-600" />,
    title: "Total Cashback",
    value: "₹2Cr+",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-purple-600" />,
    title: "Secure & Trusted",
    value: "100%",
  },
];

  return (
    <section className="px-6 py-16 from-blue-50 via-white bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl 
                      hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 
                      border border-gray-100 hover:border-blue-500"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full 
                            bg-blue-100 text-blue-600 text-3xl shadow-sm">
              {stat.icon}
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-gray-900">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-2 text-center font-medium">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
