//Validamos el formulario una vez rellenado

var oBtnAnadirCliente = document.frmAltaCliente.btnAnadirCliente;
oBtnAnadirCliente.addEventListener("click", anadirCliente, false);

var oBtnEliminarCliente = document.frmBajaCliente.btnEliminarCliente;
oBtnEliminarCliente.addEventListener("click", eliminarCliente, false);

function validarClientes(formulario)
{
	var bCliente = true;
	var sError = ""; 

	//DNI
	var dniCliente = formulario.txtDNICliente.value.trim();
	if(oExpRegValidarDni.test(dniCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtDNICliente.focus();
		}
		claseError(formulario, 0);
		sError += "DNI incorrecto<br>";
	}
	else
	{
		quitarError(formulario, 0);
	}

	//NOMBRE
	var nombreCliente = formulario.txtNombreCliente.value.trim();
	if(oExpRegValidarNombre.test(nombreCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtNombreCliente.focus();
		}
		claseError(formulario, 1);
		sError += "Nombre incorrecto<br>";
	}
	else
	{
		quitarError(formulario, 1);
	}

	//APELLIDOS
	var apellidoCliente = formulario.txtApellidoCliente.value.trim();
	if(oExpRegValidarApellidos.test(apellidoCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtApellidoCliente.focus();
		}
		claseError(formulario, 2);
		sError += "Apellidos incorrectos<br>";
	}
	else
	{
		quitarError(formulario, 2);
	}

	//TELEFONO
	var telClientes = formulario.txtTelefonoCliente.value.trim();
	if(oExpRegValidarTelefono.test(telClientes) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtTelefonoCliente.focus();
		}
		claseError(formulario, 3);
		sError += "Teléfono incorrecto<br>";
	}
	else
	{
		quitarError(formulario, 3);
	}

	//CP
	var cpCliente = formulario.txtCPostalCliente.value.trim();
	if(oExpRegValidarCP.test(cpCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtCPostalCliente.focus();
		}
		claseError(formulario, 6);
		sError += "Código postal incorrecto<br>";
	}
	else
	{
		quitarError(formulario, 6);
	}
	return bCliente;
}

function anadirCliente() 
{
	var sMensaje = "";
	formulario = document.frmAltaCliente;

	if(validarClientes(formulario))
	{
		var dniCliente = document.frmAltaCliente.txtDNICliente.value.trim();
		var nombreCliente = document.frmAltaCliente.txtNombreCliente.value.trim();
		var apellidoCliente = document.frmAltaCliente.txtApellidoCliente.value.trim();
		var telClientes = document.frmAltaCliente.txtTelefonoCliente.value.trim();
		var dirCliente = document.frmAltaCliente.txtDireccionCliente.value.trim();
		var localidadCliente = document.frmAltaCliente.txtLocalidadCliente.value.trim();
		var cpCliente = document.frmAltaCliente.txtCPostalCliente.value.trim();

		var oCliente = new Cliente(dniCliente,nombreCliente, apellidoCliente, telClientes, dirCliente, localidadCliente, cpCliente);

		var bAltaCliente = oGestion.altaCliente(oCliente);

		if (bAltaCliente) 
		{
			actualizaCombos("clientes");
			sMensaje = "Cliente dado de alta";
			mostrarMensaje(sMensaje);
			document.frmAltaCliente.reset();			
		}

		else
		{
			sMensaje = "Cliente ya existente";
			mostrarMensaje(sMensaje);
			claseError(document.frmAltaCliente, 0);
		}
	} 
}

function eliminarCliente()
{
    var clienteEliminar = document.getElementById("selectCliente").value;
    alert(clienteEliminar);

    if(oGestion.eliminarCliente(clienteEliminar)){
    	actualizaCombos("clientes");
    	mostrarMensaje("Cliente eliminado");
    }
    else
    	mostrarMensaje("Cliente no existe");
}

function camposFormModificarCliente()
{
	var dniClienteModificar = document.getElementById("selectModificarCliente").firstChild.value;
	var antiguoCliente = oGestion.buscarCliente(dniClienteModificar);

	CamposFormulario = document.getElementById("frmModClienteSeleccionado").getElementsByTagName("input");

	CamposFormulario[0].value = antiguoCliente.dniCliente;
    CamposFormulario[1].value = antiguoCliente.nombreCliente;
    CamposFormulario[2].value = antiguoCliente.apellidoCliente;
    CamposFormulario[3].value = antiguoCliente.telClientes;
    CamposFormulario[4].value = antiguoCliente.dirCliente;
    CamposFormulario[5].value = antiguoCliente.localidadCliente;
    CamposFormulario[6].value = antiguoCliente.cpCliente;

}

function modificarCliente()
{	
	formulario=document.frmModClienteSeleccionado;
	if(validarClientes(formulario)){
		var dniCliente = formulario.txtDNICliente.value.trim();
		var nombreCliente = formulario.txtNombreCliente.value.trim();
		var apellidoCliente = formulario.txtApellidoCliente.value.trim();
		var telClientes = formulario.txtTelefonoCliente.value.trim();
		var dirCliente = formulario.txtDireccionCliente.value.trim();
		var localidadCliente = formulario.txtLocalidadCliente.value.trim();
		var cpCliente = formulario.txtCPostalCliente.value.trim();

		var oCliente = new Cliente(dniCliente,nombreCliente, apellidoCliente, telClientes, dirCliente, localidadCliente, cpCliente);

		var clienteaModificar = document.getElementById("selectModificarCliente").firstChild.value;

		if(oGestion.modificarCliente(clienteaModificar,oCliente)){
	    	actualizaCombos("clientes");
	    	mostrarMensaje("Cliente actualizado");
	   }
	}
}

function tablaClientes()
{	
	// var oTabla = document.createElement("TABLE");
	// oTabla.setAttribute("table", "table-striped");
	// oTabla.id = "tablaListada";

	var sTabla = "<table id='tablaListada' class='table table-striped'>"+
    "<thead>"+
      "<tr>"+
        "<th>DNI</th>"+
        "<th>Nombre</th>"+
        "<th>Apellidos</th>"+
        "<th>Teléfono</th>"+
        "<th>Direccion</th>"+
        "<th>Localidad</th>"+
        "<th>C.Postal</th>"+
      "</tr>"+
    "</thead>"+
    "<tbody>";

    sTabla += oGestion.sRowHTMLClientes();

    sTabla += "</tbody>"+
  "</table>"+
"</div>";
	return sTabla;
}

