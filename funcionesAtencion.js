var dt;

function atencion(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fatencion").serialize();
         $.ajax({
            type:"get",
            url:"./php/atencion/controladorAtencion.php",
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
                $("#titulo").html("Listado Atencion");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#atencion").removeClass("hide");
                $("#atencion").addClass("show")
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
              text: "¿Realmente desea borrar la atencion con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/atencion/controladorAtencion.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'La atencion con codigo : ' + codigo + ' fue borrada',
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
    $("#titulo").html("Listado de Atencions");
    $( "#contenido" ).load("./php/atencion/index.php");  
  })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#titulo").html("Listado de Atencions");
    $( "#contenido" ).load("./php/atencion/index.php");  
  })
/*
    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva Atencion");
        $("#nuevo-editar" ).load("./php/atencion/nuevoAtencion.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#atencion").removeClass("show");
        $("#atencion").addClass("hide");
        $.ajax({
            type:"get",
            url:"./php/medico/controladorMedico.php",
            data: {accion:'listar'},
            dataType:"json"
          }).done(function( resultado ) {   
             console.log(resultado.data)           
            // $("#pais_codi option").remove()       
             $("#medi_codi").append("<option selecte value=''>Seleccione un medico</option>")
             $.each(resultado.data, function (index, value) { 
               $("#medi_codi").append("<option value='" + value.medi_codi + "'>" + value.medi_nomb + "</option>")
             });
          });

          $.ajax({
            type:"get",
            url:"./php/paciente/controladorPacientes.php",
            data: {accion:'listar'},
            dataType:"json"
          }).done(function( resultado ) {   
             console.log(resultado.data)           
            // $("#pais_codi option").remove()       
             $("#paciente_codi").append("<option selecte value=''>Seleccione un paciente</option>")
             $.each(resultado.data, function (index, value) { 
               $("#paciente_codi").append("<option value='" + value.paciente_codi + "'>" + value.paciente_nomb + "</option>")
             });
          });
    })
*/
    $("#contenido").on("click","button#grabar",function(){
      
        var datos=$("#fatencion").serialize();
         $.ajax({
              type:"get",
              url:"./php/atencion/controladorAtencion.php",
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
                  $("#titulo").html("Listado Historial");
                  $("#nuevo-editar").html("");
                  $("#nuevo-editar").removeClass("show");
                  $("#nuevo-editar").addClass("hide");
                  $("#atencion").removeClass("hide");
                  $("#atencion").addClass("show")
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
       $("#titulo").html("Editar Atencion");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       
        $("#nuevo-editar").load("./php/atencion/editarAtencion.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#atencion").removeClass("show");
        $("#atencion").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/atencion/controladorAtencion.php", 
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( atencion ) {
                if(atencion.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Paciente no existe!'                         
                    })
                } else {
                    $("#aten_codi").val(atencion.codigo);                   
                    $("#medi_codi").val(atencion.medico);
                    $("#paciente_codi").val(atencion.paciente);
                    $("#Fecha").val(atencion.fecha);
                    $("#Hora").val(atencion.hora);
                    $("#diag_desc").val(atencion.diagnostico);
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
  $("#contenido").off("click","button#GrupoFamiliar");
  $("#titulo").html("Listado de Pacientes");
  dt = $("#tabla").DataTable({
        "ajax": "php/atencion/controladorAtencion.php?accion=listar",
        "columns": [
            { "data": "aten_codi"} ,
            { "data": "medi_nomb" },
            { "data": "paciente_nomb"} ,
            { "data": "Fecha"} ,
            { "data": "Hora"} ,
            { "data": "diag_desc" }
        ]
  });
  atencion();
});