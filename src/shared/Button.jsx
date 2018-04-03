import PropTypes from "prop-types";
import React from "react";

function Button(props) {
    return (
        <button
            type="button"
            onClick={props.onButtonClick}
        >
            {props.label} {props.icon}
        </button>
    );
}

Button.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string,
    onButtonClick: PropTypes.func
};


export default Button;