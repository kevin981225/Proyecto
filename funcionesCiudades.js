var dt;

function ciudad(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fciudad").serialize();
         $.ajax({
            type:"get",
            url:"./php/ciudad/controladorCiudad.php",
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
                $("#titulo").html("Listado Ciudades");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#ciudad").removeClass("hide");
                $("#ciudad").addClass("show")
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
              text: "¿Realmente desea borrar la ciudad con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/ciudad/controladorCiudad.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El ciudad con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado Ciudad");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#ciudad").removeClass("hide");
        $("#ciudad").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva Ciudad");
        $("#nuevo-editar" ).load("./php/ciudad/nuevoCiudad.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#ciudad").removeClass("show");
        $("#ciudad").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/pais/controladorPais.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#pais_codi option").remove()       
              $("#pais_codi").append("<option selecte value=''>Seleccione un pais</option>")
              $.each(resultado.data, function (index, value) { 
                $("#pais_codi").append("<option value='" + value.pais_codi + "'>" + value.pais_nomb + "</option>")
              });
           });
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fciudad").serialize();
       $.ajax({
            type:"get",
            url:"./php/ciudad/controladorCiudad.php",
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
                $("#titulo").html("Listado Ciudad");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#ciudad").removeClass("hide");
                $("#ciudad").addClass("show")
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
       $("#titulo").html("Editar Ciudad");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var pais;
        $("#nuevo-editar").load("./php/ciudad/editarCiudad.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#ciudad").removeClass("show");
        $("#ciudad").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/ciudad/controladorCiudad.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( ciudad ) {        
                if(ciudad.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Ciudad no existe!!!!!'                         
                    })
                } else {
                    $("#ciu_codi").val(ciudad.codigo);                   
                    $("#ciu_nomb").val(ciudad.ciudad);
                    pais = ciudad.pais;
                }
           });

           $.ajax({
             type:"get",
             url:"./php/pais/controladorPais.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#pais_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(pais === value.pais_codi){
                  $("#pais_codi").append("<option selected value='" + value.pais_codi + "'>" + value.pais_nomb + "</option>")
                }else {
                  $("#pais_codi").append("<option value='" + value.pais_codi + "'>" + value.pais_nomb + "</option>")
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
  $("#titulo").html("Listado de Ciudades");
  dt = $("#tabla").DataTable({
        "ajax": "php/ciudad/controladorCiudad.php?accion=listar",
        "columns": [
            { "data": "ciu_codi"} ,
            { "data": "ciu_nomb" },
            { "data": "pais_nomb" },
            { "data": "ciu_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "ciu_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  ciudad();
});