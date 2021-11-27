var dt;

function Citas(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fCitas").serialize();
         $.ajax({
            type:"get",
            url:"./php/citas/controladorCitas.php",
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
                $("#titulo").html("Listado Citases");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#Citas").removeClass("hide");
                $("#Citas").addClass("show")
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
              text: "¿Realmente desea borrar la Citas con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/citas/controladorCitas.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El Citas con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado Citas");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#Citas").removeClass("hide");
        $("#Citas").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva Citas");
        $("#nuevo-editar" ).load("./php/citas/nuevoCitas.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#Citas").removeClass("show");
        $("#Citas").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/paciente/controladorPacientes.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#paciente_codi option").remove()       
              $("#paciente_codi").append("<option selecte value=''>Seleccione un pacientes</option>")
              $.each(resultado.data, function (index, value) { 
                $("#paciente_codi").append("<option value='" + value.paciente_codi + "'>" + value.paciente_nomb + "</option>")
              });
           });
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fCitas").serialize();
       $.ajax({
            type:"get",
            url:"./php/citas/controladorCitas.php",
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
                $("#titulo").html("Listado Citas");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#Citas").removeClass("hide");
                $("#Citas").addClass("show")
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
       $("#titulo").html("Editar Citas");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var pacientes;
        $("#nuevo-editar").load("./php/citas/editarCitas.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#Citas").removeClass("show");
        $("#Citas").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/citas/controladorCitas.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( Citas ) {        
                if(Citas.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Citas no existe!!!!!'                         
                    })
                } else {
                    $("#cita_codi").val(Citas.codigo);                   
                    pacientes = Citas.paciente;
                    $("#fecha").val(Citas.fecha);
                    $("#hora").val(Citas.hora);
                    $("#razon").val(Citas.razon);
                }
           });

           $.ajax({
             type:"get",
             url:"./php/paciente/controladorPacientes.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#paciente_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(pacientes === value.paciente_codi){
                  $("#paciente_codi").append("<option selected value='" + value.paciente_codi + "'>" + value.paciente_nomb + "</option>")
                }else {
                  $("#paciente_codi").append("<option value='" + value.paciente_codi + "'>" + value.paciente_nomb + "</option>")
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
  $("#titulo").html("Listado de Citases");
  dt = $("#tabla").DataTable({
        "ajax": "php/citas/controladorCitas.php?accion=listar",
        "columns": [
            { "data": "cita_codi"} ,
            { "data": "paciente_nomb" },
            { "data": "fecha" },
            { "data": "hora" },
            { "data": "razon" },
            { "data": "cita_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "cita_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  Citas();
});