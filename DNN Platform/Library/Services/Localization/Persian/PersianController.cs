using DotNetNuke.UI.Utilities;
using System;
using System.Globalization;
using System.Reflection;
using System.Web;
using System.Web.UI;

namespace DotNetNuke.Services.Localization.Persian
{
    public class PersianController
    {
        public static CultureInfo GetPersianCultureInfo()
        {
            CultureInfo cultureInfo = new CultureInfo("fa-IR");
            SetPersianDateTimeFormatInfo(cultureInfo.DateTimeFormat);
            SetNumberFormatInfo(cultureInfo.NumberFormat);
            PersianCalendar value = new PersianCalendar();
            FieldInfo field = cultureInfo.GetType().GetField("calendar", BindingFlags.Instance | BindingFlags.NonPublic);
            if (field != null)
            {
                field.SetValue(cultureInfo, value);
            }
            FieldInfo field2 = cultureInfo.DateTimeFormat.GetType().GetField("calendar", BindingFlags.Instance | BindingFlags.NonPublic);
            if (field2 != null)
            {
                field2.SetValue(cultureInfo.DateTimeFormat, value);
            }
            return cultureInfo;
        }

        public static void SetPersianDateTimeFormatInfo(DateTimeFormatInfo persianDateTimeFormatInfo)
        {
            persianDateTimeFormatInfo.MonthNames = new string[13]
            {
                "فروردین",
                "اردیبهشت",
                "خرداد",
                "تیر",
                "مرداد",
                "شهریور",
                "مهر",
                "آبان",
                "آذر",
                "دی",
                "بهمن",
                "اسفند",
                ""
            };
            persianDateTimeFormatInfo.MonthGenitiveNames = persianDateTimeFormatInfo.MonthNames;
            persianDateTimeFormatInfo.AbbreviatedMonthNames = persianDateTimeFormatInfo.MonthNames;
            persianDateTimeFormatInfo.AbbreviatedMonthGenitiveNames = persianDateTimeFormatInfo.MonthNames;
            persianDateTimeFormatInfo.DayNames = new string[7]
            {
                "یکشنبه",
                "دوشنبه",
                "ﺳﻪشنبه",
                "چهارشنبه",
                "پنجشنبه",
                "جمعه",
                "شنبه"
            };
            persianDateTimeFormatInfo.AbbreviatedDayNames = new string[7]
            {
                "ی",
                "د",
                "س",
                "چ",
                "پ",
                "ج",
                "ش"
            };
            persianDateTimeFormatInfo.ShortestDayNames = persianDateTimeFormatInfo.AbbreviatedDayNames;
            persianDateTimeFormatInfo.FirstDayOfWeek = DayOfWeek.Saturday;
            persianDateTimeFormatInfo.AMDesignator = "ق.ظ";
            persianDateTimeFormatInfo.PMDesignator = "ب.ظ";
            persianDateTimeFormatInfo.DateSeparator = "/";
            persianDateTimeFormatInfo.TimeSeparator = ":";
            persianDateTimeFormatInfo.FullDateTimePattern = "tt hh:mm:ss yyyy mmmm dd dddd";
            persianDateTimeFormatInfo.YearMonthPattern = "yyyy, MMMM";
            persianDateTimeFormatInfo.MonthDayPattern = "dd MMMM";
            persianDateTimeFormatInfo.LongDatePattern = "dddd, dd MMMM,yyyy";
            persianDateTimeFormatInfo.ShortDatePattern = "yyyy/MM/dd";
            persianDateTimeFormatInfo.LongTimePattern = "hh:mm:ss tt";
            persianDateTimeFormatInfo.ShortTimePattern = "hh:mm tt";
        }

        public static CultureInfo GetGregorianCultureInfo()
        {
            CultureInfo cultureInfo = new CultureInfo("ar-SA");
            GregorianCalendar value = new GregorianCalendar();
            FieldInfo field = cultureInfo.GetType().GetField("calendar", BindingFlags.Instance | BindingFlags.NonPublic);
            if (field != null)
            {
                field.SetValue(cultureInfo, value);
            }
            FieldInfo field2 = cultureInfo.DateTimeFormat.GetType().GetField("calendar", BindingFlags.Instance | BindingFlags.NonPublic);
            if (field2 != null)
            {
                field2.SetValue(cultureInfo.DateTimeFormat, value);
            }
            return cultureInfo;
        }

        public static void SetNumberFormatInfo(NumberFormatInfo persianNumberFormatInfo)
        {
            persianNumberFormatInfo.NumberDecimalSeparator = ".";
            persianNumberFormatInfo.CurrencySymbol = "";
            persianNumberFormatInfo.CurrencyDecimalDigits = 0;
        }

        public static CultureInfo NewCultureInfo(string cultureCode)
        {
            if (string.IsNullOrEmpty(cultureCode))
            {
                return null;
            }
            if (cultureCode.StartsWith("fa-"))
            {
                return GetPersianCultureInfo();
            }
            if (cultureCode.StartsWith("ar-"))
            {
                return GetGregorianCultureInfo();
            }
            return new CultureInfo(cultureCode, useUserOverride: false);
        }

        public static CultureInfo NewCultureInfo(CultureInfo cultureInfo)
        {
            if (cultureInfo != null)
            {
                if (cultureInfo.Name.StartsWith("fa-"))
                {
                    return GetPersianCultureInfo();
                }
                if (cultureInfo.Name.StartsWith("ar-"))
                {
                    return GetGregorianCultureInfo();
                }
                return cultureInfo;
            }
            return cultureInfo;
        }

        public static void InvokePersianRadCalendar(Page page)
        {
            if (page == null)
            {
                page = (Page)HttpContext.Current.Handler;
            }
            string str = "<script type=\"text/javascript\">";
            str += "$(document).ready(function () { if ($('div').hasClass('RadPicker')) {";
            str += string.Format("$(\"#Body\").append(\"<script src='{0}' type='text/javascript'><\\/script>\");", ClientAPI.ScriptPath + "PersianRadCalendar.js");
            str += "}});";
            str += "</script>";
            ClientAPI.RegisterStartUpScript(page, "shamsiRadPicker", str);
        }

        public static void InvokePersianRadEditor(Page page)
        {
            if (page == null)
            {
                page = (Page)HttpContext.Current.Handler;
            }
            string str = "<script type=\"text/javascript\">";
            str += "$(document).ready(function () { if ($('div').hasClass('RadEditor')) {";
            str += string.Format("$(\"#Body\").append(\"<script src='{0}' type='text/javascript'><\\/script>\");", ClientAPI.ScriptPath + "PersianRadEditor.js");
            str += "}});";
            str += "</script>";
            ClientAPI.RegisterStartUpScript(page, "shamsiRadEditor", str);
        }

        public static void ChangeDateTimeFormatToEnglish()
        {
            CultureInfo cultureInfo = new CultureInfo("en-US");
            DateTimeFormatInfo dateTimeFormat = cultureInfo.DateTimeFormat;
            dateTimeFormat.AMDesignator = "AM";
            dateTimeFormat.PMDesignator = "PM";
            dateTimeFormat.ShortDatePattern = "MM/dd/yyyy";
            CultureInfo.CurrentCulture.DateTimeFormat = dateTimeFormat;
            CultureInfo.CurrentUICulture.DateTimeFormat = dateTimeFormat;
        }
    }
}
