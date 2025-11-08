import React from "react";
import "../style/secondary_button_style.css";

const SecondaryButton = ({
  label,
  borderColor,
  fontFamily = "Montserrat Thin",
  fontWeight = "700",
  height,
  width,
  fontSize,
  onClick
}) => {
  return (
    <button
      className="secondary-btn"
      onClick={onClick}
      style={{
        borderColor: borderColor,
        color: borderColor,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        width: width,
        height: height,
        fontSize: fontSize
      }}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;