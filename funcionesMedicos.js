var dt;

function medico(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fmedico").serialize();
         $.ajax({
            type:"get",
            url:"./php/medico/controladorMedico.php",
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
                $("#titulo").html("Listado Medico");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#medico").removeClass("hide");
                $("#medico").addClass("show")
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
              text: "¿Realmente desea borrar la medico con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/medico/controladorMedico.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'La medico con codigo : ' + codigo + ' fue borrada',
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
        $("#titulo").html("Listado Medicos");
        $("#nuevo-editar").html("");
        $("#nuevo-editar" ).load("./php/medico/index.php"); 
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#medico").removeClass("hide");
        $("#medico").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nuevo Medico");
        $("#nuevo-editar" ).load("./php/medico/nuevoMedico.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#medico").removeClass("show");
        $("#medico").addClass("hide");
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fmedico").serialize();
       $.ajax({
            type:"get",
            url:"./php/medico/controladorMedico.php",
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
                $("#titulo").html("Listado medicos");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#medico").removeClass("hide");
                $("#medico").addClass("show")
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
       $("#titulo").html("Editar Medicos");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       
        $("#nuevo-editar").load("./php/medico/editarMedico.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#medico").removeClass("show");
        $("#medico").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/medico/controladorMedico.php", 
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( medico ) {
                if(medico.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Medicos no existe!'                         
                    })
                } else {
                    $("#medi_codi").val(medico.codigo);                   
                    $("#medi_nomb").val(medico.medicos);
                    $("#medi_edad").val(medico.edad);
                    $("#medi_tel").val(medico.tel);
                }
           });
               
       })
}

$("#contenido").on("click","a.pacientesmedi",function(){
    $("#titulo").html("Pacientes");
    //Recupera datos del fromulario
    var codigo = $(this).attr("codigo");

    $.ajax({
      type:"post",
      url:"./php/pacientemedi/index.php",
      data:"codigo=" + codigo,
      dataType:"html"
          }) .done(function( result ) {
            $("#contenedor").removeClass("hide");
          $("#contenedor").addClass("show");
          $("#titulo").html("Listado de Pacientes");
              $("#contenido" ).html(result);
            //$("#contenido").html(result);
          });
  });


$(document).ready(() => {
  $("#contenido").off("click", "a.editar");
  $("#contenido").off("click", "button#actualizar");
  $("#contenido").off("click","a.borrar");
  $("#contenido").off("click","button#nuevo");
  $("#contenido").off("click","button#grabar");
  $("#contenido").off("click","button#pacientes");
  $("#titulo").html("Listado de Medicos");
  dt = $("#tabla").DataTable({
        "ajax": "php/medico/controladorMedico.php?accion=listar",
        "columns": [
            { "data": "medi_codi"},
            { "data": "medi_nomb"},
            { "data": "medi_edad"},
            { "data": "medi_tel"},
            
            { "data": "medi_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-primary btn-sm pacientesmedi">'+"Pacientes  " +'<i class="fa fa-building"></i></a>';
                }
            },
            { "data": "medi_codi",

                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "medi_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  medico();
});