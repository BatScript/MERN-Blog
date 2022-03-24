import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreatePost = (props) => {
  var navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="createPost mt-5">
      <h1 className="text-center text-light">CREATE POST</h1>
      <form className="container" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Email address</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="15"
          ></textarea>
        </div>
        {/* <div>
          <input
            className="tagInput"
            id="tagInput"
            value='[{"value":"foo", "editable":false}, {"value":"bar"}]'
          />
        </div> */}
        <button
          className="btn btn-primary mt-4 ml-auto mr-auto"
          onClick={() => props.submit({ title: title, content: content })}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
