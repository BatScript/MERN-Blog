import topStyles from "./Body.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from '../Loader/Loader';


function Body(props) {
  const [blogArray, setBlogArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(false);

  let location = useLocation();

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

  var blogContainer = (
    <div className={` container ${topStyles.blogCardContainer} ${topStyles.fadeIn}`}>
      {blogArray.map((data, i) => (
        <div className={topStyles.blogCard} key={i}>
          <h1 className="text-white">{data.title} </h1>
          <p className="text-white">{data.content}</p>
          <p className="text-white">-by {data.author}</p>
        </div>
      ))}
    </div>
  );

  var emptyMessage = (
    <h1 className={`text-white text-center ${topStyles.fadeIn}`}>Sometimes we should switch out of zone, to know world better! 😊</h1>
  )

  return (
    <div>
      <h1 className="text-center text-white mt-5">
        Find Your thing! Its all Here I am sure.
      </h1>
      <div className={topStyles.categories}>
        <button onClick={() => categoryButtons('movies')} className={topStyles.movie}>Movies</button>
        <button onClick={() => categoryButtons('spiritual')} className={topStyles.spiritual}>Spiritual</button>
        <button onClick={() => categoryButtons('lifestyle')} className={topStyles.lifestyle}>Lifestyle</button>
        <button onClick={() => categoryButtons('abstract')} className={topStyles.abstract}>Abstract</button>
        <button onClick={() => categoryButtons('relationships')} className={topStyles.relationship}>Relationships</button>
      </div>
      {isLoading ? (blogContainer) : (Loader)}
      {message && (emptyMessage)}
      <Link to="/create">
        <button className={`btn-primary btn-circle ${topStyles.create}`}>
          <i className="bi bi-pencil-square"></i>
        </button>
      </Link>
    </div>
  );
}

export default Body;
