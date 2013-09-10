window.$i = IceMx2 = (function () {

	var IceMx2 = window.IceMx2 || {};
	
	//扩展部分
	function GetExplorerType(){
		if (navigator.userAgent.indexOf("MSIE") > 0) {
			return "MSIE";
		}
		if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
			return "Firefox";
		}
		if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
			return "Safari";
		}
		if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
			return "Camino";
		}
		if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
			return "Gecko";
		}
	}
	
	if (window.attachEvent) {
		IceMx2.ie = true;
	
		var isIe8 = false; $.browser.msie;
		if ($.browser.msie) {
			(IceMx2.ie8 = $.browser.version == '8.0');
			(IceMx2.ie7 = $.browser.version == '7.0');
			(IceMx2.ie6 = $.browser.version == '6.0');
		}
	} else {
		var ex = GetExplorerType();
		
		if (ex == "Safari") {
			IceMx2.google = true;
		} else if (ex == "Firefox") {
			IceMx2.fireFox = true;
		}
	};

	return IceMx2;

})();

