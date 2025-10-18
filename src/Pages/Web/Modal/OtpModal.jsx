const OtpModal = ({form, handleChange, loading}) => {
  return (
    <>
    <div className="space-y-4">       
    {/* <input type="hidden" name="email" value={form.email || ""} readOnly /> */}
      <input
        type="text"
        name="otp"
        value={form.otp || ""}
        onChange={handleChange}
        placeholder="Enter OTP"
        className="w-full border rounded-lg px-3 py-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
    </>
  );
};

export default OtpModal;
