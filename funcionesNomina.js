var dt;

function nomina(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fnomina").serialize();
         $.ajax({
            type:"get",
            url:"./php/nomina/controladorNomina.php",
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
                $("#titulo").html("Listado Nomina");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#nomina").removeClass("hide");
                $("#nomina").addClass("show")
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
              text: "¿Realmente desea borrar la nomina con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/nomina/controladorNomina.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El nomina con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado nomina");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#nomina").removeClass("hide");
        $("#nomina").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva nomina");
        $("#nuevo-editar" ).load("./php/nomina/nuevoNomina.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#nomina").removeClass("show");
        $("#nomina").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/empleados/controladorEmpleados.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#emple_codi option").remove()       
              $("#emple_codi").append("<option selecte value=''>Seleccione un empleado</option>")
              $.each(resultado.data, function (index, value) { 
                $("#emple_codi").append("<option value='" + value.emple_codi + "'>" + value.emple_nomb + "</option>")
              });
           });
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fnomina").serialize();
       $.ajax({
            type:"get",
            url:"./php/nomina/controladorNomina.php",
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
                $("#titulo").html("Listado Nomina");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#nomina").removeClass("hide");
                $("#nomina").addClass("show")
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
       $("#titulo").html("Editar Nomina");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var empleados;
        $("#nuevo-editar").load("./php/nomina/editarNomina.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#nomina").removeClass("show");
        $("#nomina").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/nomina/controladorNomina.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( nomina ) {        
                if(nomina.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'nomina no existe!!!!!'                         
                    })
                } else {
                    $("#pago_codi").val(nomina.codigo);                   
                    $("#pago_cant").val(nomina.nomina);
                    empleados = nomina.empleados;
                }
           });

           $.ajax({
             type:"get",
             url:"./php/empleados/controladorEmpleados.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#emple_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(empleados === value.emple_codi){
                  $("#emple_codi").append("<option selected value='" + value.emple_codi + "'>" + value.emple_nomb + "</option>")
                }else {
                  $("#emple_codi").append("<option value='" + value.emple_codi + "'>" + value.emple_nomb + "</option>")
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
  $("#titulo").html("Listado de Nomina");
  dt = $("#tabla").DataTable({
        "ajax": "php/nomina/controladorNomina.php?accion=listar",
        "columns": [
            { "data": "pago_codi"} ,
            { "data": "pago_cant" },
            { "data": "emple_nomb" },
            { "data": "pago_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "pago_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  nomina();
});