<?php

/*
 * Patrón FrontController: Toda petición a php es redirigida aqui (index.php)
 * desde el servidor web.
 */


// Instanciamos el framework FatFree
$f3=require(__DIR__.'/../../../lib/base.php');

// Cargamos las opciones de configuración de la aplicación
$f3->config(__DIR__.'/../../../app/config.ini');
// Ajustamos la ruta relativa de UI y AUTOLOAD
// En principio no hace falta, indicaremos rutas absolutas en config.ini
//$f3->set('UI', __DIR__.'/../../../'.$f3->get('UI'));
//$f3->set('AUTOLOAD', __DIR__.'/../../../'.$f3->get('AUTOLOAD'));

// Cargamos el router
$f3->config(__DIR__.'/../../../app/routes.ini');

// Iniciamos la aplicación
$f3->run();
