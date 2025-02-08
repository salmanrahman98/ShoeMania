import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Navi from "./Navi";

const ProductSelected = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cartData = useSelector((state) => state?.CartReduser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4000/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.result);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [id]);

  const handleCart = (product) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: product });
    toast(product.name + " added to cart");
  };

  const removeCart = (product) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product._id });
    toast.warn(product.name + " removed from cart");
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
        <Navi />
      <div className="row" >

        {product && (
          <div className="col-lg-6 offset-lg-3">
            <Card>
              <Card.Img variant="top" src={product[0].img} style={{ height: "350px" }} />
              <Card.Body>
                <Card.Title>{product[0].name}</Card.Title>
                <Card.Text>{product[0].description}</Card.Text>
                <Card.Text className="price">
                  ₹{product[0].price}
                </Card.Text>
                <div className="buttons">
                  {cartData.some((item) => item.productID === product[0]._id) ? (
                    <Button
                      variant="light"
                      onClick={() => removeCart(product[0])}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleCart(product[0])}>
                      Add to Cart
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default ProductSelected;
