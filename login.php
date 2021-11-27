<?php
session_start();
if (isset($_SESSION["usu_nomb"])) {
  header("location:index.php");
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Login</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" media="screen" title="no title" charset="utf-8">
    <script src="js/jquery-1.12.3.min.js" charset="utf-8"></script>
    <script src="bootstrap/js/bootstrap.min.js" charset="utf-8"></script>
    <link rel ="stylesheet" href="css/estilo.css"/>
  </head>
    
    <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <form method="post">
            <br><br>
            <h1><p class="text-center"><font color="Black">Login</font></p></h1>
            <br><br>
            <div class="form-group">
              <label for="usu_nomb"><font color="black">Usuario</font> </label>
              <input type="text" name="usu_nomb" placeholder="Ingrese usuario" id="usu_nomb" class="form-control">
            </div>
             <div class="form-group">
              <label for="usu_pass"><font color="black">Constraseña </font> </label>
              <input type="password" name="usu_pass" placeholder="Ingrese contraseña" id="usu_pass" class="form-control">
            </div>
            <br><br>
            <div class="form-group">
              <input type="button" name="login" id="login" value="Login" class="btn btn-danger">
            </div>
            <br>
            <span id="result"></span>
          </form>
        </div>
      </div>
    </div>
  </body>
</html>

<script>
  $(document).ready(function() {
    $('#login').click(function(){
      var usu_nomb = $('#usu_nomb').val();
      var usu_pass = $('#usu_pass').val();
      if($.trim(usu_nomb).length > 0 && $.trim(usu_pass).length > 0){
        $.ajax({
          url:"logueame.php",
          method:"POST",
          data:{usu_nomb:usu_nomb, usu_pass:usu_pass},
          cache:"false",
          beforeSend:function() {
            $('#login').val("Conectando...");
          },
          success:function(data) {
            $('#login').val("login");
            if (data=="1") {
              $(location).attr('href ','index.php');
            } else {
              
              $("#result").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> Recargar la Pagina para validar.</div>");
              
            }
          }
        });
      }; 
    });
  });

</script>

