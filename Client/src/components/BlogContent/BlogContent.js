import ThemeContext from "../../contexts/Theme/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import contentStyles from './BlogContent.module.css'

const BlogContent = () => {
    const lightMode = useContext(ThemeContext);
    const light = lightMode.lightMode;
    const [blogContent, setBlogContent] = useState({ title: '', content: '' });

    let params = useParams();

    useEffect(() => {
        fetch('/oneBlog/' + params.id)
            .then(function (res) {
                return res.json();
            })
            .then(function (response) {
                setBlogContent({ ...blogContent, title: response.title, content: response.content })
            })
    }, [])


    return (
        <div>
            <div className={contentStyles.blogContent}>
            <h1 className="text-center text-white">{blogContent.title}</h1>
            <h4 className="text-center text-white">{blogContent.content}</h4>
            </div>
        </div>
    )
}

export default BlogContent;