import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import "./App.css";
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import { useState, useContext } from "react";
import ThemeContext from "./contexts/Theme/ThemeContext";
import BlogContent from "./components/BlogContent/BlogContent";

import axios from "axios";
import Login from "./components/LoginSignup/Login";
import SignUp from "./components/LoginSignup/SignUp";

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  async function postData(content) {
    try {
      await axios.post("/submit", {
        title: content.title,
        content: content.content,
        tags: content.tags,
        category: content.category,
        author: "Mohit"
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSearchresults = async (data) => {
    setSearchQuery(data);
  }
  const lightMode = useContext(ThemeContext);
  var light = lightMode.lightMode;

  let { slug } = useParams();
  console.log(slug);

  return (
    <div className="App" style={light ? { backgroundColor: '#F6F6F6' } : { backgroundColor: '#1a1a40' }}>
      <Navbar searchResults={handleSearchresults} />
      <Routes>
        <Route path="/" element={<Body searchQueryData={searchQuery} />}></Route>

        <Route path="create" element={<CreatePost submit={postData} />}></Route>

        <Route path="blogContent">
          <Route path=":id" element={<BlogContent />}></Route>
        </Route>

        <Route path="login" element={<Login />}></Route>

        <Route path="signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
