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
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		//if (!$f3->exists('PARAMS.idAfectado')) $f3->set('PARAMS.idAfectado',0);
		$afectado->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		//$hipoteca->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		//$f3->set('HIPOTECAS', 
		//	$bd->exec('SELECT * FROM Hipotecas WHERE idAfectado=?',$f3->get('PARAMS.idAfectado')));
		//if (!$afectado->dry()) {
			$afectado->copyto('AFECTADO');
			//$hipoteca->copyto('HIPOTECA');
		//}
		$f3->set('contenido','form-afectado.html');
	}
	function guardar() {
		$f3=$this->framework;
		$bd=$this->bd;
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		$afectado->load(array('dni=?', $f3->get('POST.dni')));
		$afectado->copyfrom('POST');
		////$f3->set('PARAMS.idAfectado', $f3->get('POST.idAfectado'));
		if ($afectado->dry()) {
			// Nuevo afectado
			//$hipoteca->save();
			$afectado->save();
		} else {
			// Modificar afectado
			//$hipoteca->update();
			$afectado->update();
		}

		$this->editar();
		//$afectado->copyto('AFECTADO');
		//$f3->set('contenido','form-afectados.html');
	}

	function borrar() {
		$f3=$this->framework;
		$bd=$this->bd;
		$id_afectado = $f3->get('PARAMS.idAfectado');
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		$afectado->load(array('idAfectado=?', $id_afectado));
		$afectado->erase();
		echo '#afectado-'.$id_afectado;
	}
}
