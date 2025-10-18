import Header from "../Layout/Header";
import { FaCoins, FaChartLine, FaUsers, FaWallet, FaFilter, FaSearch } from "react-icons/fa";
import Footer from "../Layout/Footer";

export const TokenMarket = () => {
   const stats = [
    { title: "Total Market Cap", value: "₹33.7L", change: "+12.5% from yesterday" },
    { title: "24h Volume", value: "₹6.85L", change: "+5.2% from yesterday" },
    { title: "Active Traders", value: "1,245", change: "+8% this week" },
    { title: "Total Tokens", value: "127", change: "+3 this month" },
  ];

  const tokens = [
    {
      symbol: "TST",
      name: "Tech Store Token",
      store: "Tech Store",
      desc: "Leading electronics retailer with 5+ years experience",
      price: "₹125.50",
      change: "+12.5%",
      vol: "₹2,45,000",
      cap: "₹12.5L",
      holders: 150,
    },
    {
      symbol: "FHT",
      name: "Fashion Hub Token",
      store: "Fashion Hub",
      desc: "Premium fashion retailer with exclusive collections",
      price: "₹89.25",
      change: "-3.2%",
      vol: "₹1,89,000",
      cap: "₹8.9L",
      holders: 89,
    },
    {
      symbol: "GWT",
      name: "Gadget World Token",
      store: "Gadget World",
      desc: "Innovative gadgets and accessories specialist",
      price: "₹78.75",
      change: "+8.9%",
      vol: "₹1,56,000",
      cap: "₹7.8L",
      holders: 234,
    },
    {
      symbol: "HDT",
      name: "Home Decor Token",
      store: "Home Decor Plus",
      desc: "Beautiful home decor and furniture solutions",
      price: "₹45.60",
      change: "+15.3%",
      vol: "₹95,000",
      cap: "₹4.5L",
      holders: 67,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen web">
      {/* ✅ Header */}
     <Header />
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Token Market</h2>
          <p className="text-gray-600 mt-2">
            Trade seller tokens and earn from market movements
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Launch Your Token
          </button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition text-center"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-2xl font-bold mt-2">{s.value}</p>
              <span className="text-sm text-green-600">{s.change}</span>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Market
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-lg">
              My Portfolio
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-lg">
              Recent Trades
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* Token List */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tokens.map((t, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.symbol} • {t.store}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    t.change.startsWith("+") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.change}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold">{t.price}</span>
                <div className="text-sm text-gray-600">
                  <p>Vol: {t.vol}</p>
                  <p>Cap: {t.cap}</p>
                  <p>{t.holders} holders</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Buy
                </button>
                <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">
            How Token Trading Works on Kamai Kart
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <FaCoins className="text-4xl text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">1. Sellers Launch Tokens</h4>
              <p className="text-sm text-gray-600">
                Sellers create tokens representing their business with minimum pricing.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <FaChartLine className="text-4xl text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">2. Value Based on Performance</h4>
              <p className="text-sm text-gray-600">
                Token prices fluctuate based on seller's business performance and demand/supply.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <FaWallet className="text-4xl text-yellow-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">3. Trade for Profit</h4>
              <p className="text-sm text-gray-600">
                Buy low, sell high and earn from market movements and seller success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  );
};
