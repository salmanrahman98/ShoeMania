import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "reactstrap";
import Navi from "./Navi";
import { motion } from "framer-motion";

const AllProducts = () => {
  const notify = (noti) =>
    toast.info(noti, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  const cartData = useSelector((state) => state?.CartReduser);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
  loadProducts();
  }, [])
  

  const loadProducts = async (selectCat) => {
    var config = {
      method: "get",
      url: "http://localhost:4000/product/",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        setProduct(response.data.result);
        return;
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const removeCart = (product) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product._id });
    toast.warn(product.name + " removed from cart");
  };
  const handlecart = (product) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: product });
    toast(product.name + " added to cart");
  };

  
  return (
    <motion.div
      className="body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="body">
        <Navi />
        <div
          style={{ textTransform: "uppercase" }}
          className="titles margin-top-10"
        >
          {/* {selectedCategory} */}
        </div>
        <div className="d-flex mb-3">
          <Col lg="2">
            <input
              className="form-control"
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </div>
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
                    <div className="procon p-2 hover">
                      <Card
                        className="wd-100 d-flex flexRow "
                        style={{ minWidth: "300px", maxWidth: "300px" }}
                      >
                        <Card.Body className="wd-100">
                          <div className="d-flex wd-100">
                            <Card.Img
                              className="card-img-top"
                              variant="top"
                              style={{ minWidth: "100px", maxWidth: "100px" }}
                              src={product.img}
                            />
                            <div className="wd-100">
                              <Card.Text className="text bold p-1 m-0">
                                {product.name}
                              </Card.Text>
                              <Card.Text className="text p-0 m-0">
                                {`₹${product.price}`}/-
                              </Card.Text>
                              <div className="d-flex justify-content-between wd-100">
                                {product.veg ? (
                                  <img
                                    className="ml-2 card-img-icon"
                                    variant="top"
                                    src={require("../assets/veg.jpg")}
                                  />
                                ) : (
                                  <img
                                    src={require("../assets/nonveg.jpg")}
                                    className=" ml-2 card-img-icon"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <Card.Text
                            className="p-0 m-0 description"
                            style={{
                              color: "#575653",
                              fontSize: "13px",
                              minInlineSize: "2",
                              maxlines: "2",
                            }}
                          >
                            {product.description}
                          </Card.Text>
                          <div className="justify-content-between"></div>
                          <div className="bottomButtons">
                            {cartData.filter((d) => d.productID == product._id)
                              .length === 1 ? (
                              <div className="btns">
                                <Button
                                  onClick={() => removeCart(product)}
                                  variant="light"
                                  className="w-100 buttons"
                                >
                                  Remove from cart
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handlecart(product)}
                                variant="danger"
                                className="w-100 buttons"
                              >
                                Add to cart
                              </Button>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </motion.div>
                </Col>
              ))}
        </Row>
        <ToastContainer />
      </div>
    </motion.div>
  );
};

export default AllProducts;
