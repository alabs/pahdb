$(function() {

	// Sólo permite la escritura de números en los input con clase numero
	$('input.numero').on('keydown', function(e) {
		if ((e.which < 48 && e.which != 8 && e.which != 9) || e.which > 57) e.preventDefault();
	});

	$('.guardar_accion').on('click', function(e) {
		e.preventDefault();
		$('#guardar_form').submit();
	});

	$('input,select').on('change', function(e) {
		$('.guardar_accion').html('<i class="icon-floppy"></i>Guardar').parent().addClass('success');
	});

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

	$('#boton_unidad_familiar').on('click', function(e) {
		e.preventDefault();
		var num = parseInt($('#numUnidadFamiliar').val())
		  , desplegados = parseInt($('#unidadfamiliar tr').size())
		  , num_nuevos = num - desplegados;
		for (i=0; i<num_nuevos; i++) {
			var fila = '<tr><td class="field"><input class="text input numero" type="text" placeholder="Nacido año" /></td>'+
			  '<td class="field"><select><option value="" selected>Sexo</option><option value="H">Hombre</option><option value="M">Mujer</option></select></td>'+
			  '<td class="field"><select><option value="">Situación laboral</option><option value="TRABAJO_CON_CONTRATO">Trabajo con contrato</option><option value="TRABAJO_SIN_CONTRATO">Trabajo sin contrato</option><option value="PARADO">Parado</option><option value="AYUDAS_PUBLICAS">Otras ayudas públicas</option><option value="PENSIONISTA">Pensionista</option><option value="ESTUDIANTE">Estudiante</option></select></td>'+
			  '<td class="field"><select><option value="" selected>Discapacidad</option><option value="SI">Sí</option><option value="NO">No</option></select></td>'+
			  '<td class="field"><select><option value="" selected>Relación hipoteca</option><option value="TITULAR">Titular</option><option value="AVALISTA">Avalista</option><option value="NADA">Nada</option></select></td></tr>';
			$('#unidadfamiliar').append(fila);
		}
	});

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

	//alert("left: " + $('.anclado').position().left + ", top: " + $('.anclado').position().top);

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
		/*$(this).css('position', 'fixed');
		$(this).css('top', position.top);
		$(this).css('left', position.left);
		$(this).css('width', ancho+'px');*/
	});
	for (var i=0; i<anclados.length; i++) {
		$(anclados[i].obj).css('position', 'fixed');
		$(anclados[i].obj).css('top', anclados[i].top);
		$(anclados[i].obj).css('left', anclados[i].left);
		$(anclados[i].obj).css('width', anclados[i].width+'px');
	}
	$('.tab-content').css('margin-left', $('.tab-nav').width()).css('margin-top', $('#cabecera').height());

});
