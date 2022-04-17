import topStyles from "./Body.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Loader from '../Loader/Loader';
import ThemeContext from "../../contexts/Theme/ThemeContext";

function Body(props) {
  const [blogArray, setBlogArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const lightMode = useContext(ThemeContext);

  let location = useLocation();

  async function searchSubmitHandler(e) {
    e.preventDefault();
  }

  const handleSearch = async () => {
    if (searchQuery === "") {
      alert('kuch to likh de bhai?');
    }
    else {
      setIsLoading(false);
      await fetch('/find/' + searchQuery)
        .then((res) => { return res.json() })
        .then((data) => handleSearchResult(data));

      setIsLoading(true);
    }
  }

  const handleSearchResult = (data) => {
    console.log(data);
    if (data.length !== 0) {
      setBlogArray(data)
    }
    else {
      alert('not found bro sowwy')
    }
  }

  useEffect(
    async function () {
      const triggerApi = async () => {

        setIsLoading(false);
        setMessage(false);
        fetch("/blogList", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
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
          .catch((err) => { console.log(err); });
      };

      triggerApi();
    },
    [location]
  );

  const categoryButtons = async (type) => {

    setIsLoading(false);
    setMessage(false)

    await fetch("/category/" + type)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setBlogArray(data);
        if (data.length === 0) {
          setMessage(true);
        }
      })

    setIsLoading(true);
  }

  var light = lightMode.lightMode;

  var blogContainer = (

    <div className={` container ${topStyles.blogCardContainer} ${topStyles.fadeIn}`} >
      {blogArray.map((data, i) => (
        <Link to={`/blogContent/${data._id}`} style={{ textDecoration: 'none' }} key={data._id}>
          <div className={light ? topStyles.blogCardDark : topStyles.blogCard} key={i}>
            <h1 className="text-white">{data.title} </h1>
            <p className="text-white">{data.content.slice(0, 50) + "..."}</p>
            <p className="text-white">-by {data.author}</p>
          </div>
        </Link>
      ))}
    </div>
  );

  var emptyMessage = (
    <h1 className={`text-center ${topStyles.fadeIn} ${light ? topStyles.td : topStyles.tw}`}>Sometimes we should switch out of zone, to know world better! 😊</h1>
  )

  return (
    <div>
      <h1 className={`text-center mt-4 ${light ? topStyles.td : topStyles.tw}`}>
        <b>Find Your thing! Its all Here I am sure.</b>
      </h1>

      <form onSubmit={searchSubmitHandler} className={`d-flex float-right mt-4 ${topStyles.ml_auto}`}>
        <input
          value={searchQuery}
          className={`form-control me-2 ${light ? topStyles.searchInputDark : topStyles.searchInput}`}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={light ? topStyles.navSubmitDark : topStyles.navSubmit}
          type="submit"
          onClick={handleSearch}
        >
          <i className="bi bi-binoculars-fill"></i>
        </button>
      </form>

      <div className={light ? topStyles.categoriesDark : topStyles.categories}>
        <button onClick={() => categoryButtons('movies')} className={topStyles.movie}>Movies</button>
        <button onClick={() => categoryButtons('spiritual')} className={topStyles.spiritual}>Spiritual</button>
        <button onClick={() => categoryButtons('lifestyle')} className={topStyles.lifestyle}>Lifestyle</button>
        <button onClick={() => categoryButtons('abstract')} className={topStyles.abstract}>Abstract</button>
        <button onClick={() => categoryButtons('relationships')} className={topStyles.relationship}>Relationships</button>
      </div>

      {isLoading ? (blogContainer) : (Loader)}
      {message && (emptyMessage)}
      <Link to="/create">
        <button className={`btn-primary btn-circle ${light ? topStyles.createDark : topStyles.create}`}>
          <i className="bi bi-pencil-square"></i>
        </button>
      </Link>
      <Outlet />
    </div >
  );
}

export default Body;
