import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { toast } from "react-toastify";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Navi from "./Navi";
import AdminNavi from "./Admin/AdminNavi";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const location = useLocation();
  const { admin } = location.state || false;
  const [userRegistration, setUserRegistration] = useState({
    password: "",
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const handleSubmit = (event) => {
    const newRecord = { ...userRegistration };
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const usertoken = localStorage.getItem("token");

  const PostData = async (event) => {
    event.preventDefault();
    const { password, confirmPassword } =
      userRegistration;

    if (password === "") {
      return toast.error("Please enter password!");
    }
    if (password.length < 6) {
      return toast.error("Minimum length of password is 6 or above!");
    }
    if (confirmPassword === "") {
      return toast.error("Please confirm your password!");
    }
    if (confirmPassword !== password) {
      return toast.error("Passwords do not match");
    }

    var axios = require('axios');
    var data = JSON.stringify({
      password: password
    });

    var config = {
      method: 'patch',
      url: 'http://localhost:4000/users/profile/passwordupdate',
      headers: {
        'Authorization': 'Bearer ' + usertoken,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        toast(response.data);
        navigate("/profile")
      })
      .catch(function (error) {
        toast.warn(error.response.data);
        console.log(error);
      });

  };
  return (
    <motion.div
      className="body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="loginpage align-content-center justify-content-center d-flex">
        {
          admin ? <AdminNavi /> : <Navi />
        }
        <form method="post" className="Auth-form bodyCon" onSubmit={handleSubmit}>
          <div className="logo">
            <h1>Change password</h1>
          </div>
          <div>
            <input
              type={passwordType}
              className="form-control mt-1 mb-3"
              onChange={handleInput}
              value={userRegistration.password}
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
            ></input>
          </div>
          <div>
            <input
              type={passwordType}
              className="form-control mt-1 mb-3"
              onChange={handleInput}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
            ></input>
          </div>
          <div className="btn btn-outline-primary" onClick={togglePassword}>
            {passwordType === "password" ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
          <div className="text-center">
            <Button className="button" onClick={PostData}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;