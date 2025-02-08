const express = require("express");
const Product = require("../models/productModel");
const Users = require("../models/usersModel");
const router = express.Router();

// function to test token
async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    const user = await Users.findById(token).lean();
    req.claims = user;
    next();
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

router.get("/", async (req, res) => {
  try {
    const product = await Product.find({isDeleted: false});
    return res.status(200).send({ status: true, result: product });
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }
});

router.get("/listAllProducts",authenticateToken, async (req, res) => {
  try {
    if (req.claims.role !== "admin") {
      return res.status(420).send({ status: false, result: "Only admin access" });
    }
    const product = await Product.find({ isDeleted: false });
    return res.status(200).send({ status: true, result: product });
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.find({_id: req.params.id, isDeleted: false});
    return res.status(200).send({ status: true, result: product });
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }
});

// Add product api
router.post("/add", authenticateToken, async (req, res) => {
  const role = req.claims.role;
  if (role != "admin") {
    res.status(400).send("unauthorized");
    return;
  }
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      img: req.body.img,
    });
    const response = await product.save();
    if (response) {
      res.status(200).send({ status: true, result: response });
    }
  } catch (error) {
    res.status(401).send({ status: false, result: error });
  }
});

// Update product api
router.patch("/update", authenticateToken, async (req, res) => {
  const role = req.claims.role;
  if (role !== "admin") {
    return res.status(403).send("Unauthorized");
  }
  try {
    const { id, name, description, price, category, img } = req.body;

    if (!id) {
      return res.status(400).send({ status: false, result: { message: "Please provide product id to update." } });
    }
    const product = await Product.findById(id).lean();
    if (product) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            category: category || product.category,
            img: img || product.img
          }
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).send({ status: false, result: { message: "Product not found" } });
      }

      res.status(200).send({ status: true, result: updatedProduct });
    } else {
      return res.status(404).send({ status: false, result: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal server error");
  }
});

//remove product api

router.delete("/delete", authenticateToken, async (req, res) => {
  try {
    const role = req.claims.role;
    if (role != "admin") {
      res.status(400).send({ status: false, result: "unauthorized" });
      return;
    }

    const productId = req.body.productId

    // logic to hard delete 
    // const product = await Product.findOneAndRemove({_id : req.body.id})

    // logic for soft delete
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $set: {
          isDeleted: true
        }
      },
      { new: true }
    );
    if (product == null) {
      res.status(404).send({ status: false, result: "Product does not exist" });
      return
    } else {
      return res.status(200).send({ status: true, result: product });
    }
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }
});

// categorized items list viewing
router.get("/:category", async (req, res) => {
  try {
    const reqcategory = req.params.category;
    let product
    if (reqcategory !== "all") {
      product = await Product.find({ category: reqcategory });
    } else {
      product = await Product.find();
    }
    return res.status(200).send({ status: true, result: product });
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }

});

module.exports = router;
