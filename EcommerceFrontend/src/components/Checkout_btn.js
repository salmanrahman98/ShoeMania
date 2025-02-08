import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BsWallet2, BsFillBagCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Checkout_btn = () => {
  let amount = 0;

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paying, setPaying] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const cartData = useSelector((state) => state?.CartReduser);
  const amt = () => {
    for (let i = 0; i < cartData.length; i++) {
      amount = amount + cartData[i].price * cartData[i].cartQuantity;
    }
    // dispatch({ type: "TOTAL", payload: amount });
    return amount;
  };
  amount = 0;

  const handlePay = () => {
    setPaying(true);
    // Basic validation for card details
    if (
      // cardDetails.cardNumber.length !== 16 ||
      // cardDetails.cardholderName === "" ||
      cardDetails.cvv.length !== 3
    ) {
      setPaying(false);
      toast.error("Please enter valid card details.");
      return;
    }
    setTimeout(() => {
      toast.success("Payment successful!");
      paymentDone();
      setPaying(false);
    }, 2000);
  };

  const paymentDone = () => {
    const token = localStorage.getItem("token");
    const orderModel = JSON.stringify({
      items: cartData.map(item => ({
        productId: item.productID,
        quantity: item.cartQuantity
      })),
      total: Math.floor(amount + amount * 0.09 - amount * 0.05),
      paymentStatus: "PAID"
    });


    fetch("http://localhost:4000/orders/addOrder", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: orderModel,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        toast(data);
        dispatch({ type: "CLEAR_CART", payload: "claer" });
        toast.success("Payment successful!");
        setShowPaymentPopup(false);
        navigate("/allProducts");
      })
      .catch(error => {
        console.error("There was an error!", error);
        toast.success("Payment unsuccessful!");
      });
  };

  const checkout = () => {
    // Your implementation of paymentDone function
  };
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(currentYear + i);
  }

  return (
    <div>
      <div className="titlesCart">
        <p className="titlesCart">Sub Amount: ₹{amt()}/-</p>
        <p className="titlesCart">
          Discount : 5% - ₹{Math.floor(amount * 0.05)}/-
        </p>
        <p className="titlesCart">
          Taxes & Charges : 9% + ₹{Math.floor(amount * 0.09)}/-
        </p>
        <h1 className="">
          Total Amount: ₹{Math.floor(amount + amount * 0.09 - amount * 0.05)}
          /-
        </h1>

        <div className="">
          <Button
            onClick={() => setShowPaymentPopup(true)}
            variant="danger"
            className="m-10 justify-content-center align-items-center"
          >
            Pay ₹{Math.floor(amount + amount * 0.09 - amount * 0.05)}/-
            <BsWallet2 />
          </Button>
        </div>
      </div>
      {showPaymentPopup && (
        <div className="payment-popup">
          <div className="payment-popup-content">
            <div className="d-flex" style={{cursor:"pointer"}}>
              <p>Total Amount to be Debited: ₹{Math.floor(amount + amount * 0.09 - amount * 0.05)}/-</p>
              <h5 onClick={() => setShowPaymentPopup(false)}>X</h5>
            </div>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cardholderName"
              placeholder="Cardholder Name"
              value={cardDetails.cardholderName}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleInputChange}
            />
            <p style={{ marginBottom: "-3px" }}>Expiry Date</p>
            <select
              name="expiryMonth"
              value={cardDetails.expiryMonth}
              style={{ marginBottom: "15px" }}
              onChange={handleInputChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                <option key={month} value={month < 10 ? `0${month}` : `${month}`}>{month}</option>
              ))}
            </select>
            <select
              name="expiryYear"
              value={cardDetails.expiryYear}
              onChange={handleInputChange}
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <Button onClick={handlePay}> {paying ? "Plesae wait!" : `Pay Now ₹${Math.floor(amount + amount * 0.09 - amount * 0.05)}/-`}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout_btn;
