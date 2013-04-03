<?php

class Controlador {

	protected
		$framework,
		$db;

	//! HTTP route pre-processor
	function beforeroute() {
		$f3=$this->framework;
		$autorizado=$f3->exists('SESSION.autorizado');
		//$goto=
		if (!$autorizado && $f3->get('URI') != $f3->get('BASE').'/entrar') {
		//if (!$autorizado) {
			//$f3->reroute('/entrar');
			$this->autentificar();
		} 
	}

	//! HTTP route post-processor
	function afterroute() {
		echo Template::instance()->render('layout.html');
	}

	function entrar() {
		$f3=$this->framework;
		$f3->set('contenido','login.html');
	}

	function salir() {
		$f3=$this->framework;
		$f3->clear('SESSION');
		$f3->reroute('/entrar');
	}

	function autentificar() {
		$f3=$this->framework;
		$correo=$f3->get('POST.correo');
		$passwd=$f3->get('POST.passwd');
		if ($passwd == 'pepe') {
			$f3->set('SESSION.correo', $correo);
			$f3->set('SESSION.autorizado', true);
			$f3->reroute($f3->get('SESSION.goto'));
			//$this->entrar();
		} else {
			$f3->set('aviso','Correo o contraseña incorrecta');
			//$this->entrar();
			$f3->set('SESSION.goto',$f3->get('BASE').$f3->get('URI'));
			$f3->reroute('/entrar');
		}
	}

	//! Instantiate class
	function __construct() {
		$f3=Base::instance();
		/*// Connect to the database
		$db=new DB\SQL($f3->get('db'));
		if (file_exists('setup.sql')) {
			// Initialize database with default setup
			$db->exec(explode(';',$f3->read('setup.sql')));
			// Make default setup inaccessible
			rename('setup.sql','setup.$ql');
		}
		// Use database-managed sessions
		new DB\SQL\Session($db);
		// Save frequently used variables
		$this->db=$db;*/
		$this->framework=$f3;
	}

}
