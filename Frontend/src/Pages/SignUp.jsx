import React, { useState, useContext } from "react";
import axios from "axios";
import authBg from "../assets/authBg.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl,userData, setuserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("")
  const [loading, setloading] = useState(false)
  

  const handleSignUp = async (e) => {
    e.preventDefault();
    seterror("")
    setloading(true)
    try {
      setloading(false)
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setuserData(result.data)
      navigate("/signin")
    } catch (error) {
      setuserData(null)
      setloading(false)
      console.log(error);
      seterror(error.response.data.message)
    }
  };

  return (
  <div
    className="w-full min-h-screen bg-cover flex justify-center items-center px-4"
    style={{ backgroundImage: `url(${authBg})` }}
  >
    <form
      className="w-full max-w-[500px] lg:h-[580px] h-[440px] bg-[#0000004e] backdrop-blur shadow-lg shadow-blue-950 flex flex-col items-center justify-center lg:gap-5 gap-3 p-6"
      onSubmit={handleSignUp}
    >
      <h1 className="text-white text-2xl md:text-3xl font-semibold lg:mb-6 text-center mb-3">
        <span className="text-blue-400">Register to </span>Virtual Assistant
      </h1>

      <input
        type="text"
        placeholder="Enter your name"
        className="w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-4 rounded-full text-base md:text-lg"
        required
        onChange={(e) => setname(e.target.value)}
        value={name}
      />

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-4 rounded-full text-base md:text-lg"
        required
        onChange={(e) => setemail(e.target.value)}
        value={email}
      />

      <div className="w-full h-[50px] border-2 border-white bg-transparent text-white rounded-full relative text-base md:text-lg">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-4"
          required
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        {showPassword ? (
          <FaEyeSlash
            className="absolute top-3.5 right-5 w-6 h-6 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEye
            className="absolute top-3.5 right-5 w-6 h-6 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>

      {error.length > 0 && (
        <p className="text-red-400 text-sm md:text-base mt-2">*{error}</p>
      )}

      <button
        className="w-full lg:max-w-[200px] lg:h-[45px] max-w-[150px] h-[40px] bg-white rounded-full text-blue-600 font-semibold text-base md:text-lg mt-4 hover:text-blue-800 transition cursor-pointer"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>

      <p
        className="text-white text-sm md:text-base lg:mt-3 mt-1 text-center"
        onClick={() => navigate("/signin")}
      >
        Already have an account?{" "}
        <span className="text-blue-400 font-semibold hover:text-blue-500 cursor-pointer">
          Sign In
        </span>
      </p>
    </form>
  </div>
);

};

export default SignUp;
