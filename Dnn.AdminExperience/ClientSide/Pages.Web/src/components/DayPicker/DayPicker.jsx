import React from "react";
import PropTypes from "prop-types";
import Picker from "react-day-picker";
// START persian-dnnsoftware
import { PersianDayPicker } from "@dnnsoftware/dnn-react-common";
// END persian-dnnsoftware
import "./style.less";


const DayPicker = (newProps) => {
    // START persian-dnnsoftware
    const isPersian = (() => {
        try {
            return window.parent && window.parent.personaBarSettings
                && window.parent.personaBarSettings.culture === "fa-IR";
        } catch (error) {
            return false;
        }
    })();
    const Calendar = isPersian ? PersianDayPicker : Picker;
    // END persian-dnnsoftware
    return (
        <div className="dnn-day-picker">
            {/* START persian-dnnsoftware */}
            <Calendar {...newProps} />
            {/* END persian-dnnsoftware */}
        </div>);
};
DayPicker.propTypes = {
    onDayClick: PropTypes.func.isRequired,
    month: PropTypes.instanceOf(Date),
    selectedDays: PropTypes.instanceOf(Date),
    fromMonth: PropTypes.instanceOf(Date)
};

export default DayPicker;