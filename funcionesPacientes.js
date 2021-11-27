    var dt;

function paciente(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fpaciente").serialize();
         $.ajax({
            type:"get",
            url:"./php/paciente/controladorPacientes.php",
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
                $("#titulo").html("Listado Pacientes");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#paciente").removeClass("hide");
                $("#paciente").addClass("show")
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
              text: "¿Realmente desea borrar la paciente con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/paciente/controladorPacientes.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'La paciente con codigo : ' + codigo + ' fue borrada',
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
        $("#titulo").html("Listado Pacientes");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#paciente").removeClass("hide");
        $("#paciente").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nuevo Paciente");
        $("#nuevo-editar" ).load("./php/paciente/nuevoPaciente.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#paciente").removeClass("show");
        $("#paciente").addClass("hide");
    })

    $("#contenido").on("click","button#grabar",function(){
      
      var datos=$("#fpaciente").serialize();
       $.ajax({
            type:"get",
            url:"./php/paciente/controladorPacientes.php",
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
                $("#titulo").html("Listado Pacientes");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#paciente").removeClass("hide");
                $("#paciente").addClass("show")
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
       $("#titulo").html("Editar Paciente");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
      
       
        $("#nuevo-editar").load("./php/paciente/editarPaciente.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#paciente").removeClass("show");
        $("#paciente").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/paciente/controladorPacientes.php", 
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( paciente ) {
                if(paciente.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Paciente no existe!'                         
                    })
                } else {
                    $("#paciente_codi").val(paciente.codigo);                   
                    $("#paciente_nomb").val(paciente.paciente);
                    $("#paciente_edad").val(paciente.edad);
                    $("#paciente_tel").val(paciente.tel);
                    $("#paciente_email").val(paciente.email);
                }
           });
               
       })
}

$("#contenido").on("click","a.GrupoFamiliar",function(){
    $("#titulo").html("GrupoFamiliar");
    //Recupera datos del fromulario
  var codigo = $(this).data("codigo");
         $("#nuevo-editar").load("./php/grupofamiliar/editarGrupofamiliar.php");
         $("#nuevo-editar").removeClass("hide");
         $("#nuevo-editar").addClass("show");
         $("#grupofamiliar").removeClass("show");
         $("#grupofamiliar").addClass("hide");
        $.ajax({
            type:"get",
            url:"./php/grupofamiliar/controladorGrupofamiliar.php", 
            data: {codigo: codigo, accion:'consultar'},
            dataType:"json"
            }).done(function( grupofamiliar ) {
                 if(grupofamiliar.respuesta === "no existe"){
                    $("#grupofami_codi").val("no Existe");                   
                    $("#grupofami_nomb").val("no existe");
                     swal({
                       type: 'error',
                       title: 'Oops...',
                       text: 'Grupo Familiar no existe!'                    
                     })
                 } else {
                     $("#grupofami_codi").val(grupofamiliar.codigo);                   
                     $("#grupofami_nomb").val(grupofamiliar.grupofamiliar);
                     
                 }
            });

  });


$(document).ready(() => {
  $("#contenido").off("click", "a.editar");
  $("#contenido").off("click", "button#actualizar");
  $("#contenido").off("click","a.borrar");
  $("#contenido").off("click","button#nuevo");
  $("#contenido").off("click","button#grabar");
  $("#contenido").off("click","button#GrupoFamiliar");
  $("#titulo").html("Listado de Pacientes");
  dt = $("#tabla").DataTable({
        "ajax": "php/paciente/controladorPacientes.php?accion=listar",
        "columns": [
            { "data": "paciente_codi"} ,
            { "data": "paciente_nomb" },
            { "data": "paciente_edad"} ,
            { "data": "paciente_tel" },
            { "data": "paciente_email"} ,
            
            { "data": "paciente_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-primary btn-sm GrupoFamiliar">'+"Grupo Familiar"+' <i class="fa fa-building"></i></a>';
                }
            },
            { "data": "paciente_codi",

                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "paciente_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  paciente();
});