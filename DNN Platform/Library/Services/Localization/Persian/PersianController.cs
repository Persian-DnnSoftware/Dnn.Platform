// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information

namespace DotNetNuke.Services.Localization.Persian;

using System;
using System.Globalization;
using System.Reflection;

public class PersianController /* Persian-DnnSoftware make class public */
{
    public static CultureInfo GetPersianCultureInfo()
    {
        var persianCultureInfo = new CultureInfo("fa-IR");

        SetPersianDateTimeFormatInfo(persianCultureInfo.DateTimeFormat);
        SetNumberFormatInfo(persianCultureInfo.NumberFormat);

        var cal = new PersianCalendar();

        FieldInfo fieldInfo = persianCultureInfo.GetType().GetField("calendar", BindingFlags.NonPublic | BindingFlags.Instance);
        if (fieldInfo != null)
        {
            fieldInfo.SetValue(persianCultureInfo, cal);
        }

        FieldInfo info = persianCultureInfo.DateTimeFormat.GetType().GetField("calendar", BindingFlags.NonPublic | BindingFlags.Instance);
        if (info != null)
        {
            info.SetValue(persianCultureInfo.DateTimeFormat, cal);
        }

        return persianCultureInfo;
    }

    public static void SetPersianDateTimeFormatInfo(DateTimeFormatInfo persianDateTimeFormatInfo)
    {
        persianDateTimeFormatInfo.MonthNames = new[] { "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند", string.Empty };
        persianDateTimeFormatInfo.MonthGenitiveNames = persianDateTimeFormatInfo.MonthNames;
        persianDateTimeFormatInfo.AbbreviatedMonthNames = persianDateTimeFormatInfo.MonthNames;
        persianDateTimeFormatInfo.AbbreviatedMonthGenitiveNames = persianDateTimeFormatInfo.MonthNames;

        persianDateTimeFormatInfo.DayNames = new[] { "یکشنبه", "دوشنبه", "ﺳﻪشنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه" };
        persianDateTimeFormatInfo.AbbreviatedDayNames = new[] { "ی", "د", "س", "چ", "پ", "ج", "ش" };
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

    public static void SetNumberFormatInfo(NumberFormatInfo persianNumberFormatInfo)
    {
        /* START Persian-DnnSoftware */
        // persianNumberFormatInfo.NumberDecimalSeparator = "/";
        // persianNumberFormatInfo.DigitSubstitution = DigitShapes.NativeNational;
        // persianNumberFormatInfo.NumberNegativePattern = 0;
        persianNumberFormatInfo.NumberDecimalSeparator = ".";
        persianNumberFormatInfo.CurrencySymbol = string.Empty;
        persianNumberFormatInfo.CurrencyDecimalDigits = 0;
        /* END Persian-DnnSoftware */
    }

    public static CultureInfo GetGregorianCultureInfo(string cultureCode) /* Persian-DnnSoftware */
    {
        var gregorianCultureInfo = new CultureInfo(cultureCode);

        var cal = new GregorianCalendar();

        FieldInfo fieldInfo = gregorianCultureInfo.GetType().GetField("calendar", BindingFlags.NonPublic | BindingFlags.Instance);
        if (fieldInfo != null)
        {
            fieldInfo.SetValue(gregorianCultureInfo, cal);
        }

        FieldInfo info = gregorianCultureInfo.DateTimeFormat.GetType().GetField("calendar", BindingFlags.NonPublic | BindingFlags.Instance);
        if (info != null)
        {
            info.SetValue(gregorianCultureInfo.DateTimeFormat, cal);
        }

        return gregorianCultureInfo;
    }

    /* START Persian-DnnSoftware */
    public static CultureInfo NewCultureInfo(string cultureCode)
    {
        if (string.IsNullOrEmpty(cultureCode))
        {
            return null;
        }

        if (cultureCode.StartsWith("fa-"))
        {
            CultureInfo persianCultureInfo = GetPersianCultureInfo();
            return persianCultureInfo;
        }

        if (cultureCode.StartsWith("ar-"))
        {
            /* START Persian-DnnSoftware */
            CultureInfo gregorianCultureInfo = GetGregorianCultureInfo(cultureCode);
            /* END Persian-DnnSoftware */
            return gregorianCultureInfo;
        }

        return new CultureInfo(cultureCode, false);
    }

    public static CultureInfo NewCultureInfo(CultureInfo cultureInfo)
    {
        if (cultureInfo != null)
        {
            if (cultureInfo.Name.StartsWith("fa-"))
            {
                CultureInfo persianCultureInfo = GetPersianCultureInfo();
                return persianCultureInfo;
            }

            if (cultureInfo.Name.StartsWith("ar-"))
            {
                /* START Persian-DnnSoftware */
                CultureInfo gregorianCultureInfo = GetGregorianCultureInfo(cultureInfo.Name);
                /* END Persian-DnnSoftware */
                return gregorianCultureInfo;
            }

            return cultureInfo;
        }

        return cultureInfo;
    }

    public static void InvokePersianRadCalendar(System.Web.UI.Page page)
    {
        if (page == null)
        {
            page = (System.Web.UI.Page)System.Web.HttpContext.Current.Handler;
        }

        string script = "<script type=\"text/javascript\">";
        script += "$(document).ready(function () { if ($('div').hasClass('RadPicker')) {";
        script += string.Format("$(\"#Body\").append(\"<script src='{0}' type='text/javascript'><\\/script>\");", DotNetNuke.UI.Utilities.ClientAPI.ScriptPath + "PersianRadCalendar.js");
        script += "}});";
        script += "</script>";
        DotNetNuke.UI.Utilities.ClientAPI.RegisterStartUpScript(page, "shamsiRadPicker", script);
    }

    public static void InvokePersianRadEditor(System.Web.UI.Page page)
    {
        if (page == null)
        {
            page = (System.Web.UI.Page)System.Web.HttpContext.Current.Handler;
        }

        string script = "<script type=\"text/javascript\">";
        script += "$(document).ready(function () { if ($('div').hasClass('RadEditor')) {";
        script += string.Format("$(\"#Body\").append(\"<script src='{0}' type='text/javascript'><\\/script>\");", DotNetNuke.UI.Utilities.ClientAPI.ScriptPath + "PersianRadEditor.js");
        script += "}});";
        script += "</script>";
        DotNetNuke.UI.Utilities.ClientAPI.RegisterStartUpScript(page, "shamsiRadEditor", script);
    }

    public static void ChangeDateTimeFormatToEnglish()
    {
        CultureInfo info = new CultureInfo("en-US");
        DateTimeFormatInfo dateTimeFormat = info.DateTimeFormat;
        dateTimeFormat.AMDesignator = "AM";
        dateTimeFormat.PMDesignator = "PM";
        dateTimeFormat.ShortDatePattern = "MM/dd/yyyy";
        CultureInfo.CurrentCulture.DateTimeFormat = dateTimeFormat;
        CultureInfo.CurrentUICulture.DateTimeFormat = dateTimeFormat;
    }

    /* END Persian-DnnSoftware */
}
