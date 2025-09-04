import axios from "axios";
import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([""]);

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErroMessage] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErroMessage("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErroMessage(JSON.stringify(err.response.data));
      console.log(JSON.stringify(err.response.data));
      // alert("Error while making the API call")
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
      console.log(res.data.data)
    } catch (error) {
      setErroMessage(JSON.stringify(error.response.data));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add actual login logic here
    // alert(`Logging in with Email: ${emailId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-transform hover:scale-105">
        <h2 className="text-white text-4xl font-extrabold mb-8 text-center tracking-wider drop-shadow-lg">
          {isLoginForm ? "Login" : "Signup"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {!isLoginForm && (
            <>
              <div>
                <label
                  htmlFor="emailId"
                  className="block text-gray-300 mb-3 text-lg font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-300 mb-3 text-lg font-semibold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                />
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 mb-3 text-lg font-semibold"
            >
              Email ID
            </label>
            <input
              // type="password"
              value={emailId}
              type="email"
              onChange={(e) => setEmailId(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 mb-3 text-lg font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
            />
          </div>

          <p className="text-red-500">{errorMessage}</p>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-bold text-lg shadow-lg transition transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
            onClick={isLoginForm ? handleLogin : handleSignup}
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>

          <p
            className=" text-center text-gray-400 cursor-pointer"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup here"
              : "Already have a account? Please login here"}
          </p>
        </form>
        {/* <p className="mt-8 text-center text-gray-400">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-indigo-500 hover:text-indigo-400 font-semibold transition"
            onClick={handleSignup}
          >
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}
