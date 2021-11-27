var dt;

function paciente(){
   
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

}

$("#contenido").on("click","a.Atencion",function(){
    $("#titulo").html("Atencion");
    //Recupera datos del fromulario
    var codigo = $(this).attr("codigo");
  
    $.ajax({
      type:"post",
      url:"./php/atencion/nuevoAtencion.php",
      data:"codigo=" + codigo,
      dataType:"html"
          }) .done(function( result ) {
            $("#contenedor").removeClass("hide");
          $("#contenedor").addClass("show");
          $("#titulo").html("Listado de Atencion");
              $("#contenido" ).html(result);
            //$("#contenido").html(result);
          });

          $.ajax({
            type:"get",
            url:"./php/medico/controladorMedico.php",
            data: {accion:'listar'},
            dataType:"json"
          }).done(function( resultado ) {   
             console.log(resultado.data)           
             $("#medi_codi option").remove()       
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
             $("#paciente_codi option").remove()       
             $("#paciente_codi").append("<option selecte value=''>Seleccione un paciente</option>")
             $.each(resultado.data, function (index, value) { 
               $("#paciente_codi").append("<option value='" + value.paciente_codi + "'>" + value.paciente_nomb + "</option>")
             });
          });
  });


$(document).ready(() => {
  $("#contenido").off("click", "a.editar");
  $("#contenido").off("click", "button#actualizar");
  $("#contenido").off("click","a.borrar");
  $("#contenido").off("click","button#nuevo");
  $("#contenido").off("click","button#grabar");
  $("#contenido").off("click","button#Atencion");
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
                                 '" class="btn btn-primary btn-sm Atencion">'+"Atender   "+' <i class="fa fa-building"></i></a>';
                }
            }
        ]
  });
  paciente();
});