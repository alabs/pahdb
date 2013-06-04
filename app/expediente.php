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
		//$fam=new DB\SQL\Mapper($bd,'Familiares');
		if (!$f3->exists('PARAMS.idAfectado')) $f3->set('PARAMS.idAfectado',NULL);
		$afectado->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		//$hipoteca->load(array('idAfectado=?', $f3->get('PARAMS.idAfectado')));
		//$f3->set('HIPOTECAS', 
		//	$bd->exec('SELECT * FROM Hipotecas WHERE idAfectado=?',$f3->get('PARAMS.idAfectado')));
		//if (!$afectado->dry()) {
			//$afectado->copyto('AFECTADO');
			//$hipoteca->copyto('HIPOTECA');
		//}
		//$f3->set('FAMILIARES', isset($f3->get('FAMILIARES'))?$f3->get('FAMILIARES'):'no definido');
		//if ($afectado->dry()) {
		//	$f3->set('FAMILIARES', '');
		//} else {
			$f3->set('FAMILIARES', 
				$bd->exec('SELECT * FROM Familiares WHERE idAfectado=?;', $afectado->idAfectado)
			);
			//$fam->load('idAfectado=8');
			//$fam->copyto('FAMILIARES');
		//}
		$afectado->copyto('AFECTADO');
		$f3->set('contenido','form-afectado.html');
	}
	function guardar() {
		$f3=$this->framework;
		$bd=$this->bd;
		$afectado=new DB\SQL\Mapper($bd,'Afectados');
		$afectado->load(array('dni=?', $f3->get('POST.dni')));
		$afectado->copyfrom('POST');
		//$f3->set('FAMILIARES', print_r($f3->get('POST.familiar'), true).'<br> total: '.count($f3->get('POST.familiar')));
		////$f3->set('PARAMS.idAfectado', $f3->get('POST.idAfectado'));
		if ($afectado->dry()) {
			// Nuevo afectado
			//$hipoteca->save();
			//$afectado->reset();
			//$afectado->copyfrom('POST');
			$afectado->save();
			////$f3->set('PARAMS.idAfectado', $afectado->idAfectado);
		} else {
			// Modificar afectado
			//$hipoteca->update();
			$afectado->update();
		}

		$bd->begin();
		$bd->exec('DELETE FROM Familiares WHERE idAfectado=?', $afectado->idAfectado);
		$familiares=$f3->get('POST.familiar');
		$num_familiares=count($familiares);
		for ($i=0; $i<$num_familiares; $i++) {
			$bd->exec('INSERT INTO Familiares (nacidoEnAnyo, sexo, situacionLaboral, discapacidad, relacionHipoteca, idAfectado) VALUES (:nacidoEnAnyo,:sexo,:situacionLaboral,:discapacidad,:relacionHipoteca,:idAfectado)',
				array(':nacidoEnAnyo'=>intval($familiares[$i]['nacidoEnAnyo']),':sexo'=>$familiares[$i]['sexo'],':situacionLaboral'=>$familiares[$i]['situacionLaboral'],':discapacidad'=>$familiares[$i]['discapacidad'],':relacionHipoteca'=>$familiares[$i]['relacionHipoteca'],':idAfectado'=>$afectado->idAfectado)
			);

			//$bd->exec('INSERT INTO Familiares (nacidoEnAnyo) VALUES (?)',intval($familiares[$i]['nacidoEnAnyo']));
		}
		$bd->commit();

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
