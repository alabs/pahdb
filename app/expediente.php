<?php

class Expediente extends Controlador {

	function todos() {
		$f3=$this->framework;
		$bd=$this->bd;
		$f3->set('afectados',
			$bd->exec('SELECT idAfectado, nombre, dni FROM Afectados')
		);
		$f3->set('contenido', 'listado-afectados.html');
	}

	function editar() {
		$f3=$this->framework;
		$bd=$this->bd;
		// Recuperamos los datos del expediente de la tabla Afectados
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		if (!$f3->exists('PARAMS.idAfectado')) $f3->set('PARAMS.idAfectado',NULL);
		$afectado->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		$afectado->copyto('AFECTADO');
		// Recuperamos los datos de los familiares de la tabla Familiares
		$f3->set('FAMILIARES', 
			$bd->exec('SELECT * FROM Familiares WHERE idAfectado=?;', $afectado->idAfectado)
		);
		// Recuperamos los datos de las subastas y desahucios
		$f3->set('SUBASTAS', 
			$bd->exec('SELECT * FROM Subastas WHERE idAfectado=?;', $afectado->idAfectado)
		);
		$f3->set('DESAHUCIOS', 
			$bd->exec('SELECT * FROM Desahucios WHERE idAfectado=?;', $afectado->idAfectado)
		);
		$f3->set('contenido','form-afectado.html');
	}
	function guardar() {
		$f3=$this->framework;
		$bd=$this->bd;
		// AFECTADOS
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		$afectado->load(array('dni=?', $f3->get('POST.dni')));
		$afectado->copyfrom('POST');
		if ($afectado->dry()) {
			// Nuevo afectado
			$afectado->creadoEn=date('Y-m-d',time());
			$afectado->idPAH=$f3->get('SESSION.idPAH');
			$afectado->save();
		} else {
			// Modificar afectado
			$afectado->update();
		}
		// FAMILIARES
		$bd->begin();
		$bd->exec('DELETE FROM Familiares WHERE idAfectado=?', $afectado->idAfectado);
		$familiares=$f3->get('POST.familiar');
		$num_familiares=count($familiares);
		for ($i=0; $i<$num_familiares; $i++) {
			$bd->exec('INSERT INTO Familiares (nacidoEnAnyo, sexo, situacionLaboral, discapacidad, relacionHipoteca, idAfectado) VALUES (:nacidoEnAnyo,:sexo,:situacionLaboral,:discapacidad,:relacionHipoteca,:idAfectado)',
				array(':nacidoEnAnyo'=>intval($familiares[$i]['nacidoEnAnyo']),':sexo'=>$familiares[$i]['sexo'],':situacionLaboral'=>$familiares[$i]['situacionLaboral'],':discapacidad'=>$familiares[$i]['discapacidad'],':relacionHipoteca'=>$familiares[$i]['relacionHipoteca'],':idAfectado'=>$afectado->idAfectado)
			);
		}
		$bd->commit();
		// SUBASTAS
		$bd->begin();
		$bd->exec('DELETE FROM Subastas WHERE idAfectado=?', $afectado->idAfectado);
		$subastas=$f3->get('POST.subasta');
		$num_subastas=count($subastas);
		for ($i=0; $i<$num_subastas; $i++) {
			$bd->exec('INSERT INTO Subastas (fecha, resultado, importeAdjudicacion, deudaRestante, idAfectado) VALUES (:fecha,:resultado,:importeAdjudicacion,:deudaRestante,:idAfectado)',
				array(':fecha'=>$subastas[$i]['fecha'],':resultado'=>$subastas[$i]['resultado'],':importeAdjudicacion'=>intval($subastas[$i]['importeAdjudicacion']),':deudaRestante'=>intval($subastas[$i]['deudaRestante']),':idAfectado'=>$afectado->idAfectado)
			);
		}
		$bd->commit();
		// DESAHUCIOS
		$bd->begin();
		$bd->exec('DELETE FROM Desahucios WHERE idAfectado=?', $afectado->idAfectado);
		$desahucios=$f3->get('POST.desahucio');
		$num_desahucios=count($desahucios);
		for ($i=0; $i<$num_desahucios; $i++) {
			$bd->exec('INSERT INTO Desahucios (fecha, resultado, idAfectado) VALUES (:fecha,:resultado,:idAfectado)',
				array(':fecha'=>$desahucios[$i]['fecha'],':resultado'=>$desahucios[$i]['resultado'],':idAfectado'=>$afectado->idAfectado)
			);
		}
		$bd->commit();

		$f3->set('PARAMS.idAfectado', $afectado->idAfectado);
		$f3->set('num_seccion', $f3->get('POST.num_seccion'));
		$this->editar();
	}

	function borrar() {
		$f3=$this->framework;
		$bd=$this->bd;
		$id_afectado = $f3->get('PARAMS.idAfectado');
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		$afectado->load(array('idAfectado=?', $id_afectado));
		if ($afectado->dry()) {
			echo 'ERROR';
		} else {
			$bd->exec('DELETE FROM Familiares WHERE idAfectado=?', $afectado->idAfectado);
			$bd->exec('DELETE FROM Subastas WHERE idAfectado=?', $afectado->idAfectado);
			$bd->exec('DELETE FROM Desahucios WHERE idAfectado=?', $afectado->idAfectado);
			$afectado->erase();
			echo '#afectado-'.$id_afectado;
		}
	}

	function informe() {
		$f3=$this->framework;
		$bd=$this->bd;
		$f3->set('TABLA',
			$bd->exec('SELECT A.*, MAX(S.fecha) AS fechaSubasta, MAX(D.fecha) AS fechaDesahucio FROM Afectados A LEFT JOIN Subastas S ON A.idAfectado=S.idAfectado LEFT JOIN Desahucios D ON A.idAfectado=D.idAfectado GROUP BY A.idAfectado;')
		);
		$f3->set('mostrarFecha',
			function ($f) {
				return ($f != 0)?strftime('%d/%m/%Y', strtotime($f)):'';
			}
		);

		$f3->set('contenido', 'informe-resumen.html');
	}

	function gandalf() {
		$f3=$this->framework;
		$f3->set('contenido', 'no-puedes-pasar.html');
	}
}
