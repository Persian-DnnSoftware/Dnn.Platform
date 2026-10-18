// START persian-dnnsoftware
import React from "react";
import * as dayjs from "dayjs";
import { GregorianDatePicker } from "../DatePicker";
import TimePicker from "../DatePicker/TimePicker";
import TimezonePicker from "../DatePicker/TimezonePicker";
import CalendarIcon from "../DatePicker/img/calendar.svg";
import CalendarEndIcon from "../DatePicker/img/calendar_end.svg";
import CalendarStartIcon from "../DatePicker/img/calendar_start.svg";
import PersianDayPicker from "./PersianDayPicker";
import PersianDateInput from "./PersianDateInput";
import { formatJalaliDate, isSameDay } from "./calendarUtils";
import "./style.less";

const clearButtonStyleVisible = { transition: "300ms", marginRight: 0, opacity: 1 };
const clearButtonStyleInvisible = { transition: "300ms", marginRight: 0, opacity: 0, cursor: "default" };

/**
 * Jalali UI adapter for the stable DatePicker API. Public values remain native
 * Gregorian Date instances; only presentation and manual entry are Jalali.
 */
class PersianDatePicker extends GregorianDatePicker {
    renderDateInput(date, updateDate) {
        return <div style={{ float: "right" }}>
            <PersianDateInput date={date} onUpdateDate={updateDate} />
            {this.props.hasTimePicker && date && <span>&nbsp;{dayjs(date).format("LT")}</span>}
        </div>;
    }

    render() {
        this.date = this.state.Date.FirstDate;
        this.secondDate = this.state.Date.SecondDate;
        let firstDate = this.date;
        let secondDate = this.secondDate;
        let displayFirstDate = firstDate ? formatJalaliDate(new Date(firstDate)) : "";
        let displaySecondDate = secondDate ? formatJalaliDate(new Date(secondDate)) : "";
        if (this.props.hasTimePicker) {
            displayFirstDate += displayFirstDate ? ` ${dayjs(firstDate).format("LT")}` : "";
            displaySecondDate += displaySecondDate ? ` ${dayjs(secondDate).format("LT")}` : "";
        }
        let displayDate = displayFirstDate;
        if (this.props.isDateRange && secondDate) {
            displayDate += ` - ${displaySecondDate}`;
        }

        const showButton = !!this.props.isDateRange || !!this.props.hasTimePicker;
        const calendarClassName = `calendar-container ${this.getPositionCss()} ${this.state.isCalendarVisible ? "visible" : "invisible"}`;
        firstDate = firstDate ? new Date(firstDate) : null;
        secondDate = secondDate ? new Date(secondDate) : null;
        const showIcon = this.props.showIcon !== false;
        const showInput = this.props.showInput !== false;
        let Icon = this.props.mode === "start" ? CalendarStartIcon : this.props.mode === "end" ? CalendarEndIcon : CalendarIcon;
        if (this.props.icon) { Icon = this.props.icon; }
        const style = this.props.isDateRange && this.props.hasTimePicker ? { width: 380 } : {};
        const buttonStyle = this.props.isDateRange ? {} : { margin: "10px auto", float: "none" };
        const inputClassName = `calendar-text${this.props.hasTimePicker ? " with-time-picker" : ""}`;
        const showClearDates = !!this.props.isDateRange && this.props.showClearDates;
        const clearButtonStyle = this.state.Date.FirstDate || this.state.Date.SecondDate
            ? clearButtonStyleVisible : clearButtonStyleInvisible;

        return <div className="dnn-day-picker persian-day-picker" ref={this.dayPickerRef}>
            {showInput && <div className={inputClassName} style={style} onClick={this.showCalendar.bind(this)}>
                {this.props.prependWith && <span>{this.props.prependWith}</span>}
                {this.props.showClearDateButton && <div className="clear-button" onClick={this.clearDates.bind(this)}>×</div>}
                {this.props.isInputReadOnly && displayDate}
                {!this.props.isInputReadOnly && this.renderDateInput(firstDate, this.updateFirstDate.bind(this))}
                {!this.props.isInputReadOnly && this.props.isDateRange && <div>
                    <span>&nbsp; -&nbsp; </span>
                    {this.renderDateInput(secondDate, this.updateSecondDate.bind(this))}
                </div>}
            </div>}
            {showIcon && <div className={`calendar-icon${this.state.isCalendarVisible ? " active" : ""}`} onClick={this.toggleCalendar.bind(this)}><Icon /></div>}
            <div className={calendarClassName} style={this.getStyle()} ref={element => this.calendarContainer = element}>
                <div>
                    <PersianDayPicker initialMonth={firstDate || new Date()} selectedDays={day => isSameDay(firstDate, day)} onDayClick={this.firstDateClick} disabledDays={this.firstDisableDates.bind(this)} />
                    <div className="dnn-time-picker-box">
                        {this.props.hasTimePicker && <TimePicker updateTime={this.updateFirstTime.bind(this)} time={this.formatDate(this.date, "LT")} className={this.props.hasTimezonePicker ? "half" : "full"} />}
                        {this.props.hasTimezonePicker && <TimezonePicker onUpdate={this.updateTimezone.bind(this)} value={this.state.timezone} />}
                    </div>
                </div>
                {this.props.isDateRange && <div>
                    <PersianDayPicker initialMonth={secondDate || new Date()} selectedDays={day => isSameDay(secondDate, day)} onDayClick={this.secondDateClick} disabledDays={this.secondDisableDates.bind(this)} />
                    {this.props.hasTimePicker && <TimePicker updateTime={this.updateSecondTime.bind(this)} time={this.formatDate(this.secondDate, "LT")} />}
                </div>}
                {showButton && <button style={buttonStyle} role="primary" onClick={this.apply.bind(this)}>{this.props.applyButtonText || "اعمال"}</button>}
                {showClearDates && <button role="secondary" style={clearButtonStyle} onClick={this.onClearDatesPressed.bind(this)}>پاک کردن</button>}
            </div>
        </div>;
    }
}

export default PersianDatePicker;
export { PersianDayPicker };
// END persian-dnnsoftware
