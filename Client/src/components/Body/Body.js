import topStyles from "./Body.module.css";
import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Card from "../UI/Card/Card";
import {useDispatch, useSelector} from "react-redux";
import "../Common/CSS/common.css";

const Body = () => {

  const isDark = useSelector((state) => state.theme.isDark)

  const [blogArray, setBlogArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  let location = useLocation();

  async function searchSubmitHandler(e) {
    e.preventDefault();
  }

  const handleSearch = async () => {
    if (searchQuery === "") {
      alert("kuch to likh de bhai?");
    } else {
      setIsLoading(false);
      await fetch("https://blomo.herokuapp.com/find/" + searchQuery)
        .then((res) => {
          return res.json();
        })
        .then((data) => handleSearchResult(data));

      setIsLoading(true);
    }
  };

  const handleSearchResult = (data) => {
    console.log(data);
    if (data.length !== 0) {
      setBlogArray(data);
    } else {
      alert("not found bro sowwy");
    }
  };

  useEffect(
    () => {
      const triggerApi = async () => {
        setIsLoading(false);
        setMessage(false);
        fetch("https://blomo.herokuapp.com/blogList", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            setBlogArray(data);
            setIsLoading(true);
            if (data.length === 0) {
              setMessage(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

      triggerApi();
    },
    [location]
  );

  const categoryButtons = async (type) => {
    setIsLoading(false);
    setMessage(false);

    await fetch("https://blomo.herokuapp.com/category/" + type)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setBlogArray(data);
        if (data.length === 0) {
          setMessage(true);
        }
      });

    setIsLoading(true);
  };

  var blogContainer = (
    <div
      className={` container ${topStyles.blogCardContainer} ${topStyles.fadeIn}`}
    >
      {blogArray.map((data, i) => (
        <Link className={topStyles.Link} to={`/blogContent/${data._id}`} key={data._id}>
          <Card>
            <h1 className={`${topStyles.capitalise} ${isDark ? "blomo_text_light" : "blomo_text_dark"}`}>{data.title}</h1>
            <p className={`${isDark ? "blomo_text_light" : "blomo_text_dark"}`}>{data.content.slice(0, 50) + "..."}</p>
            <p className={`${topStyles.capitalise} ${isDark ? "blomo_text_light" : "blomo_text_dark"}`}>-by {data.author}</p>
            <span className={`material-symbols-outlined ${topStyles.goIcon} ${isDark ? "blomo_text_light" : "blomo_text_dark"}`}>
              arrow_circle_right
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );

  var emptyMessage = (
    <h1
      className={`text-center ${topStyles.fadeIn}`}
    >
      Sometimes we should switch out of zone, to know world better! 😊
    </h1>
  );

  return (
    <div className={ isDark ? topStyles.bodyContainerLight : topStyles.bodyContainerDark}>
      <h1 className={`text-center ${isDark ? "blomo_text_light" : "blomo_text_dark"}`}>
        <b>Welcome to Blomo.</b>
      </h1>

      <form
        onSubmit={searchSubmitHandler}
        className={`d-flex float-right mt-4 ${topStyles.ml_auto}`}
      >
        <input
          value={searchQuery}
          className={`form-control me-2 ${topStyles.searchInput}`}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={topStyles.navSubmit}
          type="submit"
          onClick={handleSearch}
        >
          <i className="bi bi-binoculars-fill"></i>
        </button>
      </form>

      <div className={topStyles.categories}>
        <button
          onClick={() => categoryButtons("movies")}
          className={`${topStyles.movie} ${isDark ? "blomo_text_light blomo_border_light" : "blomo_text_dark blomo_border_dark"}`}
        >
          Movies
        </button>
        <button
          onClick={() => categoryButtons("spiritual")}
          className={`${topStyles.spiritual} ${isDark ? "blomo_text_light blomo_border_light" : "blomo_text_dark blomo_border_dark"}`}
        >
          Spiritual
        </button>
        <button
          onClick={() => categoryButtons("lifestyle")}
          className={`${topStyles.lifestyle} ${isDark ? "blomo_text_light blomo_border_light" : "blomo_text_dark blomo_border_dark"}`}
        >
          Lifestyle
        </button>
        <button
          onClick={() => categoryButtons("abstract")}
          className={`${topStyles.abstract} ${isDark ? "blomo_text_light blomo_border_light" : "blomo_text_dark blomo_border_dark"}`}
        >
          Abstract
        </button>
        <button
          onClick={() => categoryButtons("relationships")}
          className={`${topStyles.relationship} ${isDark ? "blomo_text_light blomo_border_light" : "blomo_text_dark blomo_border_dark"}`}
        >
          Relationships
        </button>
      </div>

      {isLoading ? blogContainer : Loader}
      {message && emptyMessage}
      <Link to="/create">
        <button
          className={`btn-primary btn-circle ${topStyles.create}`}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      </Link>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
