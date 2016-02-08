<?php

class Controlador {

	protected
		$framework,
		$bd;

	function beforeroute() {
		// Comprobamos si el usuario está autorizado
		$f3=$this->framework;
		$autorizado=$f3->exists('SESSION.autorizado');
		if (!$autorizado) {
			$f3->reroute('/entrar');
		}
	}

	function afterroute() {
		if (!$this->framework->get('AJAX'))	echo Template::instance()->render('layout.html');
	}

	function __construct() {
		$f3=Base::instance();
		$bd=new DB\SQL($f3->get('BD.conector'), $f3->get('BD.usuario'), $f3->get('BD.passwd'));
		// Usamos sistema de sesiones de la base de datos
		//new DB\SQL\Session($bd);
		$this->bd=$bd;
		$this->framework=$f3;
	}

}
