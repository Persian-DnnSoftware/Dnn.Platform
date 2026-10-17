<%@ Control Language="C#" AutoEventWireup="false" Inherits="DotNetNuke.Modules.Admin.Modules.ModuleSettingsPage" Codebehind="Modulesettings.ascx.cs" %>
<%@ Register TagPrefix="dnn" TagName="URL" Src="~/controls/DnnUrlControl.ascx" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Security.Permissions.Controls" Assembly="DotNetNuke" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.UI.WebControls" Assembly="DotNetNuke" %>

<%@ Register TagPrefix="dnnweb" Namespace="DotNetNuke.Web.UI.WebControls.Internal" Assembly="DotNetNuke.Web" %>
<%@ Register TagPrefix="dnn" TagName="Audit" Src="~/controls/ModuleAuditControl.ascx" %>
<%@ Register TagPrefix="dnnweb" Assembly="DotNetNuke.Web" Namespace="DotNetNuke.Web.UI.WebControls" %>
<div class="dnnForm dnnModuleSettings dnnClear" id="dnnModuleSettings">
    <ul class="dnnAdminTabNav dnnClear">
        <li><a href="#msModuleSettings"><%=LocalizeString("ModuleSettings")%></a></li>
        <li><a href="#msPermissions"><%=LocalizeString("Permissions")%></a></li>
        <li><a href="#msPageSettings"><%=LocalizeString("PageSettings")%></a></li>
        <li id="specificSettingsTab" runat="server">
            <asp:HyperLink href="#msSpecificSettings" ID="hlSpecificSettings" runat="server" ViewStateMode="Disabled" />
        </li>
    </ul>
    <div class="msModuleSettings dnnClear" id="msModuleSettings">
        <div class="dnnFormExpandContent">
            <a href=""><%=Localization.GetString("ExpandAll", Localization.SharedResourceFile)%></a>
        </div>
        <div class="msmsContent dnnClear">
            <h2 id="dnnPanel-ModuleGeneralDetails" class="dnnFormSectionHead"><a href="" class="dnnSectionExpanded"><%=LocalizeString("GeneralDetails")%></a></h2>
            <fieldset>
                <div class="dnnFormItem">
                    <dnn:label id="plModuleId" runat="server" controlname="ltModuleId" />
                    <span><asp:Literal ID="ltModuleId" runat="server"></asp:Literal></span>
                </div>
                <div class="dnnFormItem" id="cultureRow" runat="server">
                    <dnn:label id="cultureLabel" runat="server" controlname="cultureLanguageLabel" />
                    <dnnweb:dnnlanguagelabel id="cultureLanguageLabel" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plFriendlyName" runat="server" controlname="txtFriendlyName" />
                    <asp:TextBox ID="txtFriendlyName" runat="server" Enabled="False" ViewStateMode="Disabled" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plTitle" runat="server" controlname="txtTitle" />
                    <asp:TextBox ID="txtTitle" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plTags" runat="server" controlname="termsSelector" />
                    <dnnweb:termsselector id="termsSelector" runat="server" height="250px" width="525px" IncludeTags="false" />
                </div>
            </fieldset>
            <h2 id="dnnPanel-ModuleSecuritySettings" class="dnnFormSectionHead"><a href="" class="dnnSectionExpanded"><%=LocalizeString("Security")%></a></h2>
            <fieldset>
                <div class="dnnFormItem" id="rowAllTabs" runat="server" ViewStateMode="Disabled">
                    <dnn:label id="plAllTabs" runat="server" controlname="chkAllTabs" />
                    <asp:CheckBox ID="chkAllTabs" runat="server" AutoPostBack="true" ViewStateMode="Enabled" />
                </div>
                <div class="dnnFormItem" id="trnewPages" runat="server" ViewStateMode="Disabled">
                    <dnn:label id="plNewTabs" runat="server" controlname="chkNewTabs" />
                    <asp:CheckBox ID="chkNewTabs" runat="server" />
                </div>               
				<div class="dnnFormItem" id="allowIndexRow" runat="server">
					<dnn:Label ID="AllowIndexLabel" runat="server" ControlName="chkAllowIndex" />
					<asp:CheckBox ID="chkAllowIndex" runat="server" />
				</div>  
                <div id="isShareableRow" runat="server" Visible="False" class="dnnFormItem" ViewStateMode="Disabled">
                    <dnn:label id="isShareableLabel" runat="server" controlname="isShareableCheckBox" />
                    <asp:CheckBox ID="isShareableCheckBox" runat="server"/>
                </div>
                <div id="isShareableRowViewOnly" class="dnnFormItem">
                    <dnn:label id="isShareableViewOnlyLabel" runat="server" controlname="isShareableViewOnlyCheckBox" />
                    <asp:CheckBox ID="isShareableViewOnlyCheckBox" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plAdminBorder" runat="server" controlname="chkAdminBorder" />
                    <asp:CheckBox ID="chkAdminBorder" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plHeader" runat="server" controlname="txtHeader" />
                    <asp:TextBox ID="txtHeader" runat="server" TextMode="MultiLine" Rows="6" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plFooter" runat="server" controlname="txtFooter" />
                    <asp:TextBox ID="txtFooter" runat="server" TextMode="MultiLine" Rows="6" />
                </div>
                <%-- START persian-dnnsoftware --%>
                <div class="dnnFormItem">
                    <dnn:label id="plStartDate" runat="server" controlname="startDatePicker" />
                    <asp:TextBox id="startDatePicker" runat="server" TextMode="Date" ViewStateMode="Disabled" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plEndDate" runat="server" controlname="endDatePicker" />
                    <asp:TextBox id="endDatePicker" runat="server" TextMode="Date" ViewStateMode="Disabled" />
                    
                </div>
				<div class="dnnFormItem">
					<asp:CustomValidator runat="server" ControlToValidate="endDatePicker" ClientValidationFunction="compareDate" ValidateEmptyText="true" OnServerValidate="ValidateModuleDates" 
						Display="Dynamic" resourcekey="valEndDate2.ErrorMessage" CompareControl="startDatePicker"
                        CssClass="dnnFormMessage dnnFormError"></asp:CustomValidator>
				</div>
                <%-- EDN persian-dnnsoftware --%>
                <div class="dnnFormItem">
                    <dnn:label id="plMoniker" runat="server" controlname="txtMoniker" />
                    <asp:TextBox ID="txtMoniker" runat="server" MaxLength="100" />
                </div>
            </fieldset>
            <h2 id="dnnPanel-ModuleAdditionalPages" class="dnnFormSectionHead">
                <a href="" class="dnnSectionExpanded">
                    <%=LocalizeString("ModuleInstalledOn")%></a></h2>
            <fieldset>
                <div>
                    <div class="dnnFormItem">
                        <dnnweb:DnnGrid ID="dgOnTabs" runat="server" AutoGenerateColumns="False" AllowPaging="true" PageSize="20" ViewStateMode="Disabled" OnPageIndexChanging="dgOnTabs_PageIndexChanging">
                            <PagerStyle CssClass = "dnn-grid-pager" />
                                <Columns>
                                    <dnnweb:DnnGridTemplateColumn HeaderText="Site" HeaderStyle-Width="150px">
                                        <ItemTemplate>
                                            <%#GetInstalledOnSite(Container.DataItem)%>
                                        </ItemTemplate>
                                    </dnnweb:DnnGridTemplateColumn>
                                    <dnnweb:DnnGridTemplateColumn HeaderText="Page">
                                        <ItemTemplate>
                                            <%#GetInstalledOnLink(Container.DataItem)%>
                                        </ItemTemplate>
                                    </dnnweb:DnnGridTemplateColumn>
                                </Columns>
                                <EmptyDataTemplate>
                                    <div class="dnnFormMessage dnnFormWarning">
                                        <asp:Label ID="lblNoRecords" runat="server" resourcekey="lblNoRecords" />
                                    </div>
                                </EmptyDataTemplate>
                        </dnnweb:DnnGrid>
                    </div>   
                </div>
            </fieldset>
        </div>
    </div>
    <div class="msPermissions dnnClear" id="msPermissions">
        <div class="mspContent dnnClear">
            <fieldset>
                <div id="permissionsRow" runat="server">
                    <dnn:modulepermissionsgrid id="dgPermissions" runat="server" />
                    <div class="dnnClear"></div>
                    <asp:CheckBox ID="chkInheritPermissions" Visible="false" AutoPostBack="true" runat="server" resourcekey="InheritPermissions" />
                </div>
            </fieldset>
        </div>
    </div>
    <div class="msPageSettings dnnClear" id="msPageSettings">
        <div class="dnnFormExpandContent">
            <a href="">
                <%=Localization.GetString("ExpandAll", Localization.SharedResourceFile)%></a></div>
        <div class="mspsContent dnnClear">
            <h2 id="dnnPanel-ModuleAppearance" class="dnnFormSectionHead">
                <a href="" class="dnnSectionExpanded">
                    <%=LocalizeString("Appearance")%></a></h2>
            <fieldset>
                <div class="dnnFormItem">
                    <dnn:label id="plIcon" runat="server" controlname="ctlIcon" />
                    <div class="dnnLeft">
                        <dnn:url id="ctlIcon" runat="server" showimages="true" showurls="False" showtabs="False"
                            showlog="False" showtrack="false" required="False" shownone="true" />
                    </div>
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plAlign" runat="server" controlname="cboAlign" />
                    
                        <asp:RadioButtonList ID="cboAlign" CssClass="dnnFormRadioButtons" runat="server"
                            RepeatLayout="Flow">
                            <asp:ListItem resourcekey="Left" Value="left" />
                            <asp:ListItem resourcekey="Center" Value="center" />
                            <asp:ListItem resourcekey="Right" Value="right" />
                            <asp:ListItem resourcekey="Not_Specified" Value="" />
                        </asp:RadioButtonList>
                   
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plColor" runat="server" controlname="txtColor" />
                    <asp:TextBox ID="txtColor" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plBorder" runat="server" controlname="txtBorder" />
                    <asp:TextBox ID="txtBorder" runat="server" MaxLength="1" />
                    <asp:CompareValidator ID="valBorder" ControlToValidate="txtBorder" Operator="DataTypeCheck"
                        Type="Integer" runat="server" Display="Dynamic" resourcekey="valBorder.ErrorMessage"
                        CssClass="dnnFormMessage dnnFormError" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plVisibility" runat="server" controlname="cboVisibility" />
                    <asp:RadioButtonList ID="cboVisibility" CssClass="dnnFormRadioButtons" runat="server"
                        RepeatLayout="Flow">
                        <asp:ListItem resourcekey="Maximized" Value="0" />
                        <asp:ListItem resourcekey="Minimized" Value="1" />
                        <asp:ListItem resourcekey="None" Value="2" />
                    </asp:RadioButtonList>
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plDisplayTitle" runat="server" controlname="chkDisplayTitle" />
                    <asp:CheckBox ID="chkDisplayTitle" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plDisplayPrint" runat="server" controlname="chkDisplayPrint" />
                    <asp:CheckBox ID="chkDisplayPrint" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plDisplaySyndicate" runat="server" controlname="chkDisplaySyndicate" />
                    <asp:CheckBox ID="chkDisplaySyndicate" runat="server" />
                </div>
                <div class="dnnFormItem dnnContainerPreview">
                    <dnn:label id="plModuleContainer" runat="server" controlname="ctlModuleContainer" />
                    <dnnweb:DnnSkinComboBox ID="moduleContainerCombo" runat="server" />
                    <a href="#" class="dnnSecondaryAction">
                        <%=LocalizeString("ContainerPreview")%></a>
                </div>
            </fieldset>
            <h2 id="dnnPanel-ModuleCacheSettings" class="dnnFormSectionHead">
                <a href="" class="dnnSectionExpanded">
                    <%=LocalizeString("CacheSettings")%></a></h2>
            <fieldset>
                <div class="dnnFormItem dnnCacheSettings">
                    <dnn:label id="lblCacheProvider" runat="server" controlname="cboCacheProvider" resourcekey="CacheProvider" />
                    <%--<asp:DropDownList ID="cboCacheProvider" runat="server" AutoPostBack="true" DataValueField="Key"
                        DataTextField="filteredkey" />--%>
                    <dnnweb:DnnComboBox ID="cboCacheProvider" runat="server" AutoPostBack="true" DataValueField="Key" DataTextField="filteredkey" />
                    <asp:Label ID="lblCacheInherited" runat="server" resourceKey="CacheInherited" CssClass="labelCacheInherited" />
                </div>
                <div class="dnnFormItem" id="divCacheDuration" runat="server" visible="false">
                    <asp:Panel ID="cacheWarningRow" runat="server" Class="dnnFormMessage dnnFormWarning">
                        <asp:Label ID="lblCacheDurationWarning" runat="server" ResourceKey="CacheDurationWarning"/>                
                    </asp:Panel>
                    <dnn:label id="lblCacheDuration" runat="server" controlname="txtCacheDuration" resourcekey="CacheDuration" />
                    <asp:TextBox ID="txtCacheDuration" runat="server" class="msCacheDuration"/>
                    <asp:CompareValidator ID="valCacheTime" ControlToValidate="txtCacheDuration" Operator="DataTypeCheck"
                        Type="Integer" runat="server" Display="Dynamic" resourcekey="valCacheTime.ErrorMessage"
                        CssClass="dnnFormMessage dnnFormError" />
                </div>
            </fieldset>
            <h2 id="dnnPanel-ModuleOtherSettings" class="dnnFormSectionHead">
                <a href="" class="dnnSectionExpanded">
                    <%=LocalizeString("OtherSettings")%></a></h2>
            <fieldset>
                <div class="dnnFormItem">
                    <dnn:label id="plDefault" runat="server" controlname="chkDefault" />
                    <asp:CheckBox ID="chkDefault" runat="server" />
                </div>
                <div class="dnnFormItem">
                    <dnn:label id="plAllModules" runat="server" controlname="chkAllModules" />
                    <asp:CheckBox ID="chkAllModules" runat="server" />
                </div>
                <div class="dnnFormItem" id="rowTab" runat="server">
                    <dnn:label id="plTab" runat="server" controlname="cboTab" />
                    <%--<asp:DropDownList ID="cboTab" DataTextField="IndentedTabName" DataValueField="TabId"
                        runat="server" />--%>
                    <dnnweb:DnnComboBox ID="cboTab" DataTextField="IndentedTabName" DataValueField="TabId" runat="server" />
                </div>
            </fieldset>
        </div>
    </div>
    <div class="msSpecificSettings dnnClear" id="msSpecificSettings">
        <div class="mspsContent dnnClear">
            <fieldset id="fsSpecific" runat="server">
                <asp:Panel ID="pnlSpecific" runat="server" />
            </fieldset>
        </div>
    </div>
    <ul class="dnnActions dnnClear">
        <li>
            <asp:LinkButton ID="cmdUpdate" runat="server" CssClass="dnnPrimaryAction" resourcekey="cmdUpdate" /></li>
        <li>
            <asp:LinkButton ID="cmdDelete" runat="server" CssClass="dnnSecondaryAction" resourcekey="cmdDelete"
                CausesValidation="False" /></li>
        <li>
            <asp:HyperLink ID="cancelHyperLink" runat="server" CssClass="dnnSecondaryAction"
                resourcekey="cmdCancel" /></li>
    </ul>
    <div class="dnnmsStat dnnClear">
        <dnn:audit id="ctlAudit" runat="server" ViewStateMode="Disabled" />
    </div>
