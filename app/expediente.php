<?php

class Expediente extends Controlador {

	function todos() {
		$f3=$this->framework;
		$bd=$this->bd;
		//$afectados=new DB\SQL\Mapper($db,'Afectados');
		$f3->set('afectados',
			$bd->exec('SELECT idAfectado, nombre FROM Afectados')
		);
		$f3->set('contenido', 'listado-afectados.html');
	}

	function editar() {
		$f3=$this->framework;
		$f3->set('idAfectado', $f3->get('PARAMS.idAfectado'));
		$f3->set('contenido','form-afectados.html');
	}
	function guardar() {
		$f3=$this->framework;
		$f3->set('idAfectado', $f3->get('PARAMS.idAfectado'));
		//$f3->set('contenido','afectado.html');
	}
}
