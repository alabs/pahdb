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
			var o = i + 1;
			var fila = "\n"+'<tr>'+"\n"+
			'<td><li class="default badge">'+o+'</li></td>'+"\n"+
			'</tr>'+"\n"+
			'<tr>'+"\n"+
			'	<td class="append field"><input name="familiar['+i+'][nacidoEnAnyo]" class="xwide text input numero" type="text" placeholder="Nacido año" maxlength="4" /></td>'+"\n"+
			'	<td class="field"><div class="picker"><select name="familiar['+i+'][sexo]">'+"\n"+
			'		<option value="" selected>Sexo</option>'+"\n"+
			'		<option value="H">Hombre</option>'+"\n"+
			'		<option value="M">Mujer</option>'+"\n"+
			'	</select></div></td>'+"\n"+
			'<td class="field"><div class="picker"><select name="familiar['+i+'][nacionalidad]"><option value="">Nacionalidad</option> <option value="AF">Afganistán</option>	<option value="AL">Albania</option>	<option value="DE">Alemania</option>	<option value="AD">Andorra</option>	<option value="AO">Angola</option>	<option value="AI">Anguilla</option>	<option value="AQ">Antártida</option>	<option value="AG">Antigua y Barbuda</option>	<option value="AN">Antillas Holandesas</option>	<option value="SA">Arabia Saudí</option>	<option value="DZ">Argelia</option>	<option value="AR">Argentina</option>	<option value="AM">Armenia</option>	<option value="AW">Aruba</option>	<option value="AU">Australia</option>	<option value="AT">Austria</option>	<option value="AZ">Azerbaiyán</option>	<option value="BS">Bahamas</option>	<option value="BH">Bahrein</option>	<option value="BD">Bangladesh</option>	<option value="BB">Barbados</option>	<option value="BE">Bélgica</option>	<option value="BZ">Belice</option>	<option value="BJ">Benin</option>	<option value="BM">Bermudas</option>	<option value="BY">Bielorrusia</option>	<option value="MM">Birmania</option>	<option value="BO">Bolivia</option>	<option value="BA">Bosnia y Herzegovina</option>	<option value="BW">Botswana</option>	<option value="BR">Brasil</option>	<option value="BN">Brunei</option>	<option value="BG">Bulgaria</option>	<option value="BF">Burkina Faso</option>	<option value="BI">Burundi</option>	<option value="BT">Bután</option>	<option value="CV">Cabo Verde</option>	<option value="KH">Camboya</option>	<option value="CM">Camerún</option>	<option value="CA">Canadá</option>	<option value="TD">Chad</option>	<option value="CL">Chile</option>	<option value="CN">China</option>	<option value="CY">Chipre</option>	<option value="VA">Ciudad del Vaticano (Santa Sede)</option>	<option value="CO">Colombia</option>	<option value="KM">Comores</option>	<option value="CG">Congo</option>	<option value="CD">Congo, República Democrática del</option>	<option value="KR">Corea</option>	<option value="KP">Corea del Norte</option>	<option value="CI">Costa de Marfíl</option>	<option value="CR">Costa Rica</option>	<option value="HR">Croacia (Hrvatska)</option>	<option value="CU">Cuba</option>	<option value="DK">Dinamarca</option>	<option value="DJ">Djibouti</option>	<option value="DM">Dominica</option>	<option value="EC">Ecuador</option>	<option value="EG">Egipto</option>	<option value="SV">El Salvador</option>	<option value="AE">Emiratos Árabes Unidos</option>	<option value="ER">Eritrea</option>	<option value="SI">Eslovenia</option>	<option value="ES">España</option>	<option value="US">Estados Unidos</option>	<option value="EE">Estonia</option>	<option value="ET">Etiopía</option>	<option value="FJ">Fiji</option>	<option value="PH">Filipinas</option>	<option value="FI">Finlandia</option>	<option value="FR">Francia</option>	<option value="GA">Gabón</option>	<option value="GM">Gambia</option>	<option value="GE">Georgia</option>	<option value="GH">Ghana</option>	<option value="GI">Gibraltar</option>	<option value="GD">Granada</option>	<option value="GR">Grecia</option>	<option value="GL">Groenlandia</option>	<option value="GP">Guadalupe</option>	<option value="GU">Guam</option>	<option value="GT">Guatemala</option>	<option value="GY">Guayana</option>	<option value="GF">Guayana Francesa</option>	<option value="GN">Guinea</option>	<option value="GQ">Guinea Ecuatorial</option>	<option value="GW">Guinea-Bissau</option>	<option value="HT">Haití</option>	<option value="HN">Honduras</option>	<option value="HU">Hungría</option>	<option value="IN">India</option>	<option value="ID">Indonesia</option>	<option value="IQ">Irak</option>	<option value="IR">Irán</option>	<option value="IE">Irlanda</option>	<option value="BV">Isla Bouvet</option>	<option value="CX">Isla de Christmas</option>	<option value="IS">Islandia</option>	<option value="KY">Islas Caimán</option>	<option value="CK">Islas Cook</option>	<option value="CC">Islas de Cocos o Keeling</option>	<option value="FO">Islas Faroe</option>	<option value="HM">Islas Heard y McDonald</option>	<option value="FK">Islas Malvinas</option>	<option value="MP">Islas Marianas del Norte</option>	<option value="MH">Islas Marshall</option>	<option value="UM">Islas menores de Estados Unidos</option>	<option value="PW">Islas Palau</option>	<option value="SB">Islas Salomón</option>	<option value="SJ">Islas Svalbard y Jan Mayen</option>	<option value="TK">Islas Tokelau</option>	<option value="TC">Islas Turks y Caicos</option>	<option value="VI">Islas Vírgenes (EE.UU.)</option>	<option value="VG">Islas Vírgenes (Reino Unido)</option>	<option value="WF">Islas Wallis y Futuna</option>	<option value="IL">Israel</option>	<option value="IT">Italia</option>	<option value="JM">Jamaica</option>	<option value="JP">Japón</option>	<option value="JO">Jordania</option>	<option value="KZ">Kazajistán</option>	<option value="KE">Kenia</option>	<option value="KG">Kirguizistán</option>	<option value="KI">Kiribati</option>	<option value="KW">Kuwait</option>	<option value="LA">Laos</option>	<option value="LS">Lesotho</option>	<option value="LV">Letonia</option>	<option value="LB">Líbano</option>	<option value="LR">Liberia</option>	<option value="LY">Libia</option>	<option value="LI">Liechtenstein</option>	<option value="LT">Lituania</option>	<option value="LU">Luxemburgo</option>	<option value="MK">Macedonia, Ex-República Yugoslava de</option>	<option value="MG">Madagascar</option>	<option value="MY">Malasia</option>	<option value="MW">Malawi</option>	<option value="MV">Maldivas</option>	<option value="ML">Malí</option>	<option value="MT">Malta</option>	<option value="MA">Marruecos</option>	<option value="MQ">Martinica</option>	<option value="MU">Mauricio</option>	<option value="MR">Mauritania</option>	<option value="YT">Mayotte</option>	<option value="MX">México</option>	<option value="FM">Micronesia</option>	<option value="MD">Moldavia</option>	<option value="MC">Mónaco</option>	<option value="MN">Mongolia</option>	<option value="MS">Montserrat</option>	<option value="MZ">Mozambique</option>	<option value="NA">Namibia</option>	<option value="NR">Nauru</option>	<option value="NP">Nepal</option>	<option value="NI">Nicaragua</option>	<option value="NE">Níger</option>	<option value="NG">Nigeria</option>	<option value="NU">Niue</option>	<option value="NF">Norfolk</option>	<option value="NO">Noruega</option>	<option value="NC">Nueva Caledonia</option>	<option value="NZ">Nueva Zelanda</option>	<option value="OM">Omán</option>	<option value="NL">Países Bajos</option>	<option value="PA">Panamá</option>	<option value="PG">Papúa Nueva Guinea</option>	<option value="PK">Paquistán</option>	<option value="PY">Paraguay</option>	<option value="PE">Perú</option>	<option value="PN">Pitcairn</option>	<option value="PF">Polinesia Francesa</option>	<option value="PL">Polonia</option>	<option value="PT">Portugal</option>	<option value="PR">Puerto Rico</option>	<option value="QA">Qatar</option>	<option value="UK">Reino Unido</option>	<option value="CF">República Centroafricana</option>	<option value="CZ">República Checa</option>	<option value="ZA">República de Sudáfrica</option>	<option value="DO">República Dominicana</option>	<option value="SK">República Eslovaca</option>	<option value="RE">Reunión</option>	<option value="RW">Ruanda</option>	<option value="RO">Rumania</option>	<option value="RU">Rusia</option>	<option value="EH">Sahara Occidental</option>	<option value="KN">Saint Kitts y Nevis</option>	<option value="WS">Samoa</option>	<option value="AS">Samoa Americana</option>	<option value="SM">San Marino</option>	<option value="VC">San Vicente y Granadinas</option>	<option value="SH">Santa Helena</option>	<option value="LC">Santa Lucía</option>	<option value="ST">Santo Tomé y Príncipe</option>	<option value="SN">Senegal</option>	<option value="SC">Seychelles</option>	<option value="SL">Sierra Leona</option>	<option value="SG">Singapur</option>	<option value="SY">Siria</option>	<option value="SO">Somalia</option>	<option value="LK">Sri Lanka</option>	<option value="PM">St. Pierre y Miquelon</option>	<option value="SZ">Suazilandia</option>	<option value="SD">Sudán</option>	<option value="SE">Suecia</option>	<option value="CH">Suiza</option>	<option value="SR">Surinam</option>	<option value="TH">Tailandia</option>	<option value="TW">Taiwán</option>	<option value="TZ">Tanzania</option>	<option value="TJ">Tayikistán</option>	<option value="TF">Territorios franceses del Sur</option>	<option value="TP">Timor Oriental</option>	<option value="TG">Togo</option>	<option value="TO">Tonga</option>	<option value="TT">Trinidad y Tobago</option>	<option value="TN">Túnez</option>	<option value="TM">Turkmenistán</option>	<option value="TR">Turquía</option>	<option value="TV">Tuvalu</option>	<option value="UA">Ucrania</option>	<option value="UG">Uganda</option>	<option value="UY">Uruguay</option>	<option value="UZ">Uzbekistán</option>	<option value="VU">Vanuatu</option>	<option value="VE">Venezuela</option>	<option value="VN">Vietnam</option>	<option value="YE">Yemen</option>	<option value="YU">Yugoslavia</option><option value="ZM">Zambia</option><option value="ZW">Zimbabue</option></select></div></td>'+"\n"+
			'</tr>'+"\n"+
			'<tr>'+"\n"+
			'	<td class="field"><div class="picker"><select name="familiar['+i+'][situacionLaboral]">'+"\n"+
			'		<option value="">Situación laboral</option>'+"\n"+
			'		<option value="TRABAJO_CON_CONTRATO">Trabajo con contrato</option>'+"\n"+
			'		<option value="TRABAJO_SIN_CONTRATO">Trabajo sin contrato</option>'+"\n"+
			'		<option value="PARADO_CON_PRESTACION">Parado con prestación</option>'+"\n"+
			'		<option value="PARADO_SIN_PRESTACION">Parado sin prestación</option>'+"\n"+
			'		<option value="AYUDAS_PUBLICAS">Otras ayudas públicas</option>'+"\n"+
			'		<option value="PENSIONISTA">Pensionista</option>'+"\n"+
			'		<option value="ESTUDIANTE">Estudiante</option>'+"\n"+
			'	</select></div></td>'+"\n"+
			'	<td class="field"><div class="picker"><select name="familiar['+i+'][relacionHipoteca]">'+"\n"+
			'		<option value="" selected>Relación hipoteca</option>'+"\n"+
			'		<option value="TITULAR">Titular</option>'+"\n"+
			'		<option value="AVALISTA">Avalista</option>'+"\n"+
			'		<option value="NADA">Nada</option>'+"\n"+
			'	</select></div></td>'+"\n"+
			'	<td class="append field">'+"\n"+
			'		<input name="familiar['+i+'][discapacidad]" placeholder="Discapacidad" class="xwide text input" type="text" maxlength="5" min="-1" max="100" style="text-align:right;">'+"\n"+
			'		 <span class="adjoined">%</span>'+"\n"+
			'	</td>'+"\n"+
			'</tr>';
			$('#unidadfamiliar').append(fila);
		}
	});

	// SUBASTAS, se añade on al final para que surta efecto el control de números, no funcionaba arriba ni con bind ni trigger ni nada de nada.
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
		$('#subastas').append(fila).on('keydown', '.numero', function(e){ if ((e.which < 48 && e.which != 8 && e.which != 9) || e.which > 57) e.preventDefault(); });
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

	// MOVER arriba cuando se cambia entre pestanas
	$('.moverarriba').on('click', function() {
		$('html, body').animate( { scrollTop: 0 }, 'slow');
		return false;
	});

});
