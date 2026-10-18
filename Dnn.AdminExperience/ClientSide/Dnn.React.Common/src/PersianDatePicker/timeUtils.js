// START persian-dnnsoftware
export function formatTime(date) {
    const value = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(value.getTime())) {
        return "";
    }

    const hours = value.getHours();
    const displayHours = hours === 0 ? 0 : hours > 12 ? hours - 12 : hours;
    const period = hours >= 12 ? "PM" : "AM";
    return `${String(displayHours).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")} ${period}`;
}

export function formatGregorianDate(date) {
    const value = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(value.getTime())) {
        return "";
    }

    return `${String(value.getMonth() + 1).padStart(2, "0")}/${String(value.getDate()).padStart(2, "0")}/${value.getFullYear()}`;
}

export function applyTime(date, time) {
    const value = date instanceof Date ? new Date(date.getTime()) : new Date(date);
    if (Number.isNaN(value.getTime()) || typeof time !== "string") {
        return null;
    }

    const match = time.trim().match(/^(0?\d|1[0-2]):([0-5]\d)\s*(AM|PM)$/i);
    if (!match) {
        return null;
    }

    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const period = match[3].toUpperCase();
    if (hours > 12) {
        return null;
    }
    if (period === "AM") {
        hours = hours === 12 ? 0 : hours;
    } else {
        hours = hours === 12 ? 12 : hours + 12;
    }

    value.setHours(hours, minutes);
    return value;
}
// END persian-dnnsoftware
