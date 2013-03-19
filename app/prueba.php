<?php

class Prueba {

	protected $framework;

	function mostrar() {
		$f3=$this->framework;
		$f3->set('contenido','prueba.html');
		echo Template::instance()->render('layout.htm');
	}
	function afectado() {
		$f3=$this->framework;
		$f3->set('idAfectado', $f3->get('GET.idAfectado'));
		$f3->set('contenido','afectado.html');
		echo Template::instance()->render('layout.htm');
	}

	function __construct() {
		$f3=Base::instance();
		$this->framewok=$f3;
	}
}