</div>
<script language="javascript" type="text/javascript">
    /*globals jQuery, window, Sys */
    (function ($, Sys) {
        function setUpDnnModuleSettings() {
            $('#dnnModuleSettings').dnnTabs().dnnPanels();
            $('#msModuleSettings .dnnFormExpandContent a').dnnExpandAll({
                expandText: '<%=Localization.GetSafeJSString("ExpandAll", Localization.SharedResourceFile)%>',
                collapseText: '<%=Localization.GetSafeJSString("CollapseAll", Localization.SharedResourceFile)%>',
                targetArea: '#msModuleSettings'
            });
            $('#msPageSettings .dnnFormExpandContent a').dnnExpandAll({
                expandText: '<%=Localization.GetSafeJSString("ExpandAll", Localization.SharedResourceFile)%>',
                collapseText: '<%=Localization.GetSafeJSString("CollapseAll", Localization.SharedResourceFile)%>',
                targetArea: '#msPageSettings'
            });
            $('#<%= cmdDelete.ClientID %>').dnnConfirm({
                text: '<%= Localization.GetSafeJSString("DeleteItem.Text", Localization.SharedResourceFile) %>',
                yesText: '<%= Localization.GetSafeJSString("Yes.Text", Localization.SharedResourceFile) %>',
                noText: '<%= Localization.GetSafeJSString("No.Text", Localization.SharedResourceFile) %>',
                title: '<%= Localization.GetSafeJSString("Confirm.Text", Localization.SharedResourceFile) %>'
            });
            $('.dnnContainerPreview').dnnPreview({
                containerSelector: '<%=  moduleContainerCombo.ClientID %>',
                baseUrl: '<%= DotNetNuke.Common.Globals.NavigateURL(this.TabId) %>',
                noSelectionMessage: '<%= Localization.GetSafeJSString("PreviewNoSelectionMessage.Text") %>',
                alertCloseText: '<%= Localization.GetSafeJSString("Close.Text", Localization.SharedResourceFile)%>',
                alertOkText: '<%= Localization.GetSafeJSString("Ok.Text", Localization.SharedResourceFile)%>',
                useComboBox: true,
                ModuleId: '<%= ModuleId %>'
            });

            toggleShareableRowViewOnly(false);
            $('#<%=isShareableCheckBox.ClientID %>').change(function () {
                toggleShareableRowViewOnly(true);
            });

        }
        
        function toggleShareableRowViewOnly(animation) {
            var isSharable = $('#<%=isShareableCheckBox.ClientID %>').attr("checked");
            if (isSharable == "checked") {
                animation ? $('#isShareableRowViewOnly').slideDown() : $('#isShareableRowViewOnly').show();
            }
            else {
                animation ? $('#isShareableRowViewOnly').slideUp('fast') : $('#isShareableRowViewOnly').hide();
            }
        }

        $(document).ready(function () {
            setUpDnnModuleSettings();
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function () {
                setUpDnnModuleSettings();
            });
	        
            window.compareDate = function (source, arg) {
            	var id = source.controltovalidate;
            	var compareId = source.getAttribute("CompareControl");
            	var time = $('#' + id).val();
            	var compareTime = $('#' + id.substr(0, id.lastIndexOf("_") + 1) + compareId).val();
            	// START persian-dnnsoftware
                arg.IsValid = !time || !compareTime || time > compareTime;
                // EDN persian-dnnsoftware
            };
        });
    } (jQuery, window.Sys));
</script>
<%-- START persian-dnnsoftware --%>
<style>
    #dnnModuleSettings .pdnn-date { display:inline-block; position:relative; width:45%; max-width:445px; direction:rtl; }
    #dnnModuleSettings .pdnn-date > input { width:100%; min-width:0; max-width:none; box-sizing:border-box; direction:ltr; text-align:center; cursor:pointer; }
    #dnnModuleSettings .pdnn-calendar { position:absolute; top:100%; right:0; z-index:10000; width:320px; max-width:calc(100vw - 32px); padding:12px; margin:0; background:#fff; color:#222; border:1px solid #d6dce3; border-radius:8px; box-shadow:0 4px 16px #0002; direction:rtl; text-align:center; }
    #dnnModuleSettings .pdnn-calendar, #dnnModuleSettings .pdnn-calendar * { box-sizing:border-box; }
    #dnnModuleSettings .pdnn-calendar[hidden] { display:none !important; }
    #dnnModuleSettings .pdnn-calendar header { display:grid; grid-template-columns:42px minmax(0,1fr) 76px 42px; align-items:center; gap:5px; width:100%; margin:0; padding:0; float:none; }
    #dnnModuleSettings .pdnn-calendar button, #dnnModuleSettings .pdnn-calendar select {
        display:block; float:none !important; position:static; width:100% !important; min-width:0 !important; max-width:none !important;
        height:36px; min-height:0; margin:0 !important; padding:4px !important; border:1px solid #d6dce3;
        background:#fff; color:#222; border-radius:4px; font:inherit; font-size:13px; line-height:normal; text-indent:0; text-shadow:none; box-shadow:none; cursor:pointer;
    }
    #dnnModuleSettings .pdnn-calendar select { appearance:auto; direction:rtl; }
    #dnnModuleSettings .pdnn-calendar button:hover { background:#edf5fc; }
    #dnnModuleSettings .pdnn-calendar button:focus-visible, #dnnModuleSettings .pdnn-calendar select:focus-visible { outline:2px solid #2675bb; outline-offset:1px; }
    #dnnModuleSettings .pdnn-calendar .pdnn-days { display:grid; grid-template-columns:repeat(7,minmax(0,1fr)); gap:4px; width:100%; min-width:0; margin:10px 0; padding:0; float:none; }
    #dnnModuleSettings .pdnn-calendar .pdnn-days > span { display:block; float:none; width:auto; min-width:0; margin:0; padding:4px 0; text-align:center; }
    #dnnModuleSettings .pdnn-calendar .pdnn-days button[aria-pressed="true"] { background:#2675bb; color:#fff; }
    #dnnModuleSettings .pdnn-calendar footer { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; width:100%; margin:0; padding:0; float:none; }
</style>
<script type="text/javascript">
// START persian-dnnsoftware
(function () {
    'use strict';
    // Register once, including when this control is refreshed by an UpdatePanel.
    if (window.pdnnModuleDates) { window.pdnnModuleDates(); return; }
    var enabled = <%= System.Globalization.CultureInfo.CurrentUICulture.TwoLetterISOLanguageName == "fa" ? "true" : "false" %>;
    var formatter;
    try {
        formatter = new Intl.DateTimeFormat('en-US-u-ca-persian-nu-latn', {
            year:'numeric', month:'numeric', day:'numeric', timeZone:'UTC'
        });
        if (formatter.resolvedOptions().calendar !== 'persian') return;
    } catch (e) { return; } // Native date controls remain usable if Intl is unavailable.
    var dayMs = 86400000;
    var months = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    function parts(date) {
        var result = {};
        formatter.formatToParts(date).forEach(function (p) { if (/^(year|month|day)$/.test(p.type)) result[p.type] = Number(p.value); });
        return result;
    }
    function pad(n) { return String(n).padStart(2, '0'); }
    function iso(d) { return d.getUTCFullYear() + '-' + pad(d.getUTCMonth()+1) + '-' + pad(d.getUTCDate()); }
    function today() { var d = new Date(); return new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())); }
    // Locate the first day using the browser's Persian calendar, including leap years.
    function firstDay(year, month) {
        var low = Math.floor(Date.UTC(year+621,0,1)/dayMs);
        var high = Math.floor(Date.UTC(year+622,11,31)/dayMs);
        while (low < high) {
            var mid = Math.floor((low+high)/2), p = parts(new Date(mid*dayMs));
            if (p.year < year || (p.year === year && p.month < month)) low = mid+1;
            else high = mid;
        }
        return new Date(low*dayMs);
    }
    function setup(input) {
        if (input.dataset.pdnnReady || input.disabled) return;
        var selected = input.value ? new Date(input.value+'T00:00:00Z') : today();
        if (isNaN(selected.getTime())) return;
        var current = parts(selected), year=current.year, month=current.month;
        var wrap=document.createElement('span'), display=document.createElement('input'), panel=document.createElement('div');
        wrap.className='pdnn-date'; panel.className='pdnn-calendar'; panel.hidden=true;
        panel.id=input.id+'_persianCalendar'; panel.setAttribute('role','group'); panel.setAttribute('aria-label','تقویم شمسی');
        display.type='text'; display.readOnly=true; display.id=input.id+'_persian';
        display.placeholder='انتخاب تاریخ شمسی'; display.setAttribute('aria-label', /startDatePicker$/.test(input.id) ? 'تاریخ شروع شمسی' : 'تاریخ پایان شمسی');
        display.setAttribute('aria-controls',panel.id); display.setAttribute('aria-expanded','false');
        input.parentNode.insertBefore(wrap,input.nextSibling); wrap.appendChild(display); wrap.appendChild(panel);
        function sync() {
            if (!input.value) { display.value=''; return; }
            var p=parts(new Date(input.value+'T00:00:00Z'));
            display.value=p.year+'/'+pad(p.month)+'/'+pad(p.day);
        }
        function close() { panel.hidden=true; display.setAttribute('aria-expanded','false'); }
        function choose(d) {
            input.value=d ? iso(d) : ''; sync(); close(); display.focus();
            input.dispatchEvent(new Event('input',{bubbles:true}));
            input.dispatchEvent(new Event('change',{bubbles:true}));
        }
        function button(text, action, parent) {
            var b=document.createElement('button'); b.type='button'; b.textContent=text;
            b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); action(); }); parent.appendChild(b); return b;
        }
        function render() {
            var focused=document.activeElement;
            var focusLabel=panel.contains(focused) ? focused.getAttribute('aria-label') : null;
            var focusText=panel.contains(focused) && focused.tagName==='BUTTON' ? focused.textContent : null;
            panel.textContent=''; var header=document.createElement('header'); panel.appendChild(header);
            button('قبلی',function () { if (--month===0) {month=12;year--;} render(); },header);
            var monthSelect=document.createElement('select'); monthSelect.setAttribute('aria-label','ماه');
            months.forEach(function (name,i) { var o=document.createElement('option'); o.value=i+1; o.textContent=name; monthSelect.appendChild(o); });
            monthSelect.value=month; monthSelect.onchange=function (e) {e.stopPropagation();month=Number(this.value);render();}; header.appendChild(monthSelect);
            var yearSelect=document.createElement('select'); yearSelect.setAttribute('aria-label','سال');
            for (var y=Math.max(1,year-100);y<=year+100;y++) { var option=document.createElement('option'); option.value=y;option.textContent=y;yearSelect.appendChild(option); }
            yearSelect.value=year; yearSelect.onchange=function (e) {e.stopPropagation();year=Number(this.value);render();}; header.appendChild(yearSelect);
            button('بعدی',function () {if (++month===13) {month=1;year++;} render();},header);
            var grid=document.createElement('div'); grid.className='pdnn-days';panel.appendChild(grid);
            ['ش','ی','د','س','چ','پ','ج'].forEach(function (label) {var s=document.createElement('span');s.textContent=label;grid.appendChild(s);});
            var first=firstDay(year,month), offset=(first.getUTCDay()+1)%7;
            for(var k=0;k<offset;k++) grid.appendChild(document.createElement('span'));
            for(var n=0;n<31;n++) {
                var date=new Date(first.getTime()+n*dayMs), p=parts(date);
                if(p.month!==month || p.year!==year) break;
                (function (d, day) {
                    var b=button(String(day),function () {choose(d);},grid);
                    b.setAttribute('aria-label',year+'/'+pad(month)+'/'+pad(day));
                    b.setAttribute('aria-pressed',input.value===iso(d) ? 'true':'false');
                })(date,p.day);
            }
            var footer=document.createElement('footer'); panel.appendChild(footer);
            button('امروز',function () {choose(today());},footer);
            button('پاک کردن',function () {choose(null);},footer);
            button('بستن',function () {close();display.focus();},footer);
            // Restore focus after rebuilding the month; rebuilding is not an outside click.
            if (focusLabel || focusText) {
                Array.prototype.some.call(panel.querySelectorAll('button,select'),function (el) {
                    if ((focusLabel && el.getAttribute('aria-label')===focusLabel) || (!focusLabel && el.textContent===focusText)) {
                        el.focus(); return true;
                    }
                    return false;
                });
            }
        }
        function open() {
            var p=parts(input.value ? new Date(input.value+'T00:00:00Z') : today());year=p.year;month=p.month;
            render();panel.hidden=false;display.setAttribute('aria-expanded','true');
        }
        display.addEventListener('click',function () {if(panel.hidden) open();else close();});
        display.addEventListener('keydown',function (e) {
            if(e.key==='Enter' || e.key===' ' || e.key==='ArrowDown') {e.preventDefault();open();panel.querySelector('button').focus();}
            if(e.key==='Delete' || e.key==='Backspace') {e.preventDefault();choose(null);}
        });
        wrap.addEventListener('keydown',function (e) {if(e.key==='Escape') {e.preventDefault();close();display.focus();}});
        // Closing is handled by actual outside pointer/focus events, never by focusout during render.
        input.addEventListener('change',sync);
        sync(); input.style.display='none'; input.dataset.pdnnReady='true';
        var label=document.querySelector('label[for="'+input.id+'"]'); if(label) label.htmlFor=display.id;
    }
    window.pdnnModuleDates=function () {
        if(!enabled) return;
        document.querySelectorAll('input[id$="_startDatePicker"],input[id$="_endDatePicker"]').forEach(function (input) {
            if(input.closest('.dnnModuleSettings')) setup(input);
        });
    };
    function closeOutside(e) {
        document.querySelectorAll('#dnnModuleSettings .pdnn-date').forEach(function (wrap) {
            if (!wrap.contains(e.target)) {
                wrap.querySelector('.pdnn-calendar').hidden=true;
                wrap.querySelector('input').setAttribute('aria-expanded','false');
            }
        });
    }
    document.addEventListener('pointerdown',closeOutside,true);
    document.addEventListener('focusin',closeOutside,true);
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',window.pdnnModuleDates);
    else window.pdnnModuleDates();
    if(window.Sys && Sys.Application) Sys.Application.add_load(window.pdnnModuleDates);
})();
// EDN persian-dnnsoftware
</script>
<%-- EDN persian-dnnsoftware --%>

