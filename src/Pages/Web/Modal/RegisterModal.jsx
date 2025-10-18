import React from 'react'

const RegisterModal = ({ form, handleChange, loading }) => {
  return (
    <>
        <div>
        <label className="block text-gray-600 text-sm mb-1">
            Full Name
        </label>
        <input
            type="text"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border rounded-lg px-3 py-2"
            required
        />
        </div>
        <div>
        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border rounded-lg px-3 py-2"
            required
        />
        </div>
        <div>
        <label className="block text-gray-600 text-sm mb-1">
            Phone Number
        </label>
        <input
            type="tel"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border rounded-lg px-3 py-2"
            required
        />
        </div>
        <div>
        <label className="block text-gray-600 text-sm mb-1">
            Password
        </label>
        <input
            type="password"
            name="password"
            value={form.password || ""}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full border rounded-lg px-3 py-2"
            required
        />
        </div>
        <p className="text-sm text-gray-500">
        By clicking the ‘Sign up’ button, you agree to our{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
            Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
            Privacy Policy
        </span>
        </p>
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        disabled={loading}
        >
        {loading ? "Loading..." : "Sign Up"}
        </button>
    </>
  )
}

export default RegisterModal