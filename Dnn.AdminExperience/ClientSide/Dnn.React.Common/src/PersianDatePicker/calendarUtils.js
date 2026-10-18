// START persian-dnnsoftware
// Jalali conversion routines are based on the well-tested algorithm used by
// jalaali-js (MIT). Keeping the small conversion layer local avoids changing
// the public DatePicker contract or adding a runtime dependency to Persona Bar.
// توابع تبدیل جلالی بر اساس الگوریتم آزموده‌شده jalaali-js با مجوز MIT هستند.
// محلی نگه‌داشتن این لایه کوچک تبدیل، از تغییر قرارداد عمومی DatePicker یا
// افزودن وابستگی زمان اجرا به Persona Bar جلوگیری می‌کند.

const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
    1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];

const div = (a, b) => ~~(a / b);
const mod = (a, b) => a - ~~(a / b) * b;

function jalCal(jy, withoutLeap) {
    const bl = breaks.length;
    const gy = jy + 621;
    let leapJ = -14;
    let jp = breaks[0];
    let jump = 0;

    if (jy < jp || jy >= breaks[bl - 1]) {
        throw new Error(`Invalid Jalali year ${jy}`);
    }

    for (let i = 1; i < bl; i++) {
        const jm = breaks[i];
        jump = jm - jp;
        if (jy < jm) {
            break;
        }
        leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
    }

    let n = jy - jp;
    leapJ += div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }

    const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    const march = 20 + leapJ - leapG;
    if (withoutLeap) {
        return { gy, march };
    }

    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    let leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return { leap, gy, march };
}

function g2d(gy, gm, gd) {
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
        + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}

function d2g(jdn) {
    let j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    const gd = div(mod(i, 153), 5) + 1;
    const gm = mod(div(i, 153), 12) + 1;
    const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy, gm, gd };
}

function j2d(jy, jm, jd) {
    const r = jalCal(jy, true);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31
        - div(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn) {
    const g = d2g(jdn);
    let jy = g.gy - 621;
    const r = jalCal(jy, false);
    const jdn1f = g2d(g.gy, 3, r.march);
    let k = jdn - jdn1f;
    let jd;
    let jm;

    if (k >= 0) {
        if (k <= 185) {
            jm = 1 + div(k, 31);
            jd = mod(k, 31) + 1;
            return { jy, jm, jd };
        }
        k -= 186;
    } else {
        jy -= 1;
        k += 179;
        if (r.leap === 1) {
            k += 1;
        }
    }
    jm = 7 + div(k, 30);
    jd = mod(k, 30) + 1;
    return { jy, jm, jd };
}

export const PERSIAN_MONTHS = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

export const PERSIAN_WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export function toJalali(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return null;
    }
    try {
        return d2j(g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    } catch (error) {
        return null;
    }
}

export function toGregorianDate(jy, jm, jd, sourceDate) {
    if (!isValidJalaliDate(jy, jm, jd)) {
        return null;
    }
    const g = d2g(j2d(Number(jy), Number(jm), Number(jd)));
    const source = sourceDate instanceof Date && !Number.isNaN(sourceDate.getTime())
        ? sourceDate : new Date();
    return new Date(g.gy, g.gm - 1, g.gd, source.getHours(), source.getMinutes(),
        source.getSeconds(), source.getMilliseconds());
}

export function isLeapJalaliYear(year) {
    try {
        return jalCal(Number(year), false).leap === 0;
    } catch (error) {
        return false;
    }
}

export function getJalaliMonthLength(year, month) {
    const numericYear = Number(year);
    const numericMonth = Number(month);
    if (!Number.isInteger(numericYear) || numericYear < breaks[0]
        || numericYear >= breaks[breaks.length - 1] || !Number.isInteger(numericMonth)
        || numericMonth < 1 || numericMonth > 12) {
        return 0;
    }
    if (numericMonth <= 6) {
        return 31;
    }
    if (numericMonth <= 11) {
        return 30;
    }
    return isLeapJalaliYear(numericYear) ? 30 : 29;
}

export function isValidJalaliDate(year, month, day) {
    const jy = Number(year);
    const jm = Number(month);
    const jd = Number(day);
    return Number.isInteger(jy) && Number.isInteger(jm) && Number.isInteger(jd)
        && jy >= breaks[0] && jy < breaks[breaks.length - 1]
        && jm >= 1 && jm <= 12 && jd >= 1 && jd <= getJalaliMonthLength(jy, jm);
}

export function formatJalaliDate(date) {
    const value = toJalali(date);
    if (!value) {
        return "";
    }
    return `${value.jy}/${String(value.jm).padStart(2, "0")}/${String(value.jd).padStart(2, "0")}`;
}

export function parseJalaliDateTime(value) {
    if (typeof value !== "string") {
        return null;
    }

    const normalizedValue = value
        .replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
        .replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
        .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
        .replace(/[٫،]/g, ".")
        .trim();
    const match = normalizedValue.match(/^(\d{3,4})[\/.\-](\d{1,2})[\/.\-](\d{1,2})(?:[T\s]+(\d{1,2}):(\d{2})(?::(\d{2})(?:[.,](\d{1,3}))?)?\s*(AM|PM|ق\.?\s*ظ|ب\.?\s*ظ)?)?$/i);
    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    let hours = match[4] === undefined ? 0 : Number(match[4]);
    const minutes = match[5] === undefined ? 0 : Number(match[5]);
    const seconds = match[6] === undefined ? 0 : Number(match[6]);
    const milliseconds = match[7] === undefined ? 0 : Number(match[7].padEnd(3, "0"));
    const period = match[8] ? match[8].replace(/\s|\./g, "").toUpperCase() : "";

    if (year < 1200 || year > 1600 || !isValidJalaliDate(year, month, day)
        || minutes > 59 || seconds > 59
        || milliseconds > 999 || hours > (period ? 12 : 23) || (period && hours < 1)) {
        return null;
    }
    if (period === "AM" || period === "قظ") {
        hours = hours === 12 ? 0 : hours;
    } else if (period === "PM" || period === "بظ") {
        hours = hours === 12 ? 12 : hours + 12;
    }

    return toGregorianDate(year, month, day,
        new Date(2000, 0, 1, hours, minutes, seconds, milliseconds));
}

export function addJalaliMonths(date, amount) {
    const source = date || new Date();
    const value = toJalali(source);
    const numericAmount = Number(amount);
    if (!value || !Number.isInteger(numericAmount)) {
        return null;
    }
    const monthIndex = value.jy * 12 + value.jm - 1 + numericAmount;
    const jy = Math.floor(monthIndex / 12);
    const jm = mod(monthIndex, 12) + 1;
    if (jy < breaks[0] || jy >= breaks[breaks.length - 1]) {
        return null;
    }
    const jd = Math.min(value.jd, getJalaliMonthLength(jy, jm));
    return toGregorianDate(jy, jm, jd, source);
}

export function startOfJalaliMonth(date) {
    const source = date || new Date();
    const value = toJalali(source);
    return value ? toGregorianDate(value.jy, value.jm, 1, source) : null;
}

export function isSameDay(first, second) {
    return first instanceof Date && second instanceof Date
        && first.getFullYear() === second.getFullYear()
        && first.getMonth() === second.getMonth()
        && first.getDate() === second.getDate();
}

export function isPersianCulture() {
    try {
        return window.parent && window.parent.personaBarSettings
            && window.parent.personaBarSettings.culture === "fa-IR";
    } catch (error) {
        return false;
    }
}
// END persian-dnnsoftware
