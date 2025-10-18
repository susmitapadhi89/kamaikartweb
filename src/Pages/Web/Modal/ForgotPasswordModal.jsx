const ForgotPasswordModal = ({form, handleChange, loading}) => {
  return (
    <>
      <p className="text-gray-600 mb-2">
        Enter your valid email or phone to reset your password
      </p>
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="text"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          placeholder="Enter Email Address"
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </>
  )
}

export default ForgotPasswordModal