			var loginoutvar = 0;
			
  			function loginOrOut()
			{
				if (loginoutvar == 0)
				{
					document.getElementById('loginout').innerHTML = "Logout";
					document.getElementById('loginout').href = "login.html";
					loginoutvar = 1;

				} else if (loginoutvar == 1)
				{
					document.getElementById('loginout').innerHTML = "Login";
					loginoutvar = 0;
				}				
			}