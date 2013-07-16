$(function() {

	var listo=false;

	// Enviamos el formulario al pulsar el botón guardar
	$('.guardar_accion').on('click', function(e) {
		e.preventDefault();
		if ($('.guardar_accion').parent().hasClass('success')) {
			// Validamos DNI/NIE
			var dni=$('#dni').val().toUpperCase();
			$('#dni').val(dni);
			if ((/^[TXYZ]{1}[0-9]{7}[A-Z]{1}$/.test(dni)) || (/^[0-9]{8}[A-Z]{1}$/.test(dni))) {
				// Los campos con la clase numero siempre contienen números positivos.
				// Aquellos campos sin rellenar se almacenan con valor -1
				//if ($('.numero').val() == '') $('.numero').val(-1);
				$('.numero').each(function() {
					if ($(this).val()=='') $(this).val(-1);
				});
				$('#guardar_form').submit();
			} else {
				alert('DNI/NIE incorrecto');
				$('#dni').parents('li.field').addClass('danger');
			}
		}
	});

	// Si cambia cualquier campo activamos el botón guardar
	// incluidos los campos que se generan desde javascript (sustituto de live)
	$(document).on('change','input,select,textarea', function(e) {
		if (listo) $('.guardar_accion').html('<i class="icon-floppy"></i>Guardar').parent().addClass('success');
	});

	// Sólo permite la escritura de números en los input con clase numero
	$('input.numero').on('keydown', function(e) {
		if ((e.which < 48 && e.which != 8 && e.which != 9) || e.which > 57) e.preventDefault();
	});

	// Activamos desplegables
	$('.desplegable>ul').hide();
	$('.desplegador').on('change', function() {
		var casilla = $(this)
		  , desplegable = casilla.parents('.desplegable').find('ul').first();
		//if (casilla.is(':checked') || casilla.hasClass('ckecked') || (casilla.val() != 'NO' && casilla.val() != '')) {
		if (casilla.is(':checked') || casilla.hasClass('ckecked') || (casilla.val() == 'SI')) {
			desplegable.slideDown();
		} else {
			desplegable.slideUp();
		}
	});

	// UNIDAD FAMILIAR
	$('#boton_unidad_familiar').on('click', function(e) {
		e.preventDefault();
		var num = parseInt($('#numUnidadFamiliar').val())
		  , desplegados = parseInt($('#unidadfamiliar tr').size())
		  , num_nuevos = num - desplegados;
		for (i=0; i<num_nuevos; i++) {
			var fila = "\n"+'<tr>'+"\n"+
			'	<td class="field"><input name="familiar['+i+'][nacidoEnAnyo]" class="text input numero" type="text" placeholder="Nacido año" /></td>'+"\n"+
			'	<td class="field"><select name="familiar['+i+'][sexo]">'+"\n"+
			'		<option value="" selected>Sexo</option>'+"\n"+
			'		<option value="H">Hombre</option><option value="M">Mujer</option>'+"\n"+
			'	</select></td>'+"\n"+
			'	<td class="field"><select name="familiar['+i+'][situacionLaboral]">'+"\n"+
			'		<option value="">Situación laboral</option>'+"\n"+
			'		<option value="TRABAJO_CON_CONTRATO">Trabajo con contrato</option>'+"\n"+
			'		<option value="TRABAJO_SIN_CONTRATO">Trabajo sin contrato</option>'+"\n"+
			'		<option value="PARADO">Parado</option>'+"\n"+
			'		<option value="AYUDAS_PUBLICAS">Otras ayudas públicas</option>'+"\n"+
			'		<option value="PENSIONISTA">Pensionista</option>'+"\n"+
			'		<option value="ESTUDIANTE">Estudiante</option>'+"\n"+
			'	</select></td>'+
			'	<td class="field"><select name="familiar['+i+'][discapacidad]">'+"\n"+
			'		<option value="" selected>Discapacidad</option>'+"\n"+
			'		<option value="SI">Sí</option>'+"\n"+
			'		<option value="NO">No</option>'+"\n"+
			'	</select></td>'+
			'	<td class="field"><select name="familiar['+i+'][relacionHipoteca]">'+"\n"+
			'		<option value="" selected>Relación hipoteca</option>'+"\n"+
			'		<option value="TITULAR">Titular</option>'+"\n"+
			'		<option value="AVALISTA">Avalista</option>'+"\n"+
			'		<option value="NADA">Nada</option>'+"\n"+
			'	</select></td>'+"\n"+
			'</tr>';
			$('#unidadfamiliar').append(fila);
		}
	});

	// SUBASTAS
	$('#boton_subasta').on('click', function(e) {
		e.preventDefault();
		var i=$('#subastas tr').length
		  , fila="\n"+'<tr>'+"\n"+
		'	<input id="fechasubasta'+i+'" name="subasta['+i+'][fecha]" data-rel="input-fechasubasta'+i+'" class="text input date fecha" type="hidden" />'+"\n"+
		'	<td class="field"><input id="input-fechasubasta'+i+'" data-rel="fechasubasta'+i+'" class="text input date fecha" type="text" placeholder="Fecha" /></td>'+"\n"+
		'	<td class="field"><select name="subasta['+i+'][resultado]">'+"\n"+
		'		<option value="">Resultado</option>'+"\n"+
		'		<option value="PENDIENTE">Pendiente</option>'+"\n"+
		'		<option value="EJECUTADO">Ejecutado</option>'+"\n"+
		'		<option value="SUSPENDIDO">Suspendido</option>'+"\n"+
		'		<option value="SUSPENDIDO_PAH">Suspendido PAH</option>'+"\n"+
		'	</select></td>'+"\n"+
		'	<td class="field"><input name="subasta['+i+'][importeAdjudicacion]" class="text input numero" type="text" placeholder="Importe adjudicación" /></td>'+"\n"+
		'	<td class="field"><input name="subasta['+i+'][deudaRestante]" class="text input numero" type="text" placeholder="Deuda restante" /></td>'+"\n"+
		'</tr>';
		$('#subastas').append(fila);
	});
	$('#boton_borrar_subastas').on('click', function(e) {
		e.preventDefault();
		var i=$('#subastas tr').length;
		if (i>0) {
			$('textarea').trigger('change');
			$('#subastas').empty();
		}
	});

	// DESAHUCIOS
	$('#boton_desahucio').on('click', function(e) {
		e.preventDefault();
		var i=$('#desahucios tr').length
		  , fila="\n"+'<tr>'+"\n"+
		'	<input id="fechadesahucio'+i+'" name="desahucio['+i+'][fecha]" data-rel="input-fechadesahucio'+i+'" class="text input date fecha" type="hidden" />'+"\n"+
		'	<td class="field"><input id="input-fechadesahucio'+i+'" data-rel="fechadesahucio'+i+'" class="text input date fecha" type="text" placeholder="Fecha" /></td>'+"\n"+
		'	<td class="field"><select name="desahucio['+i+'][resultado]">'+"\n"+
		'		<option value="">Resultado</option>'+"\n"+
		'		<option value="PENDIENTE">Pendiente</option>'+"\n"+
		'		<option value="EJECUTADO">Ejecutado</option>'+"\n"+
		'		<option value="SUSPENDIDO">Suspendido</option>'+"\n"+
		'		<option value="SUSPENDIDO_PAH">Suspendido PAH</option>'+"\n"+
		'		<option value="PARALIZADO_PAH">Paralizado PAH</option>'+"\n"+
		'	</select></td>'+"\n"+
		'</tr>';
		$('#desahucios').append(fila);
	});
	$('#boton_borrar_desahucios').on('click', function(e) {
		e.preventDefault();
		var i=$('#desahucios tr').length;
		if (i>0) {
			$('textarea').trigger('change');
			$('#desahucios').empty();
		}
	});

	// Construimos PROVINCIAS y CIUDADES: Requiere ciudades.js
	var provincias = ciudades.dameProvincias();
	var opciones_prov = '';
	for (var i=0; i<provincias.length; i++) {
		opciones_prov += '<option value="'+(i+1)+'">'+provincias[i]+'</option>';
	}
	$('.provincia').append(opciones_prov);
	$('.provincia').on('change', function () {
		var idProvincia = $(this).val()
		  , pueblos = ciudades.dameCiudades(idProvincia)
		  , select_ciudad = $('#'+$(this).data('rel'))
		  , html = '<option value="0">(Seleccione)</option>';
		for (var i=0; i<pueblos.length; i++) {
			html += '<option value="'+pueblos[i].id+'">'+pueblos[i].nombre+'</option>';
		}
		$(select_ciudad).html(html);		
	});

	// Reflejamos los datos del expediente guardados en campo oculto en su select relacionado
	$('input[type=hidden]').each(function(i, el) {
		var valor = $(el).val()
		  , rel = $(el).data('rel')
		  , provincia = $(el).data('provincia');
		if ((valor != '') && (provincia != '')) $('#'+provincia).val(ciudades.dameCiudad(valor).id_provincia).trigger('change');
		if ((valor != '') && (valor != '0000-00-00') && (rel != '')) {
			if ($(el).hasClass('fecha')) {
				valor=valor.split('-');
				if (valor.length==3) $('#'+rel).val(valor[2]+'/'+valor[1]+'/'+valor[0]);
			} else {
				$('#'+rel).val(valor);
			}
		}
	});
	// Actualizamos el valor del input oculto cuando cambie un select
	$('select').on('change', function() {
		var valor = $(this).val()
		  , rel = $(this).data('rel');
		$('#'+rel).val(valor);
	});
	$(document).on('change', 'input[type!=hidden].fecha', function() {
		var valor = $(this).val()
		  , rel = $(this).data('rel');
		if (valor=='') valor='00/00/0000';
		valor=valor.split('/');
		if (valor.length==3) {
			$('#'+rel).val(valor[2]+'-'+valor[1]+'-'+valor[0]);
			$(this).parents('li.field').removeClass('danger');
		} else {
			alert('Formato de fecha incorrecto: día/mes/año');
			$(this).parents('li.field').addClass('danger');
		}
	});

	// Checkboxs
	$('input[type="checkbox"]').on('change', function() {
		var valor = $(this).val()
		  , rel = $(this).data('rel')
		  , cjto = $('#'+rel).val().split('|');
		if ($(this).is(':checked')) {
			// Añadimos el valor
			cjto.push(valor);
		} else {
			// Borramos el valor
			var pos = $.inArray(valor, cjto);
			if (pos > -1) cjto.splice(pos, 1);
		}
		cjto.sort();
		cjto = cjto.join('|');
		// Si el primer caracter es | lo borramos
		if (cjto.length > 0 && cjto[0] == '|') cjto = cjto.substring(1);
		$('#'+rel).val(cjto);
	});
	// marcamos las casillas
	$('.casillas').each(function() {
		var id = $(this).attr('id')
		  , cjto = $(this).val().split('|');
		$('input[type="checkbox"][data-rel="'+id+'"]').each(function() {
			if ($.inArray($(this).val(), cjto) > -1) $(this).prop('checked', 'checked');
		});
	});

	//Observaciones
	$('#observaciones').hide();
	if ($('#observaciones').text().trim() == '') $('#despliega-observaciones').css('color', '#666');
	$('#despliega-observaciones').on ('click', function(e) {
		var obs = $('#observaciones');
		e.preventDefault();
		if ($(obs).is(':visible')) {
			$(obs).slideUp();
		} else {
			$(obs).slideDown();
		}
	});

	// Los campos con la clase numero siempre contienen números positivos.
	// Aquellos campos sin rellenar se almacenan con valor -1
	$('.numero').each(function() {
		if ($(this).val() < 0) $(this).val('');
	});

	// Mostramos los campos rellenos que se encuentren contraidos
	$('.desplegador').trigger('change');
	listo=true;

	// Navegador por secciones
	$('#menu_lateral').on('gumby.onChange', function(e, i) {
		$('#num_seccion').val(i);
	});
	$('.tab-nav').trigger('gumby.set', parseInt($('#num_seccion').val()));

	// Mantiene fijo barra y menú si la ventana es mayor de 700x450
	if (($('body').height() > 450) && ($('body').width() > 700))  {
		var anclados = [];
		$('.anclado').each(function() {
			var position = $(this).offset()
			  , ancho = $(this).width()
			  , anclado = {};
			anclado.obj = $(this);
			anclado.top = position.top;
			anclado.left = position.left;
			anclado.width = ancho;
			anclados.push(anclado);
		});
		for (var i=0; i<anclados.length; i++) {
			$(anclados[i].obj).css('position', 'fixed');
			$(anclados[i].obj).css('top', anclados[i].top);
			$(anclados[i].obj).css('left', anclados[i].left);
			$(anclados[i].obj).css('width', anclados[i].width+'px');
		}
		$('.tab-content').css('margin-left', $('.tab-nav').width()).css('margin-top', $('#cabecera').height());
	}

});
