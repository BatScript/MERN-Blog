import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cpStyles from "./CreatePost.module.css";
import TagInput from "../UI/Tag-Input/TagInput";
import axios from "axios";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import "../Common/CSS/common.css";
const CreatePost = (props) => {
  var navigate = useNavigate();
  var isDark = useSelector((state) => state.theme.isDark);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);

  const selectedTags = (tags) => {
    setTags(tags);
  };

  const formSubmitHandler = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
    console.log(tags);
    e.preventDefault();
    try {
      await axios({
        method: "POST",
        url: "https://blomo.herokuapp.com/submit",
        data: {
          title,
          content,
          tags,
          category,
          author: "Mohit",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Check err");
    }
  };
  return (
    <div className={isDark ? "blomo_bg_light" : "blomo_bg_dark"}>
      <div className={`container createPost`}>
        <h1
          className={`text-center ${cpStyles.heading} ${
            isDark ? "blomo_text_light" : "blomo_text_dark"
          }`}
        >
          CREATE POST
        </h1>
        <div className="form-group d-flex">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className={`form-control mb-3 ${cpStyles.titleInput}`}
            id="exampleFormControlInput1"
            placeholder="Title"
          />
          <div className={`${cpStyles.selectOpsContainer}`}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`form-select ${cpStyles.selectOps}`}
              aria-label="Default select example"
            >
              <option defaultValue="category">Category</option>
              <option value="movies">Movies</option>
              <option value="spiritual">Spiritual</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="abstract">Abstract</option>
              <option value="relationships">Relationships</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`form-control mb-3 ${cpStyles.contentInput}`}
            id="exampleFormControlTextarea1"
            rows="10"
          ></textarea>
        </div>
        <div className={cpStyles.tagsAndType}>
          <TagInput
            className={cpStyles.tags}
            selectedTags={selectedTags}
            tags={["Life"]}
          />
        </div>
        <button
          onClick={formSubmitHandler}
          className={`btn btn-primary ml-auto mr-auto`}
          // onClick={() => props.submit({ title: title, content: content, tags: tags, category: category, author: "Mohit" })}
        >
          Submit
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
