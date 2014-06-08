			var loginoutvar = 0;
			
  			loginOrOut = function()
			{
				if (loginoutvar == 0)
				{
					window.open('login.html');
					document.body.div1.div2.loginout.button.value = "Logout";
					loginoutvar = 1;

				} else if (loginoutvar == 1)
				{
					document.body.div1.div2.loginout.button.value = "Login";
					loginoutvar = 0;
				}				
			}