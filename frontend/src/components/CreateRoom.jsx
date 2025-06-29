import React, { useState } from "react";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const newRoomId = nanoid(8);
    toast.success("Created New Room!");
    setRoomId(newRoomId);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !userName) {
      toast.error("Enter both Username and Room ID");
      return;
    }

    navigate(`/editor/${roomId}`, { state: { userName, roomId } });
  };

  const handleEnterInput = (e) => {
    if (e.key === "Enter") {
      joinRoom(e);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-300 to-black h-screen flex justify-center items-center">
      <div className="bg-black shadow-2xl rounded-xl p-8 w-full max-w-md text-center transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-fuchsia-500 mb-6 animate-bounce">
          Join or Create a Room
        </h2>

        <input
  type="text"
  placeholder="Enter Username"
  className="w-full p-3 mb-4 rounded-lg border border-blue-100 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none text-black bg-white"
  value={userName}
  onChange={(e) => setUserName(e.target.value)}
  onKeyDown={handleEnterInput}
/>

<input
  type="text"
  placeholder="Enter Room ID or Generate One"
  className="w-full p-3 mb-4 rounded-lg border border-purple-700 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none text-black bg-white"
  value={roomId}
  onChange={(e) => setRoomId(e.target.value)}
  onKeyDown={handleEnterInput}
/>


        {/* Buttons for Generate Room ID & New Room in Same Row */}
        <div className="flex gap-2">
          <button
            onClick={createNewRoom}
            className="w-1/2 p-2 mb-4 bg-gradient-to-r from-green-500 to-cyan-300 text-black font-bold rounded-lg hover:from-green-300 hover:to-cyan-500"
          >
            Generate Room ID
          </button>

          <button
            onClick={() => navigate("/welcome")}
            className="w-1/2 p-2 mb-4 bg-gradient-to-r from-green-500 to-cyan-300 text-black font-bold rounded-lg hover:from-green-300 hover:to-cyan-500"
          >
            New Room
          </button>
        </div>

        <button
          onClick={joinRoom}
          className="w-full p-2 mb-4 bg-gradient-to-r from-pink-300 to-violet-900 text-black font-bold rounded-lg hover:from-pink-400 hover:to-violet-700"
        >
          Join Room
        </button>

        <button
          onClick={() => navigate("/welcome")}
          className="w-full p-2 mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-bold rounded-lg hover:from-[#FF9A8B] hover:to-[#FF6A88]"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Form;
