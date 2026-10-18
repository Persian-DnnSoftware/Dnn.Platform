// START persian-dnnsoftware
import React from "react";
import GregorianDatePicker from "../DatePicker";
import PersianDatePicker from "../PersianDatePicker";
import { isPersianCulture, parseJalaliDateTime } from "../PersianDatePicker/calendarUtils";

const normalizePersianDate = value => {
    if (!value) {
        return value;
    }
    const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
    if (!Number.isNaN(date.getTime()) && date.getFullYear() >= 1970) {
        return date;
    }
    return parseJalaliDateTime(value.toString());
};

const LocalizedDatePicker = props => {
    if (!isPersianCulture()) {
        return <GregorianDatePicker {...props} />;
    }
    const normalizedProps = {
        ...props,
        date: normalizePersianDate(props.date),
        secondDate: normalizePersianDate(props.secondDate),
        minDate: normalizePersianDate(props.minDate),
        maxDate: normalizePersianDate(props.maxDate),
        minSecondDate: normalizePersianDate(props.minSecondDate),
        maxSecondDate: normalizePersianDate(props.maxSecondDate)
    };
    return <PersianDatePicker {...normalizedProps} />;
};

export default LocalizedDatePicker;
// END persian-dnnsoftware
