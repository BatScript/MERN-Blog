import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

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
    var searchQuery = data;

    fetch('/find/' + searchQuery)
      .then((res) => { return res.json() })
      .then(async (d) => {
        // setSearchResult(d);
        console.log("final : ", d);
      });
  }

  return (
    <div className="App">
      <Navbar searchResults={handleSearchresults} />
      <Routes>
        <Route path="/" element={<Body />}></Route>

        <Route path="create" element={<CreatePost submit={postData} />}></Route>
      </Routes>

      {/* <form onSubmit={postName} className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <button type="submit">Sub</button>
      </form>
      {home} */}
    </div>
  );
}

export default App;
