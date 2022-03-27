import topStyles from "./Body.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from '../Loader/Loader';


function Body(props) {
  const [blogArray, setBlogArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
          });
      };

      triggerApi();
    },
    [location]
  );

  var blogContainer = (
    <div className={` container ${topStyles.blogCardContainer}`}>
      {blogArray.map((data, i) => (
        <div className={topStyles.blogCard} key={i}>
          <h1 className="text-white">{data.title} </h1>
          <p className="text-white">{data.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="text-center text-white mt-5">
        Find Your thing! Its all Here I am sure.
      </h1>
      <div className={topStyles.categories}>
        <button className={topStyles.movie}>Movies</button>
        <button className={topStyles.spiritual}>Spiritual</button>
        <button className={topStyles.lifestyle}>Lifestyle</button>
        <button className={topStyles.abstract}>Abstract</button>
        <button className={topStyles.relationship}>Relationships</button>
      </div>
      {isLoading ? (blogContainer) : (Loader)}
      <Link to="/create">
        <button className={`btn-primary btn-circle ${topStyles.create}`}>
          <i className="bi bi-pencil-square"></i>
        </button>
      </Link>
    </div>
  );
}

export default Body;
