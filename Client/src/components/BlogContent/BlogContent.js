import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import contentStyles from "./BlogContent.module.css";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";

const BlogContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogContent, setBlogContent] = useState({ title: "", content: "" });

  var isDark = useSelector((state) => state.theme.isDark);

  let params = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch("/oneBlog/" + params.id)
      .then(function (res) {
        return res.json();
      })
      .then(function (response) {
        setBlogContent({
          ...blogContent,
          title: response.title,
          content: response.content,
          author: response.author,
        });
        setIsLoading(false);
      });
  }, []);

  var text = (
    <div>
      <h1 className={`text-left ${contentStyles.title}`}>
        {blogContent.title}
      </h1>
      <p className={contentStyles.capitalise}>by {blogContent.author}</p>
      <img src="" />
      <p className="text-left">{blogContent.content}</p>
    </div>
  );

  return (
    <div
      className={`${contentStyles.OneBlog} ${
        isDark
          ? "blomo_bg_light blomo_text_light"
          : "blomo_bg_dark blomo_text_dark"
      }`}
    >
      <div className={contentStyles.shareContainer}>
        <span className="material-symbols-outlined">thumb_up</span>
        <span className="material-symbols-outlined">thumb_down</span>
        <span className="material-symbols-outlined">share</span>
      </div>

      <div className={contentStyles.blogContent}>
        {isLoading ? Loader : text}
      </div>
    </div>
  );
};

export default BlogContent;
