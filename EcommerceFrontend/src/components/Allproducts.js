import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "react-toastify/dist/ReactToastify.css";
import Navi from "./Navi";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Allproducts = () => {
  useEffect(() => {
    loadCategory();
  }, []);
  const [product, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const loadCategory = async () => {
    try {
      const response = await fetch("http://localhost:4000/product", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      debugger

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data));
        setProducts(data.result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const takeCategory = (product) => {
    // pass product as props 
    navigate(`/selectedProduct/${product._id}`, { state: { product: product } });
  };

  return (
    <motion.div
      className="body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="body">
        <Navi />
        <p className="titles margin-top-10">All Products</p>
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
                    <div className="procon p-2 hover" onClick={() => takeCategory(product)}>
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

export default Allproducts;
