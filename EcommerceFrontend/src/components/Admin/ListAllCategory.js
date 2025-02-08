import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import formatDistance from "date-fns/formatDistance";
import AdminNavi from "./AdminNavi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";

const ListAllCategory = () => {
  const updates = useSelector((state) => state?.UpdatesReduser);
  const dispatch = useDispatch();

  useEffect(() => {
    loadCategory();
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
  const [category, setCategory] = useState([]);
  const [delBtn, setdelBtn] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function conDate(dateNo) {
    const dateStr = dateNo;
    const str = formatDistance(new Date(dateStr), new Date());
    return <h6>{str} ago.</h6>;
  }
  const loadCategory = async () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/category/list",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let allProducts = response.data;
        setCategory(allProducts);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function setChange() {
    if (delBtn === 0) {
      setdelBtn(1);
    } else {
      setdelBtn(0);
    }
  }
  function deleteCategory(product) {
    var axios = require('axios');
    var data = JSON.stringify({
      id: product._id
    });
    
    var config = {
      method: 'delete',
      url: 'http://localhost:4000/category/delete',
      headers: { 
        'Authorization': 'Bearer '+ token, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch({ type: "REMOVE", payload: response.data });
      toast.error(product.name + " deleted!")

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
    >
    <div className="body">
        <AdminNavi/>
          <p className="titles margin-top-10">All Category</p>
          <Col lg="0">
      <div className="d-flex">
        <input
          className="form-control"
          style={{ minWidth: "300px" }}
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

      <Button className="mb-3 ml-3 mr-5" variant="danger" onClick={setChange}>
        {" "}
        <RiDeleteBin6Line />
      </Button>
      </div>
        </Col>
      <Row>
        {category.length > 0 &&
          category.filter((product) => {
            if (search == "") {
              return product;
            } else if (
              product.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return product;
            }
          }).map((product) => (
            <Col lg="3">
                  <motion.div layout>
              <div
                style={{ marginBottom: "20px", margin: "20px" }}
                className="catBox mb-3 ml-3 mr-3"
              >
                <Card  className="wd-100 flexRow"
                    style={{ minWidth: "300px" }}>
                  <Card.Body>
                    <Card.Img
                      className="card-img-top"
                      variant="top"
                      src={product.img}
                    />
                    <Card.Text
                      style={{ textTransform: "uppercase" }}
                      className="text"
                    >
                     ID:{product._id}
                    </Card.Text> 
                    <Card.Text
                      style={{ textTransform: "uppercase" }}
                      className="text category"
                    >
                      {product.name}
                    </Card.Text>  
                    <Card.Text
                      style={{ textTransform: "uppercase" }}
                      className="text"
                    >
                      {conDate(product.createdAt)}
                    </Card.Text>
                    {delBtn ? (
                        <Button variant="danger" 
                        onClick={() => deleteCategory(product)}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      ) : null}
                  </Card.Body>
                </Card>
              </div>
              </motion.div>
            </Col>
          ))}
      </Row>
    </div>
    </motion.div>
  );
};

export default ListAllCategory