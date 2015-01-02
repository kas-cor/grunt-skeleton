<?php

/*
 * Navigation menu
 */

function gen_nav($menu, $tek) {
	$ret.="<div class=\"navbar\">\n";
	$ret.="\t<div class=\"navbar-inner\">\n";
	$ret.="\t\t<a class=\"brand\" href=\"/\">App title</a>\n";
	$ret.="\t\t<ul class=\"nav\">\n";
	foreach ($menu as $key => $value) {
		if (is_array($value)) {
			if ($value['visible']) {
				$act = $key == $tek ? " class=\"active\"" : "";
				$ret.="\t\t\t<li$act><a href=\"" . $key . ".html\">" . $value['name'] . "</a></li>\n";
			}
		} else {
			$ret.="\t\t\t<li class=\"divider-vertical\"></li>\n";
		}
	}
	$ret.="\t\t</ul>\n";
	$ret.="\t</div>\n";
	$ret.="</div>\n";
	return $ret;
}

/*
 * Alert messages
 */

function alert_msg($type, $text = "") {
	switch ($type) {
		case "show":
			$ret.="<div class=\"my_alert\" style=\"position: fixed; top: 0px; width: 980px;\">\n";
			$ret.=!empty($_SESSION['msg']['ok']) ? "<div class = \"alert alert-success\">" . implode("<br />\n", $_SESSION['msg']['ok']) . "</div>\n" : "";
			$ret.=!empty($_SESSION['msg']['err']) ? "<div class=\"alert alert-error\">" . implode("<br />\n", $_SESSION['msg']['err']) . "</div>\n" : "";
			$ret.=!empty($ret) ? "<script type=\"text/javascript\">\nwindow.setTimeout(function() {\n$.post(\"/data.php\",\"act=clear_msg\");\n$(\".my_alert\").fadeOut(\"slow\");\n}, 2500);\n</script>\n" : "";
			$ret.="</div>\n";
			return $ret;
			break;
		case "err":
			$_SESSION['msg']['err'][] = $text;
			break;
		case "ok":
			$_SESSION['msg']['ok'][] = $text;
		default:
			break;
	}
}

/*
 * List page
 */

function gen_pages($all, $start, $url) {
	$page = get_param("list_count", 10);
	if ($all / $page > 1) {
		$ret.="<div class=\"pagination\">\n";
		$ret.="<ul>\n";
		while ($i < $all) {
			$t++;
			$sel = round($start / $page) == $t - 1 ? " class=\"active\"" : "";
			$ret.="<li$sel><a href=\"$url$i\">$t</a></li>\n";
			$i+=$page;
		}
		$ret.="<ul>\n";
		$ret.="</div>\n";
	}
	return $ret;
}

/*
 * Get next id in table
 */

function get_next_id($table) {
	$base_name = "base_name";
	return mysql_result(mysql_query("SHOW TABLE STATUS FROM `$base_name` LIKE '$table'"), 0, "Auto_increment");
}

/*
 * Get one cell from table
 */

function get_one_cell($table, $cell, $where = "1") {
	return @mysql_result(mysql_query("SELECT `$cell` FROM `$table` WHERE $where"), 0, $cell);
}

/*
 * Soft redirect JS
 */

function redirect_soft($url = "") {
	echo "<script type=\"text/javascript\">window.location.href=\"/$url\"</script>\n";
}

/*
 * Hard redirect HTTP
 */

function redirect_hard($url = "") {
	header("location: http://" . DOMEN . "/" . $url);
	mysql_close();
	exit();
}

?>