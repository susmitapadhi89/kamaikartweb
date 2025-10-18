const ResetPasswordModal = ({form, handleChange, loading}) => {
  return (
    <>
     <div className="space-y-4">
        <input
        type="password"
        name="password"
        value={form.password || ""}
        onChange={handleChange}
        placeholder="New Password"
        className="w-full border rounded-lg px-3 py-2"
        required
        />
        <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword || ""}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="w-full border rounded-lg px-3 py-2"
        required
        />
        <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
        {loading ? "Resetting..." : "Reset Password"}
        </button>
    </div>
    </>
  )
}

export default ResetPasswordModal