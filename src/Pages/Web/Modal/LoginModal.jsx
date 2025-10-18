const LoginModal = ({ form, handleChange,setMode, loading }) => {
  return (
    <>
        <div>
        <label className="block text-gray-600 text-sm mb-1">
            Email / Phone Number
        </label>
        <input
            type="text"
            name="emailOrPhone"
            value={form.emailOrPhone || ""}
            onChange={handleChange}
            placeholder="Enter email or phone number"
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
        <div className='flex justify-end'>
        <button
        type="button"
        onClick={() => setMode("forgot")}
        className="text-sm text-blue-600 hover:underline"
        >
        Forgot Password?
        </button>
        </div>
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        disabled={loading}
        >
        {loading ? "Loading..." : "Log In"}
        </button>
    </>
  )
}

export default LoginModal