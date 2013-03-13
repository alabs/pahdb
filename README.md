Base de datos para las Plataformas de Afectados por la Hipoteca (PAHDB)
-----------------------------------------------------------------------

Base de datos con interfaz web para uso interno de la PAH. Servirá tanto para facilitar
el seguimiento de los propios afectados por la hipoteca y el problema de los desahucios
en España como para ser una fuente de estadísticas fiable.

Esta herramienta se liberará bajo licencia [GNU Affero](http://es.wikipedia.org/wiki/GNU_Affero_General_Public_License) en este mismo repositorio, con intención de que 
pueda ser copiada, distribuida y mejorada libremente por asociaciones análogas de otras
regiones o paises.

Los datos se publicarán en la web http://afectadosporlahipoteca.com en forma de estadísticas,
pero evidentemente no se liberarán en este repositorio por estar sujetos a la [Ley de Protección
de Datos](doc/legal/).

Fases del proyecto
==================

### FASE 0: Toma de requisitos
Estado: *Completada*
*  Reuniones telemáticas
*  Diseño de la base de datos: Diagrama ERR
*  Consulta jurídica sobre la LOPD
*  Validación

### FASE 1: Implementación de la interfaz web básica para volcado de datos
Estado: *En curso*
*  Implementación de la base de datos MySQL con el motor InnoDB
*  Generación de vistas, disparadores y optimización
*  Instalación de un certificado SSL auto-firmado
*  Instalación del entorno de desarrollo y del framework
*  Implementación del formulario básico de "expedientes" y búsqueda por DNI/NIE del afectado
*  Testeo y optimización de la fase 1

### FASE 2: Diseño de la interfaz web gráfica
Esta fase consiste en la generación de un mockup en una reunión presencial en Barcelona de dos
días donde se pormenorizarán todos los detalles de la interfaz de usuario, así como consultas y
estadísticas frecuentes.

### FASE 3: Implementación de la interfaz de usuario web
*  Sistema de autenticación multiusuario
*  Instalación de un certificado SSL firmado por una entidad certificadora (si procede)
*  Implementación del motor de búsqueda tanto general como optimizado para las consultas más frecuentes
*  Implementación de diferentes vistas de visualización vía web según mockup.
*  Añadir capacidad multilenguaje a la interfaz de usuario.

### FASE 4: Motor de estadísticas
Implementación de un motor de estadísticas con capacidad de generación de gráficas básicas.

Calendario
==========

Inicio del proyecto: 25 de febrero de 2013
Fase 0: 25-02 a 06-03
Fase 1: 11-03 al 12-04
Fase 2: 13-04 a 14-04
Fase 3: 15-04 a 09-05
Fase 4: 12-05 al 05-06

Documentación
=============
*  [Modelo de datos](doc/database/)
*  [LOPD](doc/legal/)
