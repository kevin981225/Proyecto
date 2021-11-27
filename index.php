    <?php
session_start();

if(!isset($_SESSION["usu_nomb"])){
  header("location:login.php");
}

$rol = $_SESSION['rol_codi'];
echo '<h1 align=center><b> <font color="black">Bienvenido usuario:'.$_SESSION["usu_nomb"].'</font></h1>';
echo '<h2 align=center><font color="black">'.$_SESSION["rol_desc"].'</font></h2>';
echo '<p align=center><font color = "black"><b><a href="logout.php">Logout</font></a></p>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>FARMACIAS</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link rel ="stylesheet" href="css/estilo.css"/>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  
</head>
<style>
.jumbotron {
    background-color: #003366;
    color: #fff;
  
}

</style>
<body>
    <div class="container">
        <div class="jumbotron">
            <h1>CIUDADANOS SANOS</h1>   
        </div>
    </div>

    <div class="container">
        <div class="panel-group"><div class="panel panel-primary">
            <div class="panel-heading">Tablas de Gestion</div>
            <div class="panel-body">
                
                <div class="form-group" id="opciones">        
                    <div class="col-sm-10">

                    <?php
                        if($rol==1){
                    ?>
                        <a class="btn btn-success" href="php/usuarios/index.php" role="button">Usuarios</a>
                        <a class="btn btn-success" href="php/rol/index.php" role="button">Roles</a>
                        <a class="btn btn-primary" href="php/gerentes/index.php" role="button">Gerentes</a>
                        <a class="btn btn-primary" href="php/directores/index.php" role="button">Directores</a>
                        <a class="btn btn-primary" href="php/ciudad/index.php" role="button">Ciudades</a>
                        <a class="btn btn-primary" href="php/pais/index.php" role="button">Paises</a>
                        <a class="btn btn-primary" href="php/sedes/index.php" role="button">Sedes</a>
                        <a class="btn btn-primary" href="php/clientes/index.php" role="button">Clientes</a>
                        <a class="btn btn-primary" href="php/empleados/index.php" role="button">Empleados</a>
                        <a class="btn btn-primary" href="php/inventario/index.php" role="button">Inventario</a>
                        <a class="btn btn-primary" href="php/nomina/index.php" role="button">Nomina</a>
                        <a class="btn btn-primary" href="php/notificaciones/index.php" role="button">Notificaciones</a>                         
                        <a class="btn btn-primary" href="php/proveedores/index.php" role="button">Proveedores</a>
                        <a class="btn btn-primary" href="php/productos/index.php" role="button">Productos y Materia Prima</a>
                        <a class="btn btn-primary" href="php/ventayfacturacion/index.php" role="button">Venta y Facturacion</a>
                        <a class="btn btn-primary" href="php/paciente/index.php" role="button">Paciente</a>
                        <a class="btn btn-primary" href="php/medico/index.php" role="button">Medicos</a>
                        <a class="btn btn-primary" href="php/atencion/index.php" role="button">Historial Atencion</a>
                        <a class="btn btn-primary" href="php/citas/index.php" role="button">Citas</a>
                        <a class="btn btn-primary" href="php/grupofamiliar/index.php" role="button">Grupo Familiar</a>
                        <a class="btn btn-primary" href="php/representantes/index.php" role="button">Representantes</a>
                        <a class="btn btn-primary" href="php/Familias/index.php" role="button">Familias</a>
                        
                        <?php
                        }
                        else if($rol==2){
                        ?>
                        //
                        <?php
                        }
                        else if($rol==3){
                        ?>
                        //
                        <?php
                        }
                        else if($rol==4){
                        ?>
                        
                        // 

                        <?php
                        }
                        else if($rol==5){
                        ?>
                        
                        //
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group hide" id="contenedor"><div class="panel panel-primary">
            <div class="panel-heading" id="titulo"></div>
            <div class="panel-body">
                
                <div class="form-group" id="contenido">        
                    
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="pagina" value="index" name="editar"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <!-- Librearía para las funcionalidades de la tabla -->
    <script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.11/js/dataTables.bootstrap.min.js"></script>
    <!-- Librería para las alertas -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.28.2/sweetalert2.all.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>

    <!-- Funciones de Lógica de negocio -->
    <script src="js/funcionesJquery.js"></script>
    <!-- Funciones de Lógica de neogcio -->
    <script>
        $(document).ready(Inicio);
    </script>
</body>
</html>