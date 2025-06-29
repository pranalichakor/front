import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import CreateRoom from "../components/CreateRoom.jsx"; // Ensure correct import

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState("home"); // 'home', 'create', 'join'

  const Logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (!location.state?.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-b from-[#1B1F3B] to-black text-white">
      {/* Navbar */}
      <div className="navbar bg-[#12172E] shadow-md shadow-blue-900/50 px-10">
        <div className="flex-1">
          <a className="text-4xl font-bold text-blue-400">Code Collab</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div role="button" tabIndex={0} className="avatar online placeholder">
              <div className="bg-purple-600 text-white w-14 rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold">
                  {location.state?.name?.[0] || "U"}
                </span>
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content bg-[#1B1F3B] rounded-box shadow-lg mt-3 w-52 p-2">
              <li><a className="hover:bg-blue-500 hover:text-white transition">Profile</a></li>
              <li onClick={Logout}><a className="hover:bg-red-500 hover:text-white transition">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      {view === "home" && (
        <div className="flex-1 flex flex-col items-center justify-center p-5 text-center">
          <h1 className="text-5xl font-extrabold text-blue-300 drop-shadow-lg animate-fade-in">
            Welcome to Code Collab
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mt-4 leading-relaxed animate-slide-up">
            Collaborate in real-time with your team and write code together. Code Collab is a powerful online code editor that helps developers work seamlessly across different locations.
          </p>

          <div className="mt-6 p-5 flex space-x-4">
            <button onClick={() => setView("create")} className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all animate-bounce">
              Create Room
            </button>
            <button onClick={() => setView("join")} className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all animate-bounce">
              Join Room
            </button>
          </div>
        </div>
      )}

      {/* Render Create Room Component */}
      {view === "create" && <CreateRoom />}

      {/* Placeholder for Join Room (Not Implemented Yet) */}
      {view === "join" && (
        <div className="flex-1 flex items-center justify-center text-2xl text-gray-400">
          <p>Join Room feature is coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default Welcome;
