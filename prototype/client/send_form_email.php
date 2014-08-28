
<?php
// grafxion
if(isset($_POST['email'])) {
    $email_to = "isireitschule-birkenhof@web.de";
    $email_subject = "KONTAKT thru WEB FORM";
    function died($error) {

        // your error code can go here

        echo "Es tut uns leid, aber es sind Fehler im Formular aufgetretten. ";

        echo "Die Fehler erscheinen unten.<br /><br />";

        echo $error."<br /><br />";

        echo "Bitte gehen Sie zurück und behepen Sie diese Fehler.<br /><br />";

        die();

    }



    // validation expected data exists

    if(!isset($_POST['name']) ||

        //!isset($_POST['last_name']) ||

        !isset($_POST['email']) ||

        // !isset($_POST['telephone']) ||

        !isset($_POST['message'])) {

        died('We are sorry, but there appears to be a problem with the form you submitted.');

    }



    $name = $_POST['name']; // required

    // $last_name = $_POST['last_name']; // required

    $email_from = $_POST['email']; // required

    // $telephone = $_POST['telephone']; // not required

    $message = $_POST['message']; // required



    $error_message = "";

    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {

    $error_message .= 'Der von Ihnen eingegebene E-Mail-Adresse ist nicht gültig.<br />';

  }

    $string_exp = "/^[A-Za-z .'-]+$/";

  if(!preg_match($string_exp,$name)) {

    $error_message .= 'Der von Ihnen gewählte Vorname scheint ungültig zu sein.<br />';

  }

  // if(!preg_match($string_exp,$last_name)) {

    // $error_message .= 'Der von Ihnen eingegebene Name scheint nicht gültig zu sein.<br />';

  // }

  if(strlen($message) < 2) {

    $error_message .= 'Der von Ihnen eingegebe Kommentare wird nicht angezeigt.<br />';

  }

  if(strlen($error_message) > 0) {

    died($error_message);

  }

    $email_message = "Form details below.\n\n";



    function clean_string($string) {

      $bad = array("content-type","bcc:","to:","cc:","href");

      return str_replace($bad,"",$string);

    }



    $email_message .= "Name: ".clean_string($name)."\n";

    // $email_message .= "Last Name: ".clean_string($last_name)."\n";

    $email_message .= "Email: ".clean_string($email_from)."\n";

    // $email_message .= "Telephone: ".clean_string($telephone)."\n";

    $email_message .= "Message: ".clean_string($message)."\n";





// create email headers

$headers = 'From: '.$email_from."\r\n".

'Reply-To: '.$email_from."\r\n" .

'X-Mailer: PHP/' . phpversion();

@mail($email_to, $email_subject, $email_message, $headers);

?>



<!-- include your own success html here -->

 Danke für ihre Anfrage, wir werden in kürze Antworten.

Ihr

1010tastics



<?php

}

?>