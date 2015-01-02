<?php

include_once "config.php";

unset($_SESSION['msg']);

if (isset($ctrl_modules[$_POST['modul']])) {
   include_once "ctrl/" . $ctrl_modules[$_POST['modul']];
} else {
   redirect_hard();
}

?>