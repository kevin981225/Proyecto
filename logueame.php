<?php
session_start();
$connect = mysqli_connect("localhost","root","","ciudadano");

if(isset($_POST["usu_nomb"]) && isset($_POST["usu_pass"])){
  $usu_nomb = mysqli_real_escape_string($connect, $_POST["usu_nomb"]);
  $usu_pass = mysqli_real_escape_string($connect, $_POST["usu_pass"]);
  $sql = "SELECT u.usu_nomb as usu_nomb,u.rol_codi as rol_codi,r.rol_desc as rol_desc FROM tb_usuarios u LEFT JOIN tb_roles r on(u.rol_codi=r.rol_codi) WHERE usu_nomb='$usu_nomb' AND usu_pass='$usu_pass'";

  $result = mysqli_query($connect, $sql);
  $num_row = mysqli_num_rows($result);

  if ($num_row == "1") {
    $data = mysqli_fetch_array($result);
    $_SESSION["usu_nomb"] = $data["usu_nomb"];
    $_SESSION["rol_codi"] = $data["rol_codi"];
    $_SESSION["rol_desc"] = $data["rol_desc"];
    echo "1";
  } else {
    echo "error";
  }
} else {
  echo "error";
}
?>

