$(document).ready(function () {
	$.getScript('js/jquery.cookie');

	function hideReg(e) {
		$('#reg1').hide();
		$('#reg2').hide();
		$('#reg3').hide();
		$('#reg4').hide();	
		$('#reg5').hide();
		$('#reg6').hide();
		$('#reg7').hide();
		$('#reg8').hide();		
		return false;
	}
	
	function hideLogin(e) {
		$('#login1').hide();
		$('#login2').hide();
		$('#login3').hide();
		$('#login4').hide();
		$('#login5').hide();
		$('#login6').hide();
		$('#login7').hide();
		$('#login8').hide();
		return false;
	}
	
	function showLogout(e) {
		$('#logout1').show();
		$('#logout2').show();
		$('#logout3').show();
		$('#logout4').show();
		$('#logout5').show();
		$('#logout6').show();
		$('#logout7').show();
		$('#logout8').show();
		return false;
	}
	
	function hideLogout(e) {
		$('#logout1').hide();
		$('#logout2').hide();
		$('#logout3').hide();
		$('#logout4').hide();
		$('#logout5').hide();
		$('#logout6').hide();
		$('#logout7').hide();
		$('#logout8').hide();
		return false;
	}
		
	function showLogin(e) {
		$('#login1').show();
		$('#login2').show();
		$('#login3').show();
		$('#login4').show();
		$('#login5').show();
		$('#login6').show();
		$('#login7').show();
		$('#login8').show();
		return false;
	}
		
	function showReg(e) {
		$('#reg1').show();
		$('#reg2').show();
		$('#reg3').show();
		$('#reg4').show();	
		$('#reg5').show();
		$('#reg6').show();
		$('#reg7').show();
		$('#reg8').show();	
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
	}

});