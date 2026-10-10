import React, { Component } from "react";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import "./style.less";

// START Persian-DnnSoftware
//const tooltipStyle = {
let tooltipStyle = {
    float: "left",
    position: "static"
};
// END Persian-DnnSoftware

class Label extends Component {
    constructor() {
        super();
        // START Persian-DnnSoftware
        if (document.body.classList.contains("rtl")) {
            tooltipStyle.float="right";
        }
        // END Persian-DnnSoftware
    }

    render() {
        const {props} = this;
        const tooltipMessages = props.tooltipMessage instanceof Array ? props.tooltipMessage : [props.tooltipMessage];
        return (
            <div className={"dnn-label" + (props.className ? (" " + props.className) : "") + (" " + props.labelType) } style={props.style}>
                <label htmlFor={props.labelFor} onClick={props.onClick && props.onClick.bind(this)}>{props.label}</label>
                <Tooltip
                    messages={tooltipMessages}
                    type="info"
                    tooltipColor={props.toolTipColor}
                    tooltipPlace={props.tooltipPlace}
                    rendered={tooltipMessages.length > 0}
                    style={Object.assign({}, tooltipStyle, props.tooltipStyle)}/>
                {props.extra}
            </div>
        );
    }
}

Label.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    labelFor: PropTypes.string,
    tooltipMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    tooltipPlace: PropTypes.string,
    tooltipStyle: PropTypes.object,
    tooltipColor: PropTypes.string,
    labelType: PropTypes.oneOf(["inline", "block"]),
    style: PropTypes.object,
    extra: PropTypes.node,
    onClick: PropTypes.func
};
Label.defaultProps = {
    labelType: "block",
    className: ""
};
export default Label;