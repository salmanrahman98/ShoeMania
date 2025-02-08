import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import formatDistance from "date-fns/formatDistance";
import AdminNavi from "./AdminNavi";
import {  toast } from "react-toastify";
import { motion } from "framer-motion";

const Orderhistory = () => {
  const updates = useSelector((state) => state?.UpdatesReduser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState("");
  useEffect(() => {
    loadAllUsers();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    setTimeout(() => {
      dispatch({ type: "CLEAR_UPDATES" });
    }, 1000);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [updates]);
  function conDate(dateNo) {
    const dateStr = dateNo;
    const str = formatDistance(new Date(dateStr), new Date());
    return <h3>{str} ago.</h3>;
  }

  function loadAllUsers() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/users/listAllUsers",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function block(user) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: user._id,
    });

    var config = {
      method: "patch",
      url: "http://localhost:4000/users/blockUser",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch({ type: "REMOVE", payload: response.data });
        if (response.data === "user unblocked") {
          return toast.success(user.name + " " + response.data);
        } else if (response.data === "user blocked") {
          return toast.warn(user.name + " " + response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.2}}
    exit={{opacity:0}}
    className="body"
    >
    <div>
      <AdminNavi />
      <div className="titles margin-top-10 mb-2">User list</div>
      <Col lg="1">
      <div className="d-flex mb-3">
        <input
          className="form-control"
          style={{ minWidth: "300px" }}
          type="text"
          placeholder="Search name..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
        </Col>
      <Col lg="14">
        <Card className="bgcard w-100 p-3 m-0">
          <Card.Body className="d-flex align-items-center font-weight-bold w-100 p-0 m-0">
            <Col lg="2">
              <Card.Text>Name</Card.Text>
            </Col>
            <Col lg="3">
              <Card.Text>Email:</Card.Text>
            </Col>
            <Col lg="5">
              <Card.Text>ID: </Card.Text>
            </Col>
            <Col lg="2" className="text-center">
              <Card.Text>Actions</Card.Text>
            </Col>
          </Card.Body>
        </Card>
      </Col>
      {users.length > 0 &&
        users
          .filter((user) => {
            if (search == "") {
              return user;
            } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
              return user;
            }
          })
          .map((user) => (    
              <Row>
                <Col lg="12">
                <motion.div layout>
                  <Card className="bgcard w-100 p-3 m-0" style={{minWidth: "900px"}}>
                    <Card.Body className="d-flex align-items-center p-0 m-0">
                      <Col lg="2">
                        <Card.Text>{user.name}</Card.Text>
                      </Col>
                      <Col lg="3">
                        <Card.Text>{user.email}</Card.Text>
                      </Col>
                      <Col lg="5">
                        <Card.Text>{user._id}</Card.Text>
                      </Col>
                      <Col lg="2">
                        {user.blockstatus ? (
                          <Button variant="success" onClick={() => block(user)}>
                            Unblock
                          </Button>
                        ) : (
                          <Button variant="danger" onClick={() => block(user)}>
                            Block
                          </Button>
                        )}
                      </Col>
                    </Card.Body>
                  </Card>
                </motion.div>
                </Col>
              </Row>
          ))}
    </div>
    </motion.div>
  );
};

export default Orderhistory;
