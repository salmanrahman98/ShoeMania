import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import styles from "./Profile.css";
import Navi from "./Navi";
import { BiHistory } from "react-icons/bi";
import { BsFillPersonXFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import {
  MdAccountCircle,
  MdAlternateEmail,
  MdOutlinePersonAddAlt1,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  let userData;

  useEffect(() => {
    loadProfiles();
  }, []);

  const usertoken = localStorage.getItem("token");

  const loadProfiles = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/users/profile",
      headers: {
        Authorization: "Bearer " + usertoken,
      },
    };

    axios(config)
      .then(function (response) {
        userData = response.data.result;
        setProfile(userData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const dispatch = useDispatch();
  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "CLEAR_CART", payload: "claer" });
    navigate("/login");
  }
  function update() {
    navigate("/updateprofile");
  }
  function orderHistory() {
    navigate("/orderhistory");
  }

    return (
      <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:0.2}}
      exit={{opacity:0}}
      >
      <div className="loginpage align-content-center justify-content-center d-flex">
        <Navi />
        <div className="d-flex margin-top-10">
          <Card
            style={{ width: "18rem" }}
            className="align-content-center justify-content-center"
          >
            <Card.Img
              className="profile-img"
              variant="top"
              src={require("../assets/profileimg.png")}
            />
            <div className="align-content-center justify-content-center">
              <Card.Body className="align-content-center justify-content-center">
                <Card.Title>
                  <MdAccountCircle /> Profile
                </Card.Title>

                <Card.Text style={{ textTransform: "uppercase" ,border:" 1px ", boxShadow: "5px 10px #8888" }}>
                  {" "}
                  <MdOutlinePersonAddAlt1 /> {profile.name}
                </Card.Text>
                <Card.Text style={{ border:" 1px ", boxShadow: "5px 10px #8888" }}>
                  {" "}
                  <MdAlternateEmail /> {profile.email}
                </Card.Text>
                <Card.Text
                  className="mb-3 change"
                  variant="primary"
                  onClick={update}
                >
                  <BiPencil /> Change password
                </Card.Text>
                <div className="titlesCart">
                  <Button className="mb-3" onClick={orderHistory}>
                    <BiHistory /> Order history
                  </Button>{" "}
                  <Button variant="primary" onClick={logout}>
                    <BsFillPersonXFill /> Logout
                  </Button>
                </div>
              </Card.Body>
            </div>
          </Card>
        </div>
      </div>
      </motion.div>
    );
  }

export default Profile;
