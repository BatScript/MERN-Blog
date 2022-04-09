import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cpStyles from './CreatePost.module.css'
import Select from 'react-select'
const CreatePost = (props) => {
  var navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  console.log(category);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="createPost mt-5">
      <h1 className="text-center text-light">CREATE POST</h1>
      <form className="container" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control mb-3"
            id="exampleFormControlTextarea1"
            rows="15"
          ></textarea>
        </div>
        <div className="d-flex">
          <div className="">
            <input
              placeholder="Tags"
              className="form-control tagInput"
              id="tagInput"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="ml-5">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select" aria-label="Default select example">
              <option selected>Category</option>
              <option value="movies">Movies</option>
              <option value="spiritual">Spiritual</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="abstract">Abstract</option>
              <option value="relationships">Relationships</option>
            </select>
          </div>
        </div>
        <button
          className={`btn btn-primary mt-4 ml-auto mr-auto ${cpStyles.subButton}`}
          onClick={() => props.submit({ title: title, content: content, tags: tags, category: category, author: "Mohit" })}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
