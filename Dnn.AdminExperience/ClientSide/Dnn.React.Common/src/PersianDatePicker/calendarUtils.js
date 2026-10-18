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
    return d2j(g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
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
    const numericMonth = Number(month);
    if (numericMonth <= 6) {
        return 31;
    }
    if (numericMonth <= 11) {
        return 30;
    }
    return isLeapJalaliYear(year) ? 30 : 29;
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

export function addJalaliMonths(date, amount) {
    const value = toJalali(date || new Date());
    let monthIndex = value.jy * 12 + value.jm - 1 + amount;
    const jy = Math.floor(monthIndex / 12);
    const jm = mod(monthIndex, 12) + 1;
    const jd = Math.min(value.jd, getJalaliMonthLength(jy, jm));
    return toGregorianDate(jy, jm, jd, date);
}

export function startOfJalaliMonth(date) {
    const value = toJalali(date || new Date());
    return toGregorianDate(value.jy, value.jm, 1, date);
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
