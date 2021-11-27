var dt;

function usuarios(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fusuarios").serialize();
         $.ajax({
            type:"get",
            url:"./php/usuarios/controladorUsuarios.php",
            data: datos,
            dataType:"json"
          }).done(function( resultado ) {
              if(resultado.respuesta){
                swal(
                    'Actualizado!',
                    'Se actaulizaron los datos correctamente',
                    'success'
                )     
                dt.ajax.reload();
                $("#titulo").html("Listado Usuarios");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#usuarios").removeClass("hide");
                $("#usuarios").addClass("show")
             } else {
                swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'                         
                })
            }
        });
    })

    $("#contenido").on("click","a.borrar",function(){
        //Recupera datos del formulario
        var codigo = $(this).data("codigo");

        swal({
              title: '¿Está seguro?',
              text: "¿Realmente desea borrar la usuarios con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/usuarios/controladorUsuarios.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El usuarios con codigo : ' + codigo + ' fue borrado',
                                'success'
                            )     
                            dt.ajax.reload();                            
                        } else {
                            swal({
                              type: 'error',
                              title: 'Oops...',
                              text: 'Something went wrong!'                         
                            })
                        }
                    });
                     
                    request.fail(function( jqXHR, textStatus ) {
                        swal({
                          type: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong!' + textStatus                          
                        })
                    });
                }
        })

    });

    $("#contenido").on("click","button.btncerrar2",function(){
        $("#titulo").html("Listado usuarios");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#usuarios").removeClass("hide");
        $("#usuarios").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva usuarios");
        $("#nuevo-editar" ).load("./php/usuarios/nuevoUsuarios.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#usuarios").removeClass("show");
        $("#usuarios").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/rol/controladorRol.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#rol_codi option").remove()       
              $("#rol_codi").append("<option selecte value=''>Seleccione un rol</option>")
              $.each(resultado.data, function (index, value) { 
                $("#rol_codi").append("<option value='" + value.rol_codi + "'>" + value.rol_nomb + "</option>")
              });
           });
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fusuarios").serialize();
       $.ajax({
            type:"get",
            url:"./php/usuarios/controladorUsuarios.php",
            data: datos,
            dataType:"json"
          }).done(function( resultado ) {
              if(resultado.respuesta){
                swal(
                    'Grabado!!',
                    'El registro se grabó correctamente',
                    'success'
                )     
                dt.ajax.reload();
                $("#titulo").html("Listado Usuarios");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#usuarios").removeClass("hide");
                $("#usuarios").addClass("show")
             } else {
                swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'                         
                })
            }
        });
    });


    $("#contenido").on("click","a.editar",function(){
       $("#titulo").html("Editar Usuarios");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var rol;
        $("#nuevo-editar").load("./php/usuarios/editarUsuarios.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#usuarios").removeClass("show");
        $("#usuarios").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/usuarios/controladorUsuarios.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( usuarios ) {        
                if(usuarios.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Usuarios no existe!!!!!'                         
                    })
                } else {
                    $("#usu_codi").val(usuarios.codigo);                   
                    $("#usu_nomb").val(usuarios.usuarios);
                    $("#usu_pass").val(usuarios.password);
                    rol = usuarios.rol;
                }
           });

           $.ajax({
             type:"get",
             url:"./php/rol/controladorRol.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#rol_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(rol === value.rol_codi){
                  $("#rol_codi").append("<option selected value='" + value.rol_codi + "'>" + value.rol_nomb + "</option>")
                }else {
                  $("#rol_codi").append("<option value='" + value.rol_codi + "'>" + value.rol_nomb + "</option>")
                }
              });
           });    
            
       })
}

$(document).ready(() => {
  $("#contenido").off("click", "a.editar");
  $("#contenido").off("click", "button#actualizar");
  $("#contenido").off("click","a.borrar");
  $("#contenido").off("click","button#nuevo");
  $("#contenido").off("click","button#grabar");
  $("#titulo").html("Listado de Usuarios");
  dt = $("#tabla").DataTable({
        "ajax": "php/usuarios/controladorUsuarios.php?accion=listar",
        "columns": [
            { "data": "usu_codi"} ,
            { "data": "usu_nomb" },
            { "data": "usu_pass" },
            { "data": "rol_nomb" },
            { "data": "usu_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "usu_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  usuarios();
});