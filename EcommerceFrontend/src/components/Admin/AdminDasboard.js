import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import AdminNavi from "./AdminNavi";
import formatDistance from "date-fns/formatDistance";
import { motion } from "framer-motion";

const AdminDasboard = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadorders();
    loadAllUsers();
  }, []);
  function loadAllUsers() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/users/listAllUsers",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function loadorders() {
    const token = localStorage.getItem("token");
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/orders/listallorder",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        debugger
        let orders = response.data.result;

        setOrders(orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function conDate(dateNo) {
    const dateStr = dateNo;
    const str = formatDistance(new Date(dateStr), new Date());
    return <h3>{str} ago.</h3>;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="body"
    >
      <div className="">
        <AdminNavi />
        <h1 className="margin-top-10 title">Orders</h1>
        {orders.length > 0 &&
          orders.map((product) => (
            <div>
              <div>{conDate(product.createdAt)}</div>
              <h5 style={{ textTransform: "uppercase" }}>
                Customer name: {product.customerName}
              </h5>
              <h6>Total order value :{product.total}/-</h6>
              <Row>
                {product.items.length > 0 &&
                  product.items.map((product) => (
                    <Col lg="12">
                      <div className="m-0 p-0 ">
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
                                lg="2"
                                className=" d-flex justify-content-center align-items-center"
                              >
                                <Card.Text>{product.name}</Card.Text>
                              </Col>
                              <Col
                                lg="2"
                                className=" d-flex justify-content-center align-items-center"
                              >
                                <Card.Text>{`₹${product.price}/-`}</Card.Text>
                              </Col>
                              <Col
                                lg="2"
                                className="itemCont d-flex justify-content-center align-items-center"
                              >
                                <Card.Text className="text">
                                  Quantity : {product.cartQuantity}
                                </Card.Text>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default AdminDasboard;

//import useState hook to create menu collapse state
// import React, { useState } from "react";

// //import react pro sidebar components
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
// } from "react-pro-sidebar";

// //import icons from react icons
// import { FaList, FaRegHeart } from "react-icons/fa";
// import {
//   FiHome,
//   FiLogOut,
//   FiArrowLeftCircle,
//   FiArrowRightCircle,
// } from "react-icons/fi";
// import { RiPencilLine } from "react-icons/ri";
// import { BiCog } from "react-icons/bi";

// //import sidebar css from react-pro-sidebar module and our custom css
// import "react-pro-sidebar/dist/css/styles.css";
// import "./Header.css";

// const AdminDasboard = () => {
//   //create initial menuCollapse state using useState hook
//   const [menuCollapse, setMenuCollapse] = useState(false);

//   //create a custom function that will change menucollapse state from false to true and true to false
//   const menuIconClick = () => {
//     //condition checking to change state from true to false and vice versa
//     menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
//   };

//   return (
//     <>
//       <div id="header">
//         {/* collapsed props to change menu size using menucollapse state */}
//         <ProSidebar collapsed={menuCollapse}>
//           <SidebarHeader>
//             <div className="logotext">
//               {/* small and big change using menucollapse state */}
//               <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
//             </div>
//             <div className="closemenu" onClick={menuIconClick}>
//               {/* changing menu collapse icon on click */}
//               {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
//             </div>
//           </SidebarHeader>
//           <SidebarContent>
//             <Menu iconShape="square">
//               <MenuItem  icon={<FiHome />}>Home</MenuItem>
//               <MenuItem icon={<FaList />}>Category</MenuItem>
//               <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
//               <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
//               <MenuItem icon={<BiCog />}>Settings</MenuItem>
//             </Menu>
//           </SidebarContent>
//           <SidebarFooter>
//             <Menu iconShape="square">
//               <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
//             </Menu>
//           </SidebarFooter>
//         </ProSidebar>
//       </div>
//     </>
//   );
// };

// export default AdminDasboard;
