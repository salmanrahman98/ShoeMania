import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "reactstrap";
import AdminNavi from "./AdminNavi";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";

import "../Product.css"

const ListAllProduct = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updates = useSelector((state) => state?.UpdatesReduser);
  const [showUpdateItem, setShowUpdateItem] = useState(false);
  const [search, setSearch] = useState("");
  const [updateItem, setUpdateItem] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
    category: ""
  });

  useEffect(() => {
    loadProducts();
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

  const [product, setProduct] = useState([]);
  let item;

  const loadProducts = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/product/listAllProducts",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status == 420) {
          navigate("/adminlogin");
          toast.warn("Only admin access")
        }
        item = response.data.result;
        setProduct(item);
      })
      .catch(function (error) {
        if (error.response.status == 420) {
          navigate("/adminlogin");
          toast.warn("Only admin access")
        }
        console.log(error);
      });
  };
  const PostData = async (event) => {
    const { name, description, category, price, img } = updateItem;
    if (name === "") {
      return toast.warn("Name required!")
    }
    if (description === "") {
      return toast.warn("Description required!")
    }
    if (price === "") {
      return toast.warn("Price required!")
    }
    if (img === "") {
      return toast.warn("Image link required!")
    }
    var data = JSON.stringify({
      id: updateItem._id,
      name: name,
      description: description,
      price: price,
      category: category,
      img: img,
    });
    console.log(data);
    debugger
    const token = localStorage.getItem("token");
    var config = {
      method: "patch",
      url: "http://localhost:4000/product/update",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // window.location.reload(false);
        setShowUpdateItem(false);
        loadProducts();
        toast.success(name + " updated successsully")
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error);
      });

  };
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUpdateItem({ ...updateItem, [name]: value });
  };
  const handleItemEdit = (product) => {
    debugger
    setUpdateItem(product)
    setShowUpdateItem(true);
  }

  const handleSubmit = (event) => {
    const newRecord = { ...updateItem };
    console.log(newRecord);
  };

  const deleteItem = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      productId: updateItem._id,
    });

    var config = {
      method: "delete",
      url: "http://localhost:4000/product/delete",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };
    debugger
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        loadProducts();
        setShowUpdateItem(false);
        toast.error(product.name, " deleted!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="body">
        <AdminNavi />
        <p className="titles margin-top-10">All products</p>
        <Col lg="0">
          <div className="d-flex mb-3">
            <input
              className="form-control"
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Col>
        <Row>
          {product.length > 0 &&
            product
              .filter((product) => {
                if (search == "") {
                  return product;
                } else if (
                  product.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((product) => (
                <Col lg="3">
                  <motion.div layout>
                    <div className="mb-3 ml-3 mr-3" onClick={() => handleItemEdit(product)}>
                      <Card
                        className="wd-100 flexRow"
                        style={{ minWidth: "300px" }}
                      >
                        <Card.Body >
                          <div className="d-flex">
                            <Card.Img
                              className="card-img-top"
                              variant="top"
                              style={{ minWidth: "100px", maxWidth: "100px" }}
                              src={product.img}
                            />
                            <div>
                              <Card.Text className="text bold p-1 m-0">{product.name}</Card.Text>
                              <Card.Text className="text p-0 m-0">{`₹${product.price}`}/-</Card.Text>
                            </div>
                          </div>
                          <Card.Text className="text">ID: {product._id}</Card.Text>
                          <Card.Text className="p-0 m-0" style={{ color: "#575653", fontSize: "13px" }}>
                            {product.description}
                          </Card.Text>
                          <Card.Text className="text">
                            {product.description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </motion.div>
                </Col>
              ))}
        </Row>
        {showUpdateItem && (
          <div className="popup mt-5">
            <form method="post" className="Auth-form bodyCon" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between align-items-center mb-4" style={{ cursor: "pointer" }}>
                <h1 className="m-0">Update item</h1>
                <h1 className="m-0" onClick={() => setShowUpdateItem(false)}>X</h1>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control mt-1 mb-3"
                  value={updateItem.name}
                  onChange={handleInput}
                  name="name"
                  id="name"
                  placeholder="Item name"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control mt-1 mb-3"
                  onChange={handleInput}
                  value={updateItem.description}
                  name="description"
                  id="description"
                  placeholder="Description"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  className="form-control mt-1 mb-3"
                  type="number"
                  onChange={handleInput}
                  value={updateItem.price}
                  name="price"
                  id="price"
                  placeholder="Price"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  className="form-control mt-1 mb-3"
                  type="text"
                  onChange={handleInput}
                  value={updateItem.category}
                  name="category"
                  id="category"
                  placeholder="Category"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control mt-1 mb-3"
                  onChange={handleInput}
                  value={updateItem.img}
                  name="img"
                  id="img"
                  placeholder="Product image link"
                  autoComplete="off"
                />
              </div>
              <Button className="wd-100 mt-3" onClick={() => PostData()}>
                Update Item
              </Button>
              <Button className="wd-100 mt-3 bg-danger" onClick={() => deleteItem()}>
                Delete Item<RiDeleteBin6Line />
              </Button>
            </form>
          </div>
        )}
        <ToastContainer />
      </div>
    </motion.div>
  );
};
export default ListAllProduct;
