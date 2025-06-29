import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateSignin = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", {
        email,
        password,
        name,
      });

      if (response.data.success) {
        navigate("/email-verify", {
          state: {
            email: response.data.email,
            name: response.data.name,
          },
        });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a0139] via-[#300560] to-[#3c0389]">
      <form
        onSubmit={handleSubmit}
        className="backdrop-md bg-white/10 shadow-lg border border-white/20 rounded-xl px-8 py-10 w-[22rem] md:w-96 text-white transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/20"
      >
        <h1 className="text-center text-3xl font-semibold mb-6">Sign Up</h1>

        <div className="flex flex-col mb-5">
          <label htmlFor="name" className="mb-2 text-md">
            Name
          </label>
          <input
            className="p-3 bg-white/20 outline-none rounded-md text-sm border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="mb-2 text-md">
            Email
          </label>
          <input
            className="p-3 bg-white/20 outline-none rounded-md border text-sm border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="password" className="mb-2 text-md">
            Password
          </label>
          <input
            className="p-3 bg-white/20 outline-none rounded-md border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md hover:from-pink-500 hover:to-purple-500 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-300">
          Already have an account?{" "}
          <span
            className="text-purple-400 hover:text-white underline cursor-pointer"
            onClick={navigateSignin}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
