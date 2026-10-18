// START persian-dnnsoftware
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    addJalaliMonths,
    isSameDay,
    PERSIAN_MONTHS,
    PERSIAN_WEEKDAYS,
    startOfJalaliMonth,
    toGregorianDate,
    toJalali
} from "./calendarUtils";

class PersianDayPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { month: startOfJalaliMonth(props.month || props.initialMonth || new Date()) };
    }

    componentDidUpdate(prevProps) {
        const previousMonth = prevProps.month || prevProps.initialMonth;
        const nextMonth = this.props.month || this.props.initialMonth;
        if (nextMonth && previousMonth && nextMonth.getTime() !== previousMonth.getTime()) {
            this.setState({ month: startOfJalaliMonth(nextMonth) });
        }
    }

    moveMonth(amount) {
        const month = startOfJalaliMonth(addJalaliMonths(this.state.month, amount));
        this.setState({ month });
        if (this.props.onMonthChange) {
            this.props.onMonthChange(month);
        }
    }

    isSelected(date) {
        const { selectedDays } = this.props;
        if (typeof selectedDays === "function") {
            return selectedDays(date);
        }
        if (Array.isArray(selectedDays)) {
            return selectedDays.some(day => isSameDay(day, date));
        }
        return isSameDay(selectedDays, date);
    }

    isDisabled(date) {
        const { disabledDays, fromMonth } = this.props;
        if (fromMonth && date < startOfJalaliMonth(fromMonth)) {
            return true;
        }
        if (typeof disabledDays === "function") {
            return !!disabledDays(date);
        }
        return false;
    }

    renderDay(date, day) {
        const disabled = this.isDisabled(date);
        const selected = this.isSelected(date);
        const className = "DayPicker-Day"
            + (selected ? " DayPicker-Day--selected" : "")
            + (disabled ? " DayPicker-Day--disabled" : "");
        return <button
            type="button"
            key={day}
            className={className}
            disabled={disabled}
            aria-selected={selected}
            onClick={() => !disabled && this.props.onDayClick(date, { disabled })}>
            {day}
        </button>;
    }

    render() {
        const jalaliMonth = toJalali(this.state.month);
        const firstDay = toGregorianDate(jalaliMonth.jy, jalaliMonth.jm, 1, this.state.month);
        const nextMonth = addJalaliMonths(firstDay, 1);
        const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() - 1);
        const monthLength = toJalali(lastDay).jd;
        const leadingCells = (firstDay.getDay() + 1) % 7;
        const cells = [];
        const firstAllowedMonth = this.props.fromMonth ? startOfJalaliMonth(this.props.fromMonth) : null;
        const previousMonthDisabled = firstAllowedMonth && this.state.month <= firstAllowedMonth;

        for (let i = 0; i < leadingCells; i++) {
            cells.push(<span className="DayPicker-Day DayPicker-Day--outside" key={`empty-${i}`} />);
        }
        for (let day = 1; day <= monthLength; day++) {
            cells.push(this.renderDay(toGregorianDate(jalaliMonth.jy, jalaliMonth.jm, day, this.state.month), day));
        }

        return <div className="DayPicker" dir="rtl">
            <div className="DayPicker-NavBar">
                <button type="button" disabled={previousMonthDisabled} className="DayPicker-NavButton DayPicker-NavButton--prev" onClick={() => !previousMonthDisabled && this.moveMonth(-1)}>ماه قبل</button>
                <button type="button" className="DayPicker-NavButton DayPicker-NavButton--next" onClick={() => this.moveMonth(1)}>ماه بعد</button>
            </div>
            <div className="DayPicker-Caption">{PERSIAN_MONTHS[jalaliMonth.jm - 1]} {jalaliMonth.jy}</div>
            <div className="DayPicker-Weekdays">
                <div className="DayPicker-WeekdaysRow">
                    {PERSIAN_WEEKDAYS.map(day => <div className="DayPicker-Weekday" key={day}>{day}</div>)}
                </div>
            </div>
            <div className="DayPicker-Body">
                <div className="DayPicker-Week">{cells}</div>
            </div>
        </div>;
    }
}

PersianDayPicker.propTypes = {
    disabledDays: PropTypes.func,
    fromMonth: PropTypes.instanceOf(Date),
    initialMonth: PropTypes.instanceOf(Date),
    month: PropTypes.instanceOf(Date),
    onDayClick: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    selectedDays: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.array, PropTypes.func])
};

export default PersianDayPicker;
// END persian-dnnsoftware
