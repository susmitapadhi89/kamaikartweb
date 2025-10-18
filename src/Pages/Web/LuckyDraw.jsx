import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";

import Footer from "../Layout/Footer";
import { FaUsers, FaClock, FaGift, FaRegCheckCircle } from "react-icons/fa";
import { useState } from "react";

export const LuckyDraw = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("participate");
  return (
    <div className="flex flex-col min-h-screen web">
      {/* ✅ Header */}
     <Header />


    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">₹1 Lakh Lucky Draw</h1>
          <p className="text-gray-600 mt-2">
            Annual lucky draw with guaranteed prizes for active users
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-6 mb-10">
          <div className="p-6 bg-white shadow rounded-lg text-center">
            <FaClock className="text-3xl text-blue-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">45 days</h3>
            <p className="text-sm text-gray-600">Time Left</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg text-center">
            <FaUsers className="text-3xl text-green-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">3,456</h3>
            <p className="text-sm text-gray-600">Participants</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg text-center">
            <FaGift className="text-3xl text-pink-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">₹1,00,000</h3>
            <p className="text-sm text-gray-600">Grand Prize</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg text-center">
            <FaRegCheckCircle className="text-3xl text-yellow-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">3456 / 10,000</h3>
            <p className="text-sm text-gray-600">Participants Joined</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-8">
          {["participate", "entries", "winners", "rules"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg font-medium ${
                tab === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t === "participate"
                ? "Participate"
                : t === "entries"
                ? "My Entries"
                : t === "winners"
                ? "Past Winners"
                : "Rules"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "participate" && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Option 1: Payment */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Option 1: Payment</h3>
              <p className="mb-4">One-time payment to participate</p>
              <p className="text-lg font-semibold mb-2">₹99</p>
              <p className="text-sm text-gray-600 mb-4">
                50% refund over 24 months
              </p>
              <div className="text-sm text-gray-700 mb-4">
                <p>• Year 1: ₹24.75 (6 months after payment)</p>
                <p>• Year 2: ₹24.75 (18 months after payment)</p>
                <p className="font-medium">Total Refund: ₹49.50 (50% of ₹99)</p>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Pay ₹99 to Enter
              </button>
            </div>

            {/* Option 2: Referrals */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Option 2: Referrals</h3>
              <p className="mb-4">Get 5 successful app installs</p>
              <p className="text-lg font-semibold mb-2">5 Referrals</p>
              <p className="text-sm text-gray-600 mb-4">
                No payment required
              </p>
              <div className="mb-4">
                <p className="text-sm font-medium">Referral Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div className="bg-green-500 h-3 rounded-full w-[40%]"></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  2 / 5 successful referrals (3 more needed)
                </p>
              </div>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Invite Friends
              </button>
            </div>
          </div>
        )}

        {tab === "entries" && (
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">My Entries</h3>
            <p>You have <span className="font-bold">2</span> active entries</p>
          </div>
        )}

        {tab === "winners" && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Past Winners</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>2023 - Ramesh Kumar (Delhi) - ₹1,00,000</li>
              <li>2022 - Priya Sharma (Mumbai) - ₹1,00,000</li>
            </ul>
          </div>
        )}

        {tab === "rules" && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Rules</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>Account age must be at least 6 months</li>
              <li>User must be an active buyer/seller</li>
              <li>Each user can participate max 3 times</li>
              <li>Refunds will be processed as per schedule</li>
            </ul>
          </div>
        )}

        {/* Eligibility */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Eligibility Status</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="p-4 border rounded-lg">
              <p>Account Age (min 6 months)</p>
              <p className="text-green-600 font-bold">Eligible</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p>Active Buyer/Seller Status</p>
              <p className="text-green-600 font-bold">Active</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p>Previous Participation</p>
              <p className="text-gray-700 font-bold">2 times</p>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};
