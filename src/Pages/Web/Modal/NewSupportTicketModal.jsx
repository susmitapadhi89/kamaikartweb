import React, { useState } from "react";

const NewSupportTicketModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    orderNumber: "",
    issueType: "",
    subject: "",
    message: "",
    email: "",
    phone: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[700px] p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">New Support Ticket</h2>

         <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Order Number"
                  value={form.orderNumber}
                  onChange={(e) =>
                    setForm({ ...form, orderNumber: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
                <select
                  required
                  value={form.issueType}
                  onChange={(e) =>
                    setForm({ ...form, issueType: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                >
                  <option value="">Select Issue Type *</option>
                  <option>Product responsive issue</option>
                  <option>Delivery delay</option>
                  <option>Payment issue</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                className="border rounded-md px-3 py-2 w-full"
              />

              <textarea
                required
                placeholder="Message *"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="border rounded-md px-3 py-2 w-full"
              />

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  File Attachment (jpg, jpeg, png, pdf)
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setForm({ ...form, file: e.target.files[0] })
                  }
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md w-full"
              >
                Create Ticket
              </button>
            </form>

        {/* Multiple errors summary */}
        {submitError && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded flex justify-between items-center">
            <span>{submitError}</span>
            <button
              onClick={() => setSubmitError("")}
              className="text-red-500 font-bold"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewSupportTicketModal;
