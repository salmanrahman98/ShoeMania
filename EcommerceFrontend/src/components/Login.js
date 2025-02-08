import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import  "./Login.css";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserLogin({ ...userLogin, [name]: value });
  };
  const handleSubmit = (event) => {
    const newRecord = { ...userLogin };
  };

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const PostData = async (event) => {
    event.preventDefault();
    const { email, password } = userLogin;

    if (email === "") {
      return toast.error("Please enter email");
    }
    if (!isValidEmail(email)) {
      return toast.error("Email is invalid");
    }
    if (password === "") {
      return toast.error("Please enter password");
    }
    if (password.length < 6) {
      return toast.error("Minimum length of password is 6 or above");
    }

    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token =  data.result[0]._id;
        debugger
        localStorage.setItem("token", token);
        navigate("/allProducts");
        toast("Login successful!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.result);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="loginbody">
        <form
          method="post"
          className="Auth-form bodyCon"
          onSubmit={handleSubmit}
        >
          <div className="logo">
            <p className="title">ShoeMania❞</p>
            <h1>Login</h1>
          </div>
          <div>
            <input
              type="text"
              className="form-control mt-1 mb-3"
              onChange={handleInput}
              value={userLogin.email}
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="on"
            ></input>
          </div>
          <div>
            <input
              type={passwordType}
              className="form-control mt-1 mb-3"
              onChange={handleInput}
              value={userLogin.password}
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="on"
            ></input>
          </div>
          <div className="btn btn-outline-primary" onClick={togglePassword}>
            {passwordType === "password" ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
          <div className="text-center">
            <Button className="wd-100 mt-3" onClick={PostData}>
              Login
            </Button>
          </div>
        </form>
        <div className="create d-flex flex-column justify-content-center">
          <p className="create ">
            Don't have an account?<Link to="/register"> Create one!</Link>
          </p>
          <p className="create justify-content-center">
            <Link to="/adminlogin"> Admin login?</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
