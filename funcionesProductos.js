var dt;

function Productos(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fproductos").serialize();
         $.ajax({
            type:"get",
            url:"./php/productos/controladorProductos.php",
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
                $("#titulo").html("Listado Productos");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#productos").removeClass("hide");
                $("#productos").addClass("show");
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
              text: "¿Realmente desea borrar el productos con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/productos/controladorProductos.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El productos con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado productos");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#productos").removeClass("hide");
        $("#productos").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('');
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nuevo Productos");
        $("#nuevo-editar" ).load("./php/productos/nuevoProductos.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#productos").removeClass("show");
        $("#productos").addClass("hide");
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fproductos").serialize();
       $.ajax({
            type:"get",
            url:"./php/productos/controladorProductos.php",
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
                $("#titulo").html("Listado Productos");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#productos").removeClass("hide");
                $("#productos").addClass("show");
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
       $("#titulo").html("Editar Productos");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
        $("#nuevo-editar").load("./php/productos/editarProductos.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#productos").removeClass("show");
        $("#productos").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/productos/controladorProductos.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( productos ) {        
                if(productos.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Pais no existe!!!!!'                         
                    })
                } else {
                    $("#produ_codi").val(productos.codigo);                   
                    $("#produ_nomb").val(productos.productos);
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
  $("#titulo").html("Listado de Productos");
  dt = $("#tabla").DataTable({
        "ajax": "php/productos/controladorProductos.php?accion=listar",
        "columns": [
            { "data": "produ_codi"} ,
            { "data": "produ_nomb" },
            { "data": "produ_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "produ_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  Productos();
});