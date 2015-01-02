<?php

include_once "config.php";

unset($_SESSION['msg']);

if (file_exists("ctrl/" . $_POST['modul']. ".inc")) {
   include_once "ctrl/" . $_POST['modul']. ".inc";
} else {
   redirect_hard();
}

?>