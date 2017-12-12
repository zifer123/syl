/*
 *  jQuery table2excel - v1.0.2
 *  jQuery plugin to export an .xls file in browser from an HTML table
 *  https://github.com/rainabba/jquery-table2excel
 *
 *  Made by rainabba
 *  Under MIT License
 */
!function(a,b,c,d){function e(b,c){this.element=b,this.settings=a.extend({},h,c),this._defaults=h,this._name=g,this.init()}function f(a){return(a.filename?a.filename:"table2excel")+".xlsx"}var g="table2excel",h={exclude:".noExl",name:"Table2Excel"};e.prototype={init:function(){var b=this;b.template={head:'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset=\"UTF-8\"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>',sheet:{head:"<x:ExcelWorksheet><x:Name>",tail:"</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"},mid:"</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>",table:{head:"<table>",tail:"</table>"},foot:"</body></html>"},b.tableRows=[],a(b.element).each(function(c,d){var e="";a(d).find("tr").not(b.settings.exclude).each(function(b,c){e+="<tr>"+a(c).html()+"</tr>"}),b.tableRows.push(e)}),b.tableToExcel(b.tableRows,b.settings.name)},tableToExcel:function(d,e){var g,h,i,j=this,k="";if(j.uri="data:application/vnd.ms-excel;base64,",j.base64=function(a){return b.btoa(unescape(encodeURIComponent(a)))},j.format=function(a,b){return a.replace(/{(\w+)}/g,function(a,c){return b[c]})},j.ctx={worksheet:e||"Worksheet",table:d},k=j.template.head,a.isArray(d))for(g in d)k+=j.template.sheet.head+"Table"+g+j.template.sheet.tail;if(k+=j.template.mid,a.isArray(d))for(g in d)k+=j.template.table.head+"{table"+g+"}"+j.template.table.tail;k+=j.template.foot;for(g in d)j.ctx["table"+g]=d[g];if(delete j.ctx.table,"undefined"!=typeof msie&&msie>0||navigator.userAgent.match(/Trident.*rv\:11\./))if("undefined"!=typeof Blob){k=[k];var l=new Blob(k,{type:"text/html"});b.navigator.msSaveBlob(l,f(j.settings))}else txtArea1.document.open("text/html","replace"),txtArea1.document.write(k),txtArea1.document.close(),txtArea1.focus(),sa=txtArea1.document.execCommand("SaveAs",!0,f(j.settings));else h=j.uri+j.base64(j.format(k,j.ctx)),i=c.createElement("a"),i.download=f(j.settings),i.href=h,i.click();return!0}},a.fn[g]=function(b){var c=this;return c.each(function(){a.data(c,"plugin_"+g)||a.data(c,"plugin_"+g,new e(this,b))}),c}}(jQuery,window,document);