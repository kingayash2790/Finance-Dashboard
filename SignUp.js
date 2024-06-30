import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    otp: "",
    showOtpInput: false,
    password: "",
    showPasswordInput: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendOTP = (e) => {
    e.preventDefault();
    const { email } = user;
    if (email) {
      axios
        .post("http://localhost:9002/sendOTP", { email })
        .then((res) => {
          alert("OTP sent successfully."); // You can remove this alert in production
          setUser({
            ...user,
            showOtpInput: true,
          });
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          alert("Error sending OTP. Please try again later.");
        });
    } else {
      alert("Please enter your email.");
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const { email, otp } = user;
    if (otp) {
      axios
        .post("http://localhost:9002/verifyOTP", { email, otp })
        .then((res) => {
          if (res.data === "OTP verified successfully") {
            alert("OTP verified successfully.");
            setUser({
              ...user,
              showOtpInput: false,
              showPasswordInput: true,
            });
          } else {
            alert("Invalid OTP. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
          alert("Error verifying OTP. Please try again later.");
        });
    } else {
      alert("Please enter the OTP.");
    }
  };

  const register = (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      if (email && password) {
        axios
          .post("http://localhost:9002/register", user)
          .then((res) => {
            alert(res.data.message);
            setUser({
              email: "",
              otp: "",
              showOtpInput: false,
              password: "",
              showPasswordInput: false,
            });
            navigate("/login"); // Navigate to Login on successful registration
          })
          .catch((error) => {
            console.error("Error registering user:", error);
            alert("Error registering user. Please try again later.");
          });
      } else {
        alert("Invalid details");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user. Please try again later.");
    }
  };


  return (
    <div style={{ backgroundColor: "#01033E" }} className="lg:min-h-screen h-[115vh] flex items-center justify-center">
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          border: "2px solid white",
          boxShadow: "0 0 15px 3px white",
        }}
        className="mt-5 p-10 pt-0 rounded-lg w-full w-[300px] lg:w-[40vw]"
      >
        <div className="text-center ">
          <h1 className="text-4xl mb-5 mt-10 font-bold text-white">
            Finance Monitor
          </h1>
        </div>
        <div className="text-center mb-3 lg:mb-2">
          <p className="mb-5 text-xs lg:text-xl mt-5 text-white">
            Finance Monitor is a platform that monitors one's finances.
          </p>
        </div>
        
        <form>
          <input
            className="p-1 w-full placeholder-black-500 bg-transparent text-black mt-5 lg:p-3 px-4 py-2 border-white-300 border rounded mb-5"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <button
            onClick={sendOTP}
            className="text-sm font-bold rounded text-white lg:ml-[250px] ml-[70px] bg-[#01033E] p-3 mb-7 hover:bg-[#01033E] hover:border-2 
            hover:border-solid hover:border-white"
            type="submit"
          >
            Send OTP
          </button>
          {user.showOtpInput && (
            <div>
              <input
                className="text-white bg-transparent mb-5 rounded p-1 w-full lg:w-auto"
                type="text"
                name="otp"
                value={user.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                required
              />
              <button className="text-white bg-[#01033E] p-1 rounded mt-2 lg:ml-3  
              hover:bg-[#01033E] hover:border-2 hover:border-solid hover:border-white" onClick={verifyOTP}>
                Verify OTP
              </button>
            </div>
          )}

          {user.showPasswordInput && (
            <div>
              <input
                className="p-1 w-full bg-transparent text-white lg:w-auto lg:p-3 border-white-250 border rounded mb-5"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="submit"
                onClick={register}
                className="p-2 bg-[#01033E] text-white rounded w-full lg:w-auto hover:bg-purple-800 text-sm lg:text-xl mt-2 lg:mt-0"
              >
                Sign Up
              </button>
            </div>
          )}

          <button
            type="submit"
            onClick={register}
            className="p-2 mb-2 lg:mb-7 lg:h-15 lg:p-3 w-full bg-[#01033E] text-white rounded hover:bg-purple-800 lg:text-2xl text-bold
             hover:bg-[#01033E] hover:border-2 hover:border-solid hover:border-white"
          >
            Continue with email
          </button>
        </form>
        <h4 className="text-xs lg:text-xl font-bold text-white text-center mt-4">
          Already have an account?{" "}
          <a className="text-white" href="/login">
            Sign In
          </a>
        </h4>
        <div className="text-sm mt-2 p-1 text-white lg:w-3/4 lg:pt-5 mx-auto text-center">
          <h3 className="text-white">
            By signing up, you agree to our{" "}
            <span className="text-white font-bold underline">
              Terms of Services
            </span>{" "}
            &{" "}
            <span className="text-white font-bold underline">
              Privacy Policy
            </span>{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
