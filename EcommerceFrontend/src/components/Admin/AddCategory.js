import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../Register.css";
import { useState } from "react";
import AdminButtons from "./ActionButtons";
import AdminNavi from "./AdminNavi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddCategory = () => {

  const [addItem, setAddItem] = useState({
    category: "",
    img:""
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAddItem({ ...addItem, [name]: value });
  };
  const handleSubmit = (event) => {
    const newRecord = { ...addItem };
  };
  const PostData = async (event) => {
    event.preventDefault();
    const { name, img} = addItem;
    if (name === "") {
        return toast.error("Please enter name");
      } else if (img === "") {
        return toast.error("Please enter image link!");
      }
    var data = JSON.stringify({
      category: name,
      img:img,
    });

    console.log(data);

    const token = localStorage.getItem("token");
    var config = {
      method: "post",
      url: "http://localhost:4000/category/add_category",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast(name + " added to category");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
        toast("Error please try again")
      });

  };
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.2}}
    exit={{opacity:0}}
    >
    <div className="loginbody">
      <AdminNavi/>  
      <form method="post" className="Auth-form bodyCon" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>Add Category</h1>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
            value={addItem.name}
            onChange={handleInput}
            name="name"
            id="name"
            placeholder="Category name"
            autoComplete="off"
          ></input>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
            onChange={handleInput}
            value={addItem.img}
            name="img"
            id="img"
            placeholder="Image link"
            autoComplete="off"
          ></input>
        </div>
        <Button className="wd-100 mt-3" onClick={PostData}>
          Add Category
        </Button>
      </form>
    </div>
    </motion.div>
  );
};

export default AddCategory;
