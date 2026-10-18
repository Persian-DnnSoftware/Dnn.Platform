// START persian-dnnsoftware
import React, { Component } from "react";
import PropTypes from "prop-types";
import { isValidJalaliDate, toGregorianDate, toJalali } from "./calendarUtils";

const numberReg = /^\d*$/;

class PersianDateInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDateState(props.date);
    }

    componentDidUpdate(prevProps) {
        if (this.props.date !== prevProps.date) {
            this.setState(this.getDateState(this.props.date));
        }
    }

    getDateState(date) {
        const value = toJalali(date);
        return {
            year: value ? String(value.jy) : "",
            month: value ? String(value.jm).padStart(2, "0") : "",
            day: value ? String(value.jd).padStart(2, "0") : ""
        };
    }

    updateValue(key, event) {
        const value = event.target.value;
        const maxLength = key === "year" ? 4 : 2;
        if (value.length <= maxLength && numberReg.test(value)) {
            this.setState({ [key]: value });
        }
    }

    commitDate() {
        const { year, month, day } = this.state;
        if (!year || !month || !day || !isValidJalaliDate(Number(year), Number(month), Number(day))) {
            this.setState(this.getDateState(this.props.date));
            return;
        }
        this.props.onUpdateDate(toGregorianDate(Number(year), Number(month), Number(day), this.props.date));
    }

    render() {
        return <div className="date-input persian-date-input" dir="ltr">
            <input type="text" className="year" value={this.state.year} onChange={this.updateValue.bind(this, "year")} onBlur={this.commitDate.bind(this)} placeholder="YYYY" aria-label="سال" />
            <span>/</span>
            <input type="text" value={this.state.month} onChange={this.updateValue.bind(this, "month")} onBlur={this.commitDate.bind(this)} placeholder="MM" aria-label="ماه" />
            <span>/</span>
            <input type="text" value={this.state.day} onChange={this.updateValue.bind(this, "day")} onBlur={this.commitDate.bind(this)} placeholder="DD" aria-label="روز" />
        </div>;
    }
}

PersianDateInput.propTypes = {
    date: PropTypes.instanceOf(Date),
    onUpdateDate: PropTypes.func.isRequired
};

export default PersianDateInput;
// END persian-dnnsoftware
