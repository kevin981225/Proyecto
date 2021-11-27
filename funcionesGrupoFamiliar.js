var dt;

function grupofamiliar(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fgrupofamiliar").serialize();
         $.ajax({
            type:"get",
            url:"./php/grupofamiliar/controladorGrupofamiliar.php",
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
                $("#titulo").html("Listado Grupofamiliar");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#grupofamiliar").removeClass("hide");
                $("#grupofamiliar").addClass("show")
             } else {
                swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'                         
                })
                dt.ajax.reload();
            }
        });
    })

    $("#contenido").on("click","a.borrar",function(){
        //Recupera datos del formulario
        var codigo = $(this).data("codigo");

        swal({
              title: '¿Está seguro?',
              text: "¿Realmente desea borrar la grupofamiliar con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/grupofamiliar/controladorGrupofamiliar.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'La grupofamiliar con codigo : ' + codigo + ' fue borrada',
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
        $("#titulo").html("Listado grupofamiliar");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#grupofamiliar").removeClass("hide");
        $("#grupofamiliar").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva grupofamiliar");
        $("#nuevo-editar" ).load("./php/grupofamiliar/nuevoGrupofamiliar.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#grupofamiliar").removeClass("show");
        $("#grupofamiliar").addClass("hide");
    })

    $("#contenido").on("click","button#grabar",function(){
      
      var datos=$("#fgrupofamiliar").serialize();
       $.ajax({
            type:"get",
            url:"./php/grupofamiliar/controladorGrupofamiliar.php",
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
                $("#titulo").html("Listado grupofamiliar");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#grupofamiliar").removeClass("hide");
                $("#grupofamiliar").addClass("show")
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
       $("#titulo").html("Editar grupofamiliar");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
      
       
        $("#nuevo-editar").load("./php/grupofamiliar/editarGrupofamiliar1.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#grupofamiliar").removeClass("show");
        $("#grupofamiliar").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/grupofamiliar/controladorGrupofamiliar.php", 
           data: {codigo: codigo, accion:'consultar1'},
           dataType:"json"
           }).done(function( grupofamiliar ) {
                if(grupofamiliar.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Grupo familiar no existe!'                         
                    })
                } else {
                    $("#grupofami_codi").val(grupofamiliar.codigo1);                   
                    $("#grupofami_nomb").val(grupofamiliar.grupofamiliar1);
                }
           });
               
       });
}

$("#contenido").on("click","a.Representante",function(){
    $("#titulo").html("Representante");
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
                    $("#representante_edad").val("no Existe");                   
                    $("#representante_dir").val("no existe");
                    $("#representante_tel").val("no Existe");                   
                    $("#representante_email").val("no existe");
                     swal({
                       type: 'error',
                       title: 'Oops...',
                       text: 'Grupo Familiar no existe!'                    
                     })
                 } else {
                     $("#representante_codi").val(representantes.codigo);                   
                     $("#representante_nomb").val(representantes.representante);
                     $("#representante_edad").val(representantes.edad);                   
                     $("#representante_dir").val(representantes.dir);
                     $("#representante_tel").val(representantes.tel);                   
                     $("#representante_email").val(representantes.email);
                 }
            });

  });


$(document).ready(() => {
 $("#contenido").off("click", "a.editar");
  $("#contenido").off("click", "button#actualizar");
  $("#contenido").off("click","a.borrar");
  $("#contenido").off("click","button#nuevo");
  $("#contenido").off("click","button#grabar");
 // $("#contenido").off("click","button#GrupoFamiliar");
  $("#titulo").html("Listado de grupofamiliar");
  dt = $("#tabla").DataTable({
        "ajax": "php/grupofamiliar/controladorGrupofamiliar.php?accion=listar",
        "columns": [
            { "data": "grupofami_codi"} ,
            { "data": "grupofami_nomb" },

            
            { "data": "grupofami_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-primary btn-sm Representante">'+"Representante"+' <i class="fa fa-building"></i></a>';
                }
            },
            { "data": "grupofami_codi",

                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "grupofami_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  grupofamiliar();
});