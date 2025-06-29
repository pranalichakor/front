import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(
        !email && !password
          ? "Please fill in all fields."
          : !email
          ? "Please fill in the email."
          : "Please fill in the password."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/signin", {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        navigate("/welcome", {
          state: {
            email: response.data.email,
            name: response.data.name,
            token: response.data.token,
          },
        });
      } else {
        if (!response.data.active) {
          navigate("/email-verify", {
            state: {
              email: response.data.email,
              name: response.data.name,
            },
          });
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  const navForgotPass = () => {
    navigate("/reset-verify", {
      state: {
        isReset: true,
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a0139] via-[#300560] to-[#3c0389]">
      {/* Glassmorphism Card */}
      <form
        onSubmit={handleSubmit}
        className="backdrop-md bg-white/10 shadow-lg border border-white/20 rounded-xl px-8 py-10 w-[22rem] md:w-96 text-white transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/20"
      >
        <h1 className="text-center text-3xl font-semibold mb-6">Sign in</h1>

        {/* Email Input */}
        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="mb-2 text-md">
            Email
          </label>
          <input
            className="p-3 bg-transparent outline-none rounded-md border border-white/30 focus:border-white focus:ring focus:ring-white/30 placeholder-gray-400"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-2 text-md">
            Password
          </label>
          <input
            className="p-3 bg-transparent outline-none rounded-md border border-white/30 focus:border-white focus:ring focus:ring-white/30 placeholder-gray-400"
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between text-sm mb-6">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <p
            className="text-blue-300 hover:text-white cursor-pointer"
            onClick={navForgotPass}
          >
            Forgot Password?
          </p>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md hover:from-pink-500 hover:to-purple-500 transition"
        >
          Sign in
        </button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <span
            className="text-blue-300 hover:text-white underline cursor-pointer"
            onClick={navigateSignup}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
