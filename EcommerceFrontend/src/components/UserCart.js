import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout_btn";
import { Col, Row } from "react-bootstrap";
import Navi from "./Navi";
import { motion } from "framer-motion";

const UserCart = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const updates = useSelector((state) => state?.UpdatesReduser);
  const cartData = useSelector((state) => state?.CartReduser);
  useEffect(() => {
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
  }, [cartData, updates]);

  console.log("cartData", cartData);
  const handlecart = (product) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product });
    // dispatch({ type: "ADDED" , payload:product });
  };
  const increase = (productID) => {
    dispatch({ type: "ADD", payload: productID });
    dispatch({ type: "ADDED", payload: productID });
  };
  const decrease = (productID) => {
    dispatch({ type: "SUB", payload: productID });
    dispatch({ type: "ADDED", payload: productID });
  };
  console.log("size" + (cartData.length === 0));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div>
        {cartData.length === 0 ? (
          <div>
            <Navi />
            <img src={require("../assets/emptyCart.jpg")} className="wd-100" />
            <Button
              onClick={() => navigate("/allProducts")}
              variant="danger"
              className="w-100 mt-3"
            >
              Browse
            </Button>
          </div>
        ) : (
          <div className="body p-0 m-0">
            <div>
              <Navi />
              <div className="titles margin-top-10 mb-2">Cart</div>
              <Row>
                {cartData.length > 0 &&
                  cartData.map((product) => (
                    <Col lg="12">
                      <div className="body m-0 p-0 ">
                        <Card className="bgcard w-100 p-0 m-0 mt-4">
                          <Card.Body className="d-flex align-items-center w-100 p-0 m-0">
                            <Row className="w-100">
                              <Col lg="2" className="text">
                                <Card.Img
                                  className="card-img-top card-img-cart"
                                  variant="top"
                                  src={product.img}
                                />
                              </Col>
                              <Col
                                lg="3"
                                className=" d-flex justify-content-center align-items-center"
                              >
                                <Card.Text>{product.name}</Card.Text>
                              </Col>
                              <Col
                                lg="1"
                                className=" d-flex justify-content-center align-items-center"
                              >
                                <Card.Text>{`₹${product.price}`}</Card.Text>
                              </Col>
                              <Col
                                lg="2"
                                className="itemCont d-flex justify-content-center align-items-center"
                              >
                                <Card.Text className="text">
                                  {product.description}
                                </Card.Text>
                              </Col>
                              <Col
                                lg="2"
                                className="itemCont d-flex justify-content-center align-items-center"
                              >
                                <div className="buttons">
                                  <div className="btns">
                                    <Button
                                      onClick={() =>
                                        increase(product.productID)
                                      }
                                      variant="light"
                                      className="incdec"
                                    >
                                      +
                                    </Button>
                                    <div className="mr-3 ml-3 titlesCart">
                                      {" "}
                                      {product.cartQuantity}
                                    </div>
                                    {product.cartQuantity - 1 ? (
                                      <Button
                                        onClick={() =>
                                          decrease(product.productID)
                                        }
                                        variant="light"
                                        className="incdec"
                                      >
                                        -
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={() =>
                                          handlecart(product.productID)
                                        }
                                        variant="light"
                                        className=""
                                      >
                                        -
                                      </Button>
                                    )}
                                  </div>
                                  <Button
                                    onClick={() =>
                                      handlecart(product.productID)
                                    }
                                    variant="danger"
                                    className="w-100 mt-3"
                                  >
                                    Remove{" "}
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
            <Checkout />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCart;
