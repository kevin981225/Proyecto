var dt;

function inventario(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#finven").serialize();
         $.ajax({
            type:"get",
            url:"./php/inventario/controladorInventario.php",
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
                $("#titulo").html("Listado inventario");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#inventario").removeClass("hide");
                $("#inventario").addClass("show")
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
              text: "¿Realmente desea borrar la inventario con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/inventario/controladorInventario.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El inventario con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado inventario");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#inventario").removeClass("hide");
        $("#inventario").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva inventario");
        $("#nuevo-editar" ).load("./php/inventario/nuevoInventario.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#inventario").removeClass("show");
        $("#inventario").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/productos/controladorProductos.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#produ_codi option").remove()       
              $("#produ_codi").append("<option selecte value=''>Seleccione un productos</option>")
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
      
      var datos=$("#finven").serialize();
       $.ajax({
            type:"get",
            url:"./php/inventario/controladorInventario.php",
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
                $("#titulo").html("Listado inventario");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#inventario").removeClass("hide");
                $("#inventario").addClass("show")
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
       $("#titulo").html("Editar inventario");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var productos;
        $("#nuevo-editar").load("./php/inventario/editarInventario.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#inventario").removeClass("show");
        $("#inventario").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/inventario/controladorCiudad.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( inventario ) {        
                if(inventario.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'inventario no existe!!!!!'                         
                    })
                } else {
                    $("#inven_codi").val(inventario.codigo);      
                    productos = inventario.productos;             
                    $("#cant").val(inventario.cantidad);
                    $("#fecha").val(inventario.fecha);
                    
                }
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
  $("#titulo").html("Listado de inventario");
  dt = $("#tabla").DataTable({
        "ajax": "php/inventario/controladorInventario.php?accion=listar",
        "columns": [
            { "data": "inven_codi"} ,
            { "data": "produ_nomb" },
            { "data": "cant" },
            { "data": "fecha" },
            { "data": "inven_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "inven_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  inventario();
});