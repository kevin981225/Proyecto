
var dt;

function representantes(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#frepresentante").serialize();
         $.ajax({
            type:"get",
            url:"./php/representantes/controladorRepresentante.php",
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
                $("#titulo").html("Listado representantes");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#representantes").removeClass("hide");
                $("#representantes").addClass("show")
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
              text: "¿Realmente desea borrar la representante con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/representantes/controladorRepresentante.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'La representante con codigo : ' + codigo + ' fue borrada',
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
        $("#titulo").html("Listado de Representantes");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#representantes").removeClass("hide");
        $("#representantes").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva Representante");
        $("#nuevo-editar" ).load("./php/representantes/nuevoRepresentante.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#representante").removeClass("show");
        $("#representante").addClass("hide");
    })

    $("#contenido").on("click","button#grabar",function(){
      
      var datos=$("#frepresentante").serialize();
       $.ajax({
            type:"get",
            url:"./php/representantes/controladorRepresentante.php",
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
                $("#titulo").html("Listado representantes");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#representante").removeClass("hide");
                $("#representante").addClass("show")
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
        $("#titulo").html("Editar Representantes");
        //Recupera datos del fromulario
        var codigo = $(this).data("codigo");
       
        
        $("#nuevo-editar").load("./php/representantes/editarRepresentante.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#representantes").removeClass("show");
        $("#representantes").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/representantes/controladorRepresentante.php", 
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( representantes ) {
                if(representantes.respuesta === "no existe"){
                   $("#representante_codi").val("no Existe");                   
                   $("#representante_nomb").val("no existe");
                   $("#representante_edad").val("no existe");                   
                   $("#representante_dir").val("no existe");
                   $("#representante_tel").val("no existe");                   
                   $("#representante_email").val("no existe");
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Representante no existe!'   
                                            
                    })
                } else {
                    $("#representante_codi").val(representantes.codigo);                   
                    $("#representante_nomb").val(representantes.representante);
                    $("#representante_edad").val(representantes.edad);                   
                    $("#representante_dir").val(representantes.dir);
                    $("#representante_tel").val(representantes.tel);                   
                    $("#representante_email").val(representantes.email);
                    swal({
                        type: 'success',
                      title: 'Oops...',
                      text: 'Representante no existe!'   
                    })    
                 }
            });
                
        })
    

}





$(document).ready(() => {
  $("#titulo").html("Listado de Representantes"); 
  
  dt = $("#tabla").DataTable({
        "ajax": "php/representantes/controladorRepresentante.php?accion=listar",
        "columns": [
            { "data": "representante_codi"} ,
            { "data": "representante_nomb" },
            { "data": "representante_edad" },
            { "data": "representante_dir" },
            { "data": "representante_tel" },
            { "data": "representante_email" }
        ]
  });

  representantes();
});