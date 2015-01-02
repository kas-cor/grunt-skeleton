<?php
if ($_POST['act'] == "test") {
	if (isset($_POST['desc'])
		alert_msg("ok", "Test main!<br />".$_POST['desc']);
	} else {
		alert_msg("err", "Test main!");
	}
	redirect_hard("page.html");
}
?>