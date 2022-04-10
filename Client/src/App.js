import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import { useState, useContext } from "react";
import ThemeContext from "./contexts/Theme/ThemeContext";

import axios from "axios";

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

  return (
    <div className="App" style={light ? { backgroundColor: '#F6F6F6' } : { backgroundColor: '#1a1a40' }}>
      <Navbar searchResults={handleSearchresults} />
      <Routes>
        <Route path="/" element={<Body searchQueryData={searchQuery} />}></Route>

        <Route path="create" element={<CreatePost submit={postData} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
