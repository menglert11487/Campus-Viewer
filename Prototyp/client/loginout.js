			var loginoutvar = 0;
			document.getElementById('loginout').innerHTML = "Login";
			
  			function loginOrOut()
			{
				if (loginoutvar == 0)
				{
					document.getElementById('loginout').innerHTML = "Logout";
					loginoutvar = 1;

				} else if (loginoutvar == 1)
				{
					document.getElementById('loginout').innerHTML = "Login";
					loginoutvar = 0;
				}				
			}