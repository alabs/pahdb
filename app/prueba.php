<?php

class Prueba {

	protected $framework;

	function mostrar() {
		$f3=$this->framework;
		//$f3->set('contenido','prueba.html');
	}
	function afectado() {
		$f3=$this->framework;
		$f3->set('idAfectado', $f3->get('GET.idAfectado'));
		$f3->set('contenido','afectado.html');
	}

	function afterroute() {
		echo Template::instance()->render('layout.html');
	}

	function __construct() {
		$f3=Base::instance();
		$this->framewok=$f3;
	}
}
