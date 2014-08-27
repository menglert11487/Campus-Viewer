$(document).ready(function() {

	$.getScript('js/jquery.cookie');
	
    String.prototype.trim = function() {
        // skip leading and trailing whitespace
        // and return everything in between
        var x = this;
        x = x.replace(/^\s*(.*)/, "$1");
        x = x.replace(/(.*?)\s*$/, "$1");
        return x;
    }
	
				$('#vorschau').click(function () { 
				        var newPreView = document.getElementById('writeArea').value.trim();
							document.getElementById('writeArea').value = newPreView;
							
					if (document.getElementById('writeArea').value != '')
					{
						document.getElementById('preView').innerHTML = document.getElementById('writeArea').value;
						document.getElementById('preView').style.visibility = "visible"
					} else {
						alert('Sie haben nichts ins Formular geschrieben.');
					}
				});			

				$('#loeschen').click(function () { 
					document.getElementById('writeArea').value = ''
					document.getElementById('preView').innerHTML = '';
					document.getElementById('preView').style.visibility = "hidden"
						// var newLoeschen = document.getElementById('writeArea').value.trim();
							// document.getElementById('writeArea').value = newLoeschen;
						
						// if	(document.getElementById('writeArea').value != '') {
							// document.getElementById('writeArea').value = '';
						// } else {
							// alert('Das Formular ist leer.');
						// }
				});	
				
				$('#posten').click(function () {
				//if (jQuery.cookie('userCookie')) {
						var newComment = document.getElementById('writeArea').value.trim();
							document.getElementById('writeArea').value = newComment;	
							
				if (document.getElementById('writeArea').value != '') {
					var room = document.getElementById('room').innerHTML;
					var commentary = document.getElementById('writeArea').value;

						$.ajax({
							type: "POST",
							crossDomain: false,
							url: '/comment/new',
							data: 'commentary=' + commentary + '&room=' + room,
							success: function(data) {
								if (data.success) {
									alert('Kommentar wurde erfolgreich gespeichert!');
									document.getElementById('writeArea').value = '';
									window.location.href = window.location;
									console.log(data);
								} else {
									console.error('Something went wrong: ' + data.msg);
								}
							},
							error: function(jqXHR, error, object, what) {
							console.error("Error: " + error + " - " + jqXHR.status);
							}
						});
				} else {
						//alert('Sie müssen sich anmelden, um Kommentare zu schreiben.');
						alert('Bitte schreiben Sie was ins Formular.');
				}				
					return false;
				});
	
	// if (jQuery.cookie('userCookie')) {
		// $('#logout3').click(function () {
			// logoutForm();
		// });
	// }	
	
	$('#logout3').click(function () { 
	var bestaetigung = confirm('Wollen Sie sich wirklich abmelden?');
	
		if (bestaetigung == true)
				{
					$.ajax({
						type: "POST",
						crossDomain: true,
						url: '/user/logout',
						data: $(this).serialize(),
						success: function(data) {
							if (data.success) {
								//User logged in
								console.log(data);
								$.removeCookie('userCookie');
								window.location.href = window.location;
							} else {
								console.error('Something went wrong: ' + data.msg);
							}
						},
						error: function(jqXHR, error, object) {
							console.error("Error: " + error);
						}
					});
				return false;
				}	
	});	
	
    function checkLoginFormular(e) {

        var valid = true;
        var newUsername = document.formular.username.value.trim();
        document.formular.username.value = newUsername;

        var newPassword = document.formular.password.value.trim();
        document.formular.password.value = newPassword;

        if (newUsername == "") {
            document.formular.username.focus();
            document.getElementById('fa').style.color = '#FF0000';
            document.getElementById('da').innerHTML = "*Bitte den Benutzernamen eingeben ";
            document.getElementById('da').style.fontSize = "90%";
            document.getElementById('da').style.color = '#FF0000';
            document.getElementById('da').style.fontStyle = 'italic';
            valid = false;
        }
        if (newUsername != "") {
            document.formular.username.focus();
            document.getElementById('fa').style.color = '#000000';
            document.getElementById('da').innerHTML = "";
        }

        if (newPassword == "") {
            document.formular.password.focus();
            document.getElementById('fb').style.color = '#FF0000';
            document.getElementById('db').innerHTML = "*Bitte das Passwort eingeben ";
            document.getElementById('db').style.fontSize = "90%";
            document.getElementById('db').style.color = '#FF0000';
            document.getElementById('db').style.fontStyle = 'italic';
            valid = false;
        }

        if (newPassword != "") {
            document.formular.username.focus();
            document.getElementById('fb').style.color = '#000000';
            document.getElementById('db').innerHTML = "";
        }

        return valid;
    }

    function deleteFormular(e) {
        $(this)[0].reset();
    }

    function checkRegisterFormular(e) {
        var valid = true;

        var newUsername = document.formular.username.value.trim();
        document.formular.username.value = newUsername;

        var newGivenname = document.formular.givenname.value.trim();
        document.formular.givenname.value = newGivenname;

        var newName = document.formular.name.value.trim();
        document.formular.name.value = newName;

        var newEmail = document.formular.email.value.trim();
        document.formular.email.value = newEmail;

        var newPassword = document.formular.password.value.trim();
        document.formular.password.value = newPassword;

        var newSamePassword = document.formular.samePassword.value.trim();
        document.formular.samePassword.value = newSamePassword;

        if (newUsername == "") {
            document.formular.username.focus();
            document.getElementById('f1').style.color = '#FF0000';
            document.getElementById('d1').innerHTML = "*Bitte den Benutzernamen eingeben ";
            document.getElementById('d1').style.fontSize = "90%";
            document.getElementById('d1').style.color = '#FF0000';
            document.getElementById('d1').style.fontStyle = 'italic';
            valid = false;
        }

        if (newUsername != "") {
            document.formular.username.focus();
            document.getElementById('f1').style.color = '#000000';
            document.getElementById('d1').innerHTML = "";
        }

        if (newGivenname == "") {
            document.formular.givenname.focus();
            document.getElementById('f2').style.color = '#FF0000';
            document.getElementById('d2').innerHTML = "*Bitte den Vornamen eingeben ";
            document.getElementById('d2').style.fontSize = "90%";
            document.getElementById('d2').style.color = '#FF0000';
            document.getElementById('d2').style.fontStyle = 'italic';
            valid = false;
        }

        if (newGivenname != "") {
            document.formular.username.focus();
            document.getElementById('f2').style.color = '#000000';
            document.getElementById('d2').innerHTML = "";
        }

        if (newName == "") {
            document.formular.name.focus();
            document.getElementById('f3').style.color = '#FF0000';
            document.getElementById('d3').innerHTML = "*Bitte den Nachnamen eingeben ";
            document.getElementById('d3').style.fontSize = "90%";
            document.getElementById('d3').style.color = '#FF0000';
            document.getElementById('d3').style.fontStyle = 'italic';
            valid = false;
        }

        if (newName != "") {
            document.formular.username.focus();
            document.getElementById('f3').style.color = '#000000';
            document.getElementById('d3').innerHTML = "";
        }

        if (newEmail.indexOf("@") == -1 || newEmail == "") {
            document.formular.email.focus();
            document.getElementById('f4').style.color = '#FF0000';
            document.getElementById('d4').innerHTML = "*Bitte die Email-Adresse eingeben ";
            document.getElementById('d4').style.fontSize = "90%";
            document.getElementById('d4').style.color = '#FF0000';
            document.getElementById('d4').style.fontStyle = 'italic';
            valid = false;
        }

        if (newEmail.indexOf("@") != -1 && newEmail != "") {
            document.formular.username.focus();
            document.getElementById('f4').style.color = '#000000';
            document.getElementById('d4').innerHTML = "";
        }

        if (newPassword == "") {
            document.formular.password.focus();
            document.getElementById('f5').style.color = '#FF0000';
            document.getElementById('d5').innerHTML = "*Bitte Passwort eingeben ";
            document.getElementById('d5').style.fontSize = "90%";
            document.getElementById('d5').style.color = '#FF0000';
            document.getElementById('d5').style.fontStyle = 'italic';
            valid = false;
        }

        if (newPassword != "") {
            document.formular.username.focus();
            document.getElementById('f5').style.color = '#000000';
            document.getElementById('d5').innerHTML = "";
        }

        if (newSamePassword == "") {
            document.formular.samePassword.focus();
            document.getElementById('f6').style.color = '#FF0000';
            document.getElementById('d6').innerHTML = "*Bitte Passwort eingeben ";
            document.getElementById('d6').style.fontSize = "90%";
            document.getElementById('d6').style.color = '#FF0000';
            document.getElementById('d6').style.fontStyle = 'italic';
        }

        if (newSamePassword != "") {
            document.formular.username.focus();
            document.getElementById('f6').style.color = '#000000';
            document.getElementById('d6').innerHTML = "";
        }

        if (document.formular.samePassword.value != document.formular.password.value) {
            alert("Die Passwörter stimmen nicht überein.");
            valid = false;
        }

        return valid;
    }	

    // function logoutForm(e) {

	// var bestaetigung = confirm('Wollen Sie sich wirklich abmelden?');
	
		// if (bestaetigung == true)
		// {
            // $.ajax({
                // type: "POST",
                // crossDomain: true,
                // url: './user/logout',
                // data: $(this).serialize(),
                // success: function(data) {
                    // if (data.success) {
                        // //User logged in
                        // console.log(data);
						// window.location.href = 'index.html';
						// $.removeCookie('userCookie');
                    // } else {
                        // console.error('Something went wrong: ' + data.msg);
                    // }
                // },
                // error: function(jqXHR, error, object) {
                    // console.error("Error: " + error);
                // }
            // });
        // return false;
		// }	
	// }
	
    function submitLoginForm(e) {
        var isFormValid = checkLoginFormular();
		var username = document.formular.username.value;

        if (isFormValid) {

            $.ajax({
                type: "POST",
                crossDomain: true,
                url: './user/login',
                data: $(this).serialize(),
                success: function(data) {
                    if (data.success) {
                        //User logged in
                        console.log(data);
                        $('#msg').css('color', '#00aa00');
                        $('#msg').text(data.msg);
						$.cookie('userCookie', username);
						window.location.href = 'index.html';
                    } else {
                        console.error('Something went wrong: ' + data.msg);
                        $('#msg').css('color', '#aa0000');
                        $('#msg').text(data.msg);
                    }
                },
                error: function(jqXHR, error, object) {
                    console.error("Error: " + error);
                    $('#msg').css('color', '#aa0000');
                    $('#msg').text(error);
                }
            });
        }

        return false;
    }

    function submitRegisterForm() {

        var isFormValid = checkRegisterFormular();
        var formData = $(this).serialize();

        if (isFormValid) {

            $.ajax({
                type: "POST",
                crossDomain: false,
                url: '/user/new',
                data: formData,
                success: function(data) {
                    if (data.success) {
                        //User registered
                        console.log(data);
                        $('#msg').css('color', '#00aa00');
                        $('#msg').text(data.msg);
                    } else {
                        console.error('Something went wrong: ' + data.msg);
                        $('#msg').css('color', '#aa0000');
                        $('#msg').text(data.msg);
                    }
                },
                error: function(jqXHR, error, object, what) {
                    console.error("Error: " + error + " - " + jqXHR.status);
                    $('#msg').css('color', '#aa0000');
                    $('#msg').text(error + " - " + jqXHR.status);
                }
            });
        }

        return false;
    }

    // Test which form handler function to use
    if ($('#registerform').length) {
        // Init register form
        $('#registerform').on('submit', submitRegisterForm);
        $('#btnResetForm').on('click', deleteFormular);
    } else if ($('#loginform').length) {
        // Init login form
        $('#loginform').on('submit', submitLoginForm);
    } 
	
});