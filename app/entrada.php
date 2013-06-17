<?php

class Entrada {

	protected
		$framework,
		$bd;

	function afterroute() {
		echo Template::instance()->render('entrada.html');
	}

	function entrar() {	
	}

	function salir() {
		$f3=$this->framework;
		$f3->clear('SESSION');
		$f3->set('aviso', 'Tu sesión ha sido cerrada');
	}

	function autentificar() {
		$f3=$this->framework;
		$correo=$f3->get('POST.correo');
		$passwd=$f3->get('POST.passwd');
		$PAH=new DB\SQL\Mapper($this->bd,'PAHs');
		$PAH->load(array('correo=?',$correo));
		if (!$PAH->dry() && $PAH->passwd === sha1($passwd.$f3->get('SALT'))) {
			// Copiamos los datos de la PAH como variables de sesión
			$PAH->copyTo('SESSION');
			$f3->set('SESSION.autorizado', true);
			$f3->reroute('/');
		} else {
			$f3->set('aviso','Correo o contraseña incorrecta');
		}
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

