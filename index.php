<?php
include_once "config.php";
$p = isset($main_menu[$p]) ? $p : "main";
?>
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8" />
      <title>App</title>
      <link href="/css/style.min.css" rel="stylesheet" type="text/css" />
   </head>
   <body>
      <div class="container">
         <?= gen_nav($main_menu, $p) ?>
         <div class="row">
            <h3><?= $main_menu[$p]['title'] ?></h3>
         </div>
         <div class="row">
            <?php
            if (file_exists("view/" . $p . ".php")) {
               include_once "view/" . $p . ".php";
            } else {
               redirect_soft("error404.html");
            }
            ?>
         </div>
      </div>
      <script src="/js/script.min.js" type="text/javascript"></script>
   </body>
</html>
<?php mysql_close(); ?>