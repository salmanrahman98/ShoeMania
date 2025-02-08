import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddItem from "./components/Admin/AddItem";
import UserCart from "./components/UserCart";
import Allproducts from "./components/Allproducts";
import ProductSelected from "./components/ProductSelected";
import Orderhistory from "./components/Orderhistory";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDasboard from "./components/Admin/AdminDasboard";
import AdminProfile from "./components/Admin/AdminProfile";
import AdminActions from "./components/Admin/AdminActions";
import ListAllProduct from "./components/Admin/ListAllProduct";
import ListAllCategory from "./components/Admin/ListAllCategory";
import { AnimatePresence } from "framer-motion";
import UpdateProfile from "./components/UpdateProfile";


function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allProducts" element={<Allproducts />} />
          <Route path="/selectedProduct/:id" element={<ProductSelected />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/checkout" element={<UserCart />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          {/*           
          <Route path="/product" element={<Product />} />
          <Route path="/users/display_favourites" element={<Favourites />} />
          {/* Admin routes */}
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindasboard" element={<AdminDasboard />} />
          <Route path="/addItems" element={<AddItem />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/admindactions" element={<AdminActions />} />
          <Route path="/listallproduct" element={<ListAllProduct />} />
          <Route path="/listcategory" element={<ListAllCategory />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
