// START persian-dnnsoftware
import React from "react";
import GregorianDatePicker from "../DatePicker";
import PersianDatePicker from "../PersianDatePicker";
import { isPersianCulture } from "../PersianDatePicker/calendarUtils";

const LocalizedDatePicker = props => isPersianCulture()
    ? <PersianDatePicker {...props} />
    : <GregorianDatePicker {...props} />;

export default LocalizedDatePicker;
// END persian-dnnsoftware
