import ThemeContext from "../../contexts/Theme/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import contentStyles from './BlogContent.module.css'
import Loader from "../Loader/Loader";

const BlogContent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const lightMode = useContext(ThemeContext);
    const light = lightMode.lightMode;
    const [blogContent, setBlogContent] = useState({ title: '', content: '' });

    let params = useParams();

    useEffect(() => {
        setIsLoading(true);
        fetch('/oneBlog/' + params.id)
            .then(function (res) {
                return res.json();
            })
            .then(function (response) {
                setBlogContent({ ...blogContent, title: response.title, content: response.content })
                setIsLoading(false);
            })
    }, [])

    var text = (<div>
        <h1 className="text-center text-white">{blogContent.title}</h1>
        <h4 className="text-center text-white">{blogContent.content}</h4>
    </div>)


    return (
        <div>
            <div className={contentStyles.blogContent}>
                {isLoading ? (Loader) : (text) }
            </div>
        </div>
    )
}

export default BlogContent;