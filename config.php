<?php

/*
 * Author:
 * E-mail:
 */
Error_Reporting(E_ALL & ~E_NOTICE);

/*
 * Session start
 */
session_start();

/*
 * Constants
 */
define("MYSQL_HOST", "localhost");
define("MYSQL_USER", "USER");
define("MYSQL_PASS", "PASS");
define("MYSQL_BASE", "BASE");
/* --- */
define("DOMEN", "domen.com");

/*
 * Connect MySQL
 */
@mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS) or die("Don't connect to server!");
mysql_select_db(MYSQL_BASE) or die("Don't connect to base!");
mysql_query("SET NAMES utf8");

/*
 * Main menu
 */
$main_menu = array(
    "main" => array("name" => "Main", "title" => "Main title", visible => 1),
    /* Not visible */
    "page" => array("name" => "Page", "title" => "Page title", visible => 0)
);

/*
 * Functions
 */
include_once "func.php";
?>