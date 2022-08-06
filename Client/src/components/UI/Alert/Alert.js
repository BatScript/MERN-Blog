import { useEffect } from "react";
import alertStyles from "./Alert.module.css";

const Alert = (props) => {
  useEffect(() => {
    var isVisible = true;
    setInterval(() => {
      isVisible = false;
    }, 1000);
  }, props.showAlert);

  return (
    <div
      className={` ${alertStyles.alert} ${
        isVisible ? alertStyles.showAlert : alertStyles.hideAlert
      } `}
    >
      {props.message}
    </div>
  );
};

export default Alert;
