import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import { useState } from "react";
import BlogContent from "./components/BlogContent/BlogContent";
import "../src/components/Common/CSS/common.css";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import LoginRegister from "./components/login/login&register";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  var isDark = useSelector((state) => state.theme.isDark);

  const handleSearchresults = async (data) => {
    setSearchQuery(data);
  };

  return (
    <div className={`App ${isDark ? "blomo_bg_light" : "blomo_bg_dark"}`}>
      <Navbar searchResults={handleSearchresults} />
      <Routes>
        <Route
          path="/"
          element={<Body searchQueryData={searchQuery} />}
        ></Route>

        <Route path="create" element={<CreatePost />}></Route>

        <Route path="login" element={<LoginRegister />}></Route>

        <Route path="signup" element={<LoginRegister />}></Route>

        <Route path="blogContent">
          <Route path=":id" element={<BlogContent />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
