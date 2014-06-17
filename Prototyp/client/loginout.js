			var loginoutvar = 0;
			
  			function loginOrOut()
			{
				if (loginoutvar == true)
				{
					document.getElementById('loglink1').href = "login.html";
					document.getElementById('loginout1').innerHTML = "Logout";
					document.getElementById('loglink2').href = "login.html";
					document.getElementById('loginout2').innerHTML = "Logout";
					document.getElementById('loglink3').href = "login.html";
					document.getElementById('loginout3').innerHTML = "Logout";
					document.getElementById('loglink4').href = "login.html";
					document.getElementById('loginout4').innerHTML = "Logout";
					document.getElementById('loglink5').href = "login.html";
					document.getElementById('loginout5').innerHTML = "Logout";
					document.getElementById('loglink6').href = "login.html";
					document.getElementById('loginout6').innerHTML = "Logout";
					document.getElementById('loglink7').href = "login.html";
					document.getElementById('loginout7').innerHTML = "Logout";					
					loginoutvar = false;
					console.log('Logout');

				} else if (loginoutvar == false)
				{
					document.getElementById('loglink1').href = "";
					document.getElementById('loginout1').innerHTML = "Login";	
					document.getElementById('loglink2').href = "";
					document.getElementById('loginout2').innerHTML = "Login";
					document.getElementById('loglink3').href = "";
					document.getElementById('loginout3').innerHTML = "Login";
					document.getElementById('loglink4').href = "";
					document.getElementById('loginout4').innerHTML = "Login";
					document.getElementById('loglink5').href = "";
					document.getElementById('loginout5').innerHTML = "Login";
					document.getElementById('loglink6').href = "";
					document.getElementById('loginout6').innerHTML = "Login";	
					document.getElementById('loglink7').href = "";
					document.getElementById('loginout7').innerHTML = "Login";					
					loginoutvar = true;
					console.log('Login');
					
				}				
			}