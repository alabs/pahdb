<?php

class Expediente extends Controlador {

	function todos() {
		$f3=$this->framework;
		$bd=$this->bd;
		$f3->set('afectados',
			$bd->exec('SELECT idAfectado, nombre FROM Afectados')
		);
		$f3->set('contenido', 'listado-afectados.html');
	}

	function editar() {
		$f3=$this->framework;
		$bd=$this->bd;
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		//$hipoteca=new DB\SQL\Mapper($bd,'Hipotecas');
		if (!$f3->exists('PARAMS.idAfectado')) $f3->set('PARAMS.idAfectado','');
		$afectado->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		//$hipoteca->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		$f3->set('HIPOTECAS', 
			$bd->exec('SELECT * FROM Hipotecas WHERE idAfectado=?',$f3->get('PARAMS.idAfectado')));
		//if (!$afectado->dry()) {
			$afectado->copyto('AFECTADO');
			//$hipoteca->copyto('HIPOTECA');
		//}
		$f3->set('contenido','form-afectados.html');
	}
	function guardar() {
		$f3=$this->framework;
		$bd=$this->bd;
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		$hipoteca=new DB\SQL\Mapper($bd,'Hipotecas');
		$afectado->load(array('idAfectado=?', $f3->get('POST.idAfectado')));
		$hipoteca->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		$afectado->copyfrom('POST');
		//$hipoteca->copyfrom('POST');
		$f3->set('PARAMS.idAfectado', $f3->get('POST.idAfectado'));
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
}
