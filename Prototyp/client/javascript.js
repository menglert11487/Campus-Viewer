window.onload = function() {

   function login() {

       var nutzer = "10tastics";
       var pass = "projekt";

       var text = "Sie sind eingeloggt";
       var username = prompt("Nutzername");
       var passwort = prompt("Passwort");

       if (username === nutzer)
           if (passwort === pass) {
               alert("Korrekt! Sie sind eingeloggt");
           }
       if (username !== nutzer)
           if (passwort !== pass) {

               alert("Bitte versuchen Sie es nochmal");
               login();
           }

   }

   function clickHandler(e) {
       window.alert("Hier entsteht eine Funktion");
       e.stopPropagation();      //Propagation = verteilung o.?
   }

   document.onload = login;

};

function search(){
   
   var url = "https://www.google.com/#newwindow=1&g=";
   var str = document.googleSearch.searchField.value.replace(/ /g, "+");
   window.open(url+str, "_blank");
}
function switchCamera(id){
	var vp = document.getElementById(id);
	vp.setAttribute("set_bind","true");
	
}



