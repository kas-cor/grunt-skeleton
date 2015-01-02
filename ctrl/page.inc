<?php
if ($_POST['act'] == "test") {
	alert_msg("ok", "Test page!<br />".$_POST['desc']);
	redirect_hard("page.html");
}
?>