import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@dnnsoftware/dnn-react-common";
import localization from "../../localization";

const normalMargin = "-3px 0 0 5px";
const switchMargin = "5px 0 0 5px";

export default class GlobalIcon extends Component {

    render() {
        const margin = this.props.isSwitch ? switchMargin : normalMargin;
        return <Tooltip type="global"
            messages={[localization.get("GlobalSettings")]}
            // START Persian-DnnSoftware
            //style={Object.assign({ float: "left", height: "20", position: "static", margin: margin }, this.props.tooltipStyle)}
            style={Object.assign({ float: document.body.classList.contains("rtl")? "right":"left", height: "20", position: "static", margin: margin }, this.props.tooltipStyle)} 
            // END Persian-DnnSoftware
        />;
    }
}

GlobalIcon.propTypes = {    
    isSwitch: PropTypes.bool.isRequired,
    tooltipStyle: PropTypes.object  
};

GlobalIcon.defaultProps = {
    isSwitch: false
};