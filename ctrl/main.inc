<?php
if ($_POST['act'] == "test") {
	alert_msg("err", "Test main!<br />".$_POST['desc']);
	redirect_hard("main.html");
}
?>