<?= alert_msg("show") ?>

<form action="/data.php" method="POST">
   <legend>Form page</legend>
   <input type="hidden" name="modul" value="page" />
   <input type="hidden" id="act" name="act" value="test" />
   <input type="text" name="desc" placeholder="Test" /><br />
   <input type="submit" id="confirm" class="btn btn-primary" value="Send" />
</form>