<?= alert_msg("show") ?>

<a href="page.html">page.html</a>

<form action="/data.php" method="POST">
   <legend>Form main</legend>
   <input type="hidden" name="modul" value="main" />
   <input type="hidden" id="act" name="act" value="test" />
   <input type="text" name="desc" placeholder="Test" /><br />
   <input type="submit" id="confirm" class="btn btn-primary" value="Send" />
</form>