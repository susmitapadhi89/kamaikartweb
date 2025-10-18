import React, { useState } from "react" 
import { toast } from "react-hot-toast";
import Layout from "../Layout/Layout";
import NewSupportTicketModal from "./Modal/NewSupportTicketModal";

export default function SupportTicket() {
    const [isOpen, setIsOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
 
    const [activeTab, setActiveTab] = useState("Running");

   const [showModal, setShowModal] = useState(false);

   

     const handleSubmit = (e) => {
    e.preventDefault();
      
    toast.success("Ticket created successfully");
    setShowModal(false);
    setForm({
      orderNumber: "",
      issueType: "",
      subject: "",
      message: "",
      email: "",
      phone: "",
      file: null,
    });
  };

    return (

        <Layout>

            <div className=" ml-4 pl-64 p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Support Ticket</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
                    >
                        + Create Ticket
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b mb-4">
                    {["Running", "Completed", "Cancel"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 -mb-px font-medium ${activeTab === tab
                                ? "text-pink-600 border-b-2 border-pink-600"
                                : "text-gray-500"
                                }`}
                        >
                            {tab} (
                            {tickets.filter((t) =>
                                tab === "Running"
                                    ? t.status === "Pending"
                                    : tab === "Completed"
                                        ? t.status === "Resolved"
                                        : t.status === "Cancelled"
                            ).length}
                            )
                        </button>
                    ))}
                </div>

                {/* Ticket List */}
                <div className="space-y-4">
                    {tickets
                        .filter((t) =>
                            activeTab === "Running"
                                ? t.status === "Pending"
                                : activeTab === "Completed"
                                    ? t.status === "Resolved"
                                    : t.status === "Cancelled"
                        )
                        .map((ticket) => (
                            <div
                                key={ticket.id}
                                className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-sm text-gray-500">{ticket.date}</p>
                                    <p className="text-gray-700 font-medium">
                                        Order Number: {ticket.orderNumber || "N/A"}
                                    </p>
                                    <p className="text-gray-700">
                                        Issue Type: {ticket.issueType || "N/A"}
                                    </p>
                                    <p className="text-gray-700">Subject: {ticket.subject}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-blue-600">#{ticket.id}</span>
                                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Create Ticket Modal */}
               {showModal && (
                <NewSupportTicketModal
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                />
            )}
            </div>
        </Layout>

    );
}
