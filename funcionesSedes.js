var dt;

function Sedes(){
    $("#contenido").on("click","button#actualizar",function(){
         var datos=$("#fsede").serialize();
         $.ajax({
            type:"get",
            url:"./php/sedes/controladorSedes.php",
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
                $("#titulo").html("Listado Sedes");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#Sedes").removeClass("hide");
                $("#Sedes").addClass("show")
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
              text: "¿Realmente desea borrar la Sedes con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/sedes/controladorSedes.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El Sedes con codigo : ' + codigo + ' fue borrado',
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
        $("#titulo").html("Listado Sedes");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#Sedes").removeClass("hide");
        $("#Sedes").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $("#contenido").on("click","button#nuevo",function(){
        $("#titulo").html("Nueva Sede");
        $("#nuevo-editar" ).load("./php/sedes/nuevoSedes.php"); 
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#Sedes").removeClass("show");
        $("#Sedes").addClass("hide");
         $.ajax({
             type:"get",
             url:"./php/ciudad/controladorCiudad.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#ciu_codi option").remove()       
              $("#ciu_codi").append("<option selecte value=''>Seleccione un ciudad</option>")
              $.each(resultado.data, function (index, value) { 
                $("#ciu_codi").append("<option value='" + value.ciu_codi + "'>" + value.ciu_nomb + "</option>")
              });
           });

          $.ajax({
             type:"get",
             url:"./php/gerentes/controladorGerente.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#geren_codi option").remove()       
              $("#geren_codi").append("<option selecte value=''>Seleccione un gerente</option>")
              $.each(resultado.data, function (index, value) { 
                $("#geren_codi").append("<option value='" + value.geren_codi + "'>" + value.geren_nomb + "</option>")
              });
           });

           $.ajax({
             type:"get",
             url:"./php/directores/controladorDirectores.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {   
              //console.log(resultado.data)           
              $("#dir_codi option").remove()       
              $("#dir_codi").append("<option selecte value=''>Seleccione un director</option>")
              $.each(resultado.data, function (index, value) { 
                $("#dir_codi").append("<option value='" + value.dir_codi + "'>" + value.dir_nomb + "</option>")
              });
           });
    })

    $("#contenido").on("click","button#grabar",function(){
        /*var comu_codi = $("#comu_codi").attr("value");
        var comu_nomb = $("#comu_nomb").attr("value");
        var muni_codi = $("#muni_codi").attr("value");
        var datos = "comu_codi="+comu_codi+"&comu_nomb="+comu_nomb+"&muni_codi="+muni_codi;*/
      
      var datos=$("#fsede").serialize();
       $.ajax({
            type:"get",
            url:"./php/sedes/controladorSedes.php",
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
                $("#titulo").html("Listado Sedes");
                $("#nuevo-editar").html("");
                $("#nuevo-editar").removeClass("show");
                $("#nuevo-editar").addClass("hide");
                $("#Sedes").removeClass("hide");
                $("#Sedes").addClass("show")
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
       $("#titulo").html("Editar Sedes");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var ciudad;
       var gerente;
       var directores;
        $("#nuevo-editar").load("./php/sedes/editarSedes.php");
        $("#nuevo-editar").removeClass("hide");
        $("#nuevo-editar").addClass("show");
        $("#Sedes").removeClass("show");
        $("#Sedes").addClass("hide");
       $.ajax({
           type:"get",
           url:"./php/sedes/controladorSedes.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( Sedes ) {        
                if(Sedes.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Sedecia no existe!!!!!'                         
                    })
                } else {
                    $("#sede_codi").val(Sedes.codigo);                   
                    $("#sede_nomb").val(Sedes.sedes);
                    ciudad = Sedes.ciudad;
                    gerente = Sedes.gerente;
                    directores = Sedes.director;
                }
           });

           $.ajax({
             type:"get",
             url:"./php/ciudad/controladorCiudad.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#ciu_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(ciudad === value.ciu_codi){
                  $("#ciu_codi").append("<option selected value='" + value.ciu_codi + "'>" + value.ciu_nomb + "</option>")
                }else {
                  $("#ciu_codi").append("<option value='" + value.ciu_codi + "'>" + value.ciu_nomb + "</option>")
                }
              });
           });  

           $.ajax({
             type:"get",
             url:"./php/gerentes/controladorGerente.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#geren_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(gerente === value.geren_codi){
                  $("#geren_codi").append("<option selected value='" + value.geren_codi + "'>" + value.geren_nomb + "</option>")
                }else {
                  $("#geren_codi").append("<option value='" + value.geren_codi + "'>" + value.geren_nomb + "</option>")
                }
              });
           });  
           //directores Pendientesdir_codi
           
           $.ajax({
             type:"get",
             url:"./php/directores/controladorDirectores.php",
             data: {accion:'listar'},
             dataType:"json"
           }).done(function( resultado ) {                     
              $("#dir_codi option").remove();
              $.each(resultado.data, function (index, value) { 
                
                if(directores === value.dir_codi){
                  $("#dir_codi").append("<option selected value='" + value.dir_codi + "'>" + value.dir_nomb + "</option>")
                }else {
                  $("#dir_codi").append("<option value='" + value.dir_codi + "'>" + value.dir_nomb + "</option>")
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
  $("#titulo").html("Listado de Sedes");
  dt = $("#tabla").DataTable({
        "ajax": "php/sedes/controladorSedes.php?accion=listar",
        "columns": [
            { "data": "sede_codi"} ,
            { "data": "sede_nomb" },
            { "data": "ciu_nomb" },
            { "data": "geren_nomb" },
            { "data": "dir_nomb" },
            { "data": "sede_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "sede_codi",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  Sedes();
});