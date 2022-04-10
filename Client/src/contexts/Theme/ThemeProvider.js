import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = (props) => {

    const [lightMode, setLightMode] = useState(false);

    return (
        <ThemeContext.Provider value={{ lightMode, setLightMode }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;