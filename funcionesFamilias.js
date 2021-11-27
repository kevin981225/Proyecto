var dt;

function Familias(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fFamilias").serialize();
         $.ajax({
            type:"get",
            url:"./php/Familias/controladorFamilias.php",
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
                $("#titulo").html("Listado Familias");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#Familias").removeClass("hide");
                $("#Familias").addClass("show")
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
              text: "¿Realmente desea borrar la Familias con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/Familias/controladorFamilias.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'La Familias con codigo : ' + codigo + ' fue borrada',
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
        $("#titulo").html("Listado Familias");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#Familias").removeClass("hide");
        $("#Familias").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva Comuna");
        $("#nuevo-editar" ).load("./php/Familias/nuevoFamilias.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#Familias").removeClass("show");
        $("#Familias").addClass("hide");
    })

    $("#contenido").on("click","button#grabar",function(){
      
      var datos=$("#fFamilias").serialize();
       $.ajax({
            type:"get",
            url:"./php/Familias/controladorFamilias.php",
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
                $("#titulo").html("Listado Familias");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#Familias").removeClass("hide");
                $("#Familias").addClass("show")
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
       $("#titulo").html("Editar Familias");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
      
       
        $("#nuevo-editar").load("./php/Familias/editarFamilias.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#Familias").removeClass("show");
        $("#Familias").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/Familias/controladorFamilias.php", 
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( Familias ) {
                if(Familias.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Familias no existe!'                         
                    })
                } else {
                    $("#Familias_codi").val(Familias.codigo);                   
                    $("#Familias_nomb").val(Familias.Familias);
                    $("#Familias_edad").val(Familias.edad);
                    $("#Familias_tel").val(Familias.tel);
                    $("#Familias_email").val(Familias.email);
                }
           });
               
       })
}

$(document).ready(() => {
  $("#contenido").off("click", "a.editar");
  $("#contenido").off("click", "button#actualizar");
  $("#contenido").off("click","a.borrar");
  $("#contenido").off("click","button#nuevo");
  $("#contenido").off("click","button#grabar");
  $("#titulo").html("Listado de Familias");
  dt = $("#tabla").DataTable({
        "ajax": "php/Familias/controladorFamilias.php?accion=listar",
        "columns": [
            { "data": "paciente_codi"} ,
            { "data": "paciente_nomb" },
            { "data": "paciente_edad"} ,
            { "data": "paciente_tel" },
            { "data": "paciente_email"},
            { "data": "grupofami_nomb"} 
        ]
  });
  Familias();
});