var dt;

function ventaf(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fventaf").serialize();
         $.ajax({
            type:"get",
            url:"./php/ventayfacturacion/controladorVentayfacturacion.php",
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
                $("#titulo").html("Listado ventayfacturacion");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#ventayfacturacion").removeClass("hide");
                $("#ventayfacturacion").addClass("show")
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
              text: "¿Realmente desea borrar la ventayfacturacion con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/ventayfacturacion/controladorVentayfacturacion.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El ventayfacturacion con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado ventayfacturacion");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#ventayfacturacion").removeClass("hide");
        $("#ventayfacturacion").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva Venta");
        $("#nuevo-editar" ).load("./php/ventayfacturacion/nuevoVentayfacturacion.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#ventayfacturacion").removeClass("show");
        $("#ventayfacturacion").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/clientes/controladorClientes.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#clien_codi option").remove()       
              $("#clien_codi").append("<option selecte value=''>Seleccione un Cliente</option>")
              $.each(resultado.data, function (index, value) { 
                $("#clien_codi").append("<option value='" + value.clien_codi + "'>" + value.clien_nomb + "</option>")
              });
           });

          $.ajax({
             type:"get",
             url:"./php/productos/controladorProductos.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#produ_codi option").remove()       
              $("#produ_codi").append("<option selecte value=''>Seleccione un Producto</option>")
              $.each(resultado.data, function (index, value) { 
                $("#produ_codi").append("<option value='" + value.produ_codi + "'>" + value.produ_nomb + "</option>")
              });
           });
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fventaf").serialize();
       $.ajax({
            type:"get",
            url:"./php/ventayfacturacion/controladorVentayfacturacion.php",
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
                $("#titulo").html("Listado ventayfacturacion");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#ventayfacturacion").removeClass("hide");
                $("#ventayfacturacion").addClass("show")
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
       $("#titulo").html("Editar ventayfacturacion");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var clientes;
       var productos;
        $("#nuevo-editar").load("./php/ventayfacturacion/editarVentayfacturacion.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#ventayfacturacion").removeClass("show");
        $("#ventayfacturacion").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/ventayfacturacion/controladorVentayfacturacion.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( ventayfacturacion ) {        
                if(ventayfacturacion.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Farmacia no existe!!!!!'                         
                    })
                } else {
                    $("#venta_codi").val(ventayfacturacion.codigo);  
                    clientes = ventayfacturacion.clientes;
                    productos = ventayfacturacion.productos;                 
                    $("#produ_cant").val(ventayfacturacion.cantidad);
                    $("#fecha").val(ventayfacturacion.fecha);
                    
                }
           });

           $.ajax({
             type:"get",
             url:"./php/clientes/controladorClientes.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#clien_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(clientes === value.clien_codi){
                  $("#clien_codi").append("<option selected value='" + value.clien_codi + "'>" + value.clien_nomb + "</option>")
                }else {
                  $("#clien_codi").append("<option value='" + value.clien_codi + "'>" + value.clien_nomb + "</option>")
                }
              });
           });  

           $.ajax({
             type:"get",
             url:"./php/productos/controladorProductos.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#produ_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(productos === value.produ_codi){
                  $("#produ_codi").append("<option selected value='" + value.produ_codi + "'>" + value.produ_nomb + "</option>")
                }else {
                  $("#produ_codi").append("<option value='" + value.produ_codi + "'>" + value.produ_nomb + "</option>")
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
  $("#titulo").html("Listado de ventayfacturacion");
  dt = $("#tabla").DataTable({
        "ajax": "php/ventayfacturacion/controladorVentayfacturacion.php?accion=listar",
        "columns": [
            { "data": "venta_codi"} ,
            { "data": "clien_nomb" },
            { "data": "produ_nomb" },
            { "data": "produ_cant" },
            { "data": "fecha" },
            { "data": "venta_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "venta_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  ventaf();
});