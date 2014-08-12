$(document).ready(function () {
	$.getScript('js/jquery.cookie');

	function hideReg(e) {
		$('#reg3').hide();		
		return false;
	}
	
	function hideLogin(e) {
		$('#login3').hide();
		return false;
	}
	
	function showLogout(e) {
		$('#logout3').show();
		return false;
	}
	
	function hideLogout(e) {
		$('#logout3').hide();	
		return false;
	}
		
	function showLogin(e) {
		$('#login3').show();		
		return false;
	}
		
	function showReg(e) {
		$('#reg3').show();		
		return false;		
	}
	
	function logout(e) {
		hideLogout();
		showReg();
		showLogin();
		return false;
	}
	
	function login(e) {
		showLogout();
		hideReg();
		hideLogin();
		return false;
	}
							
	if (typeof $.cookie('userCookie') == "undefined") {
		logout();	
	} 
	
	if (jQuery.cookie('userCookie')) {
		login();
		$('#text3').css('font-weight', 'bold');
		$('#text3').css('color', '#0000CC');
		$('#text3').html('Hallo, ' + jQuery.cookie('userCookie') + '!');
	}

});