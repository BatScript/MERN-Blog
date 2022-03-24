import topStyles from "./Body.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Body(props) {
  const [blogArray, setBlogArray] = useState([]);

  let location = useLocation();

  useEffect(
    async function () {
      const triggerApi = async () => {
        fetch("/blogList")
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            setBlogArray(data);
          });
      };

      triggerApi();
    },
    [location]
  );

  return (
    <div>
      <h1 className="text-center text-white mt-5">
        Find Your thing! Its all Here I am sure.
      </h1>
      <div className={topStyles.categories}></div>
      <div className={` container ${topStyles.blogCardContainer}`}>
        {blogArray.map((data, i) => (
          <div className={topStyles.blogCard} key={i}>
            <h1 className="text-white">{data.title} </h1>
            <p className="text-white">{data.content}</p>
          </div>
        ))}
      </div>
      <Link to="/create">
        <button className={`btn-primary btn-circle ${topStyles.create}`}>
          <i className="bi bi-pencil-square"></i>
        </button>
      </Link>
    </div>
  );
}

export default Body;
