var dt;

function empleados(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fempleados").serialize();
         $.ajax({
            type:"get",
            url:"./php/empleados/controladorEmpleados.php",
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
                $("#titulo").html("Listado empleados");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#empleados").removeClass("hide");
                $("#empleados").addClass("show")
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
              text: "¿Realmente desea borrar la empleados con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/empleados/controladorEmpleados.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El empleados con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado empleados");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#empleados").removeClass("hide");
        $("#empleados").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva empleados");
        $("#nuevo-editar" ).load("./php/empleados/nuevoEmpleados.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#empleados").removeClass("show");
        $("#empleados").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/sedes/controladorSedes.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#sede_codi option").remove()       
              $("#sede_codi").append("<option selecte value=''>Seleccione una Sede</option>")
              $.each(resultado.data, function (index, value) { 
                $("#sede_codi").append("<option value='" + value.sede_codi + "'>" + value.sede_nomb + "</option>")
              });
           });
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fempleados").serialize();
       $.ajax({
            type:"get",
            url:"./php/empleados/controladorEmpleados.php",
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
                $("#titulo").html("Listado empleados");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#empleados").removeClass("hide");
                $("#empleados").addClass("show")
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
       $("#titulo").html("Editar empleados");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var sedes;
        $("#nuevo-editar").load("./php/empleados/editarEmpleados.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#empleados").removeClass("show");
        $("#empleados").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/empleados/controladorEmpleados.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( empleados ) {        
                if(empleados.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'empleados no existe!!!!!'                         
                    })
                } else {
                    $("#emple_codi").val(empleados.codigo);                   
                    $("#emple_nomb").val(empleados.empleado);
                    sedes = empleados.sedes;
                }
           });

           $.ajax({
             type:"get",
             url:"./php/sedes/controladorSedes.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#sede_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(sedes === value.sede_codi){
                  $("#sede_codi").append("<option selected value='" + value.sede_codi + "'>" + value.sede_nomb + "</option>")
                }else {
                  $("#sede_codi").append("<option value='" + value.sede_codi + "'>" + value.sede_nomb + "</option>")
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
  $("#titulo").html("Listado de empleados");
  dt = $("#tabla").DataTable({
        "ajax": "php/empleados/controladorEmpleados.php?accion=listar",
        "columns": [
            { "data": "emple_codi"} ,
            { "data": "emple_nomb" },
            { "data": "sede_nomb" },
            { "data": "emple_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "emple_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  empleados();
});