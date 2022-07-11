import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import { useState } from "react";
import BlogContent from "./components/BlogContent/BlogContent";
import Footer from "./components/Footer/Footer";

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchresults = async (data) => {
    setSearchQuery(data);
  }

  return (
    <div className="App">
      <Navbar searchResults={handleSearchresults} />
      <Routes>
        <Route path="/" element={<Body searchQueryData={searchQuery} />}></Route>

        <Route path="create" element={<CreatePost />}></Route>

        <Route path="blogContent">
          <Route path=":id" element={<BlogContent />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
