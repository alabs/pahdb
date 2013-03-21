<?php

class Prueba extends Controlador {

	function login() {
		$f3=$this->framework;
		$f3->set('contenido','login.html');
	}

	function mostrar() {
		$f3=$this->framework;
		$f3->set('contenido','prueba.html');
	}
	function afectado() {
		$f3=$this->framework;
		$f3->set('idAfectado', $f3->get('PARAMS.idAfectado'));
		$f3->set('contenido','afectado.html');
	}
}
