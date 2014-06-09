				var loginoutvar = 0;
			
  			function loginOrOut()
			{
				if (loginoutvar == 0)
				{
					document.getElementById('loginout').innerHTML = "Logout";
					loginoutvar = 1;
					window.open("login.html");

				} else if (loginoutvar == 1)
				{
					document.getElementById('loginout').innerHTML = "Login";
					loginoutvar = 0;
					
				}				
			}
			
			
var foo = function(){
  var button = document.createElement('button');
  button.innerHTML = 'click me';
  button.onclick = function(){
    alert('here be dragons');return false;
  };
  // where do we want to have the button to appear?
  // you can append it to another element just by doing something like
  // document.getElementById('foobutton').appendChild(button);
  document.body.appendChild(button);
};