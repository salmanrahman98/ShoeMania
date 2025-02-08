const express = require("express");
const Orders = require("../models/ordersModel");
const Users = require("../models/usersModel");
const router = express.Router();
const Product = require("../models/productModel");


// function to test token
async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ status: false, result: "unauthorized" });
  try {
    const user = await Users.findById(token).lean();
    if (user) {
      req.claims = user;
      next();
    } else {
      return res.status(401).send({ status: false, result: "unauthorized" });
    }
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }
}

// place order api
router.post("/addOrder", authenticateToken, async (req, res) => {
  try {
    const orders = new Orders({
      items: req.body.items,
      total: req.body.total,
      orderById: req.claims._id,
      customerName: req.claims.name,
      paymentStatus: req.body.paymentStatus
    });
    const result = await orders.save();
    res.status(200).send({ status: true, result: result });
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }
});


// order history by token user
router.get("/orderhistory", authenticateToken, async (req, res) => {
  try {
    const userId = req.claims._id;
    const orders = await Orders.find({ orderById: userId }).lean();
    const productIds = orders.flatMap(order => order.items.map(item => item.productId));

    // Retrieve products from the database
    const products = await Product.find({ _id: { $in: productIds } });

    // Create a map of productId to product details for easy lookup
    const productMap = {};
    products.forEach(product => {
      productMap[product._id.toString()] = product;
    });

    // Update order items with product details
    orders.forEach(order => {
      order.items.forEach(item => {
        const product = productMap[item.productId];
        if (product) {
          // Copy product keys to item object
          Object.assign(item, product.toObject());
          // Remove unnecessary keys from product
          delete item._id; // Assuming item._id should be removed
          delete item.__v; // Assuming __v should be removed
        }
      });
    });
    orders.reverse();
    return res.status(200).send({ status: true, result: orders });

  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }
});

router.get("/listallorder", authenticateToken, async (req, res) => {
  try {
    const claims = req.claims;
    console.log(claims);
    if (claims.role !== "admin") {
      return res.status(403).send({ status: false, result: "unauthorized" });
    }
    let orders = await Orders.find();

    return res.status(200).send({ status: true, result: orders });
  } catch (error) {
    res.status(400).send({ status: true, result: error });
  }
});

module.exports = router;