$(function() {

	var listo=false;

	// Enviamos el formulario al pulsar el botón guardar
	$('.guardar_accion').on('click', function(e) {
		e.preventDefault();
		if ($('.guardar_accion').parent().hasClass('success')) $('#guardar_form').submit();
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
		if (casilla.is(':checked') || casilla.hasClass('ckecked') || casilla.val() == 'SI') {
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
		'	<td class="field"><input name="subasta['+i+'][fecha]" class="text input date" type="text" placeholder="Fecha" /></td>'+"\n"+
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
		'	<td class="field"><input name="desahucio['+i+'][fecha]" class="text input date" type="text" placeholder="Fecha" /></td>'+"\n"+
		'	<td class="field"><select name="desahucio['+i+'][resultado]">'+"\n"+
		'		<option value="">Resultado</option>'+"\n"+
		'		<option value="PENDIENTE">Pendiente</option>'+"\n"+
		'		<option value="EJECUTADO">Ejecutado</option>'+"\n"+
		'		<option value="SUSPENDIDO">Suspendido</option>'+"\n"+
		'		<option value="SUSPENDIDO_PAH">Suspendido PAH</option>'+"\n"+
		'		<option value="PARALIZADO_PAH">Paralizado PAH</option>'+"\n"+
		'	</select></td>'+"\n"+
		'</tr>';
		$('#subastas').append(fila);
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
		  , rel = $(el).data('rel');
		if ((valor != '') && (rel != '')) $('#'+rel).val(valor);
	});
	// Actualizamos el valor del input oculto cuando cambie un select
	$('select').on('change', function() {
		var valor = $(this).val()
		  , rel = $(this).data('rel');
		$('#'+rel).val(valor);
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

	// Mostramos los campos rellenos que se encuentren contraidos
	$('.desplegador').trigger('change');
	listo=true;

	// Mantiene fijo barra y menú
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
});
