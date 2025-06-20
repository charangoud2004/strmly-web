import { useState } from "react";

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");

  const handleLogin = () => {
    if (userId.trim()) {
      localStorage.setItem("userId", userId);
      onLogin(userId);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white gap-4">
      <h2 className="text-2xl font-bold">Login to STRMLY</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
        className="px-4 py-2 rounded text-black"
      />
      <button
        onClick={handleLogin}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
