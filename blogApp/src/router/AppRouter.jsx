import Dashboard from "../pages/Dashboard";
import Footers from "../components/Footers";
import NavBars from "../components/NavBars";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Login from "../components/auth/Login";
import PrivateRouter from "./PrivateRouter";
import BlogDetail from "../pages/BlogDetail";
import Register from "../components/auth/Register";
import MyBlog from "../pages/MyBlog";
import { useState } from "react";




const AppRouter = () => {
  const [info, setInfo] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    status: "",
    
  });
  return (
    <div>
      <NavBars />
      <Routes>
        <Route path="/" element={<Dashboard setInfo={setInfo}  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/newblog" element={<NewBlog info={info} setInfo={setInfo} />} />
          <Route path="/detail/:id" element={<BlogDetail setInfo={setInfo}  />} />
          <Route path="/myblog" element={<MyBlog />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footers />
    </div>
  );
};

export default AppRouter;
