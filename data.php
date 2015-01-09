<?php

include_once "config.php";

unset($_SESSION['msg']);

if (file_exists("ctrl/" . $_POST['modul']. ".php")) {
   include_once "ctrl/" . $_POST['modul']. ".php";
} else {
   redirect_hard();
}

?>