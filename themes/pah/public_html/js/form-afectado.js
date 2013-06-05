$(function() {

	var listo=false;

	// Enviamos el formulario al pulsar el botón guardar
	$('.guardar_accion').on('click', function(e) {
		e.preventDefault();
		if ($('.guardar_accion').parent().hasClass('success')) $('#guardar_form').submit();
	});
	// Si cambia cualquier campo activamos el botón guardar
	$('input,select,textarea').on('change', function(e) {
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
			var fila = '<tr><td class="field"><input name="familiar['+i+'][nacidoEnAnyo]" class="text input numero" type="text" placeholder="Nacido año" /></td>'+
			  '<td class="field"><select name="familiar['+i+'][sexo]"><option value="" selected>Sexo</option><option value="H">Hombre</option><option value="M">Mujer</option></select></td>'+
			  '<td class="field"><select name="familiar['+i+'][situacionLaboral]"><option value="">Situación laboral</option><option value="TRABAJO_CON_CONTRATO">Trabajo con contrato</option><option value="TRABAJO_SIN_CONTRATO">Trabajo sin contrato</option><option value="PARADO">Parado</option><option value="AYUDAS_PUBLICAS">Otras ayudas públicas</option><option value="PENSIONISTA">Pensionista</option><option value="ESTUDIANTE">Estudiante</option></select></td>'+
			  '<td class="field"><select name="familiar['+i+'][discapacidad]"><option value="" selected>Discapacidad</option><option value="SI">Sí</option><option value="NO">No</option></select></td>'+
			  '<td class="field"><select name="familiar['+i+'][relacionHipoteca]"><option value="" selected>Relación hipoteca</option><option value="TITULAR">Titular</option><option value="AVALISTA">Avalista</option><option value="NADA">Nada</option></select></td></tr>';
			$('#unidadfamiliar').append(fila);
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
