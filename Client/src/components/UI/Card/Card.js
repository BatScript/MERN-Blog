import cardStyles from "./Card.module.css";
import {useDispatch, useSelector} from "react-redux";
import "../../Common/CSS/common.css";


const Card = (props) => {
    const isDark = useSelector((state) => state.theme.isDark)

    return (
        <div className={`${cardStyles.card} ${isDark ? "blomo_border_light" : "blomo_border_dark"}`}>
            {props.children}
        </div>
    )
}

export default Card;