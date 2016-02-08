-- MySQL dump 10.15  Distrib 10.0.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: datapah
-- ------------------------------------------------------
-- Server version	10.0.21-MariaDB-1~wheezy-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Afectados`
--

DROP TABLE IF EXISTS `Afectados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Afectados` (
  `idAfectado` int(11) NOT NULL AUTO_INCREMENT,
  `tipoCaso` varchar(255) DEFAULT NULL,
  `autorFicha` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `dni` char(9) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `idCiudad` int(11) DEFAULT NULL,
  `nacionalidad1` char(2) DEFAULT NULL,
  `nacionalidad2` char(2) DEFAULT NULL,
  `relacionHipoteca` varchar(45) DEFAULT NULL,
  `comoHasContactado` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `tfFijo` varchar(15) DEFAULT NULL,
  `tfMovil` varchar(15) DEFAULT NULL,
  `dispuestoPrensa` varchar(45) DEFAULT NULL,
  `direccionHipoteca` varchar(255) DEFAULT NULL,
  `CPHipoteca` char(5) DEFAULT NULL,
  `idCiudadHipoteca` int(11) DEFAULT NULL,
  `residesEnHipoteca` varchar(45) DEFAULT NULL,
  `bancoHipoteca` char(4) DEFAULT NULL,
  `bancoOrigenHipoteca` varchar(255) DEFAULT NULL,
  `anyoFirmaHipoteca` int(11) DEFAULT NULL,
  `importeHipoteca` int(11) DEFAULT NULL,
  `anyosHipoteca` int(11) DEFAULT NULL,
  `tasacionHipoteca` int(11) DEFAULT NULL,
  `numTitularesHipoteca` int(11) DEFAULT NULL,
  `avalistasHipoteca` varchar(45) DEFAULT NULL,
  `numAvalistasHipoteca` int(11) DEFAULT NULL,
  `clausulasAbusivasHipoteca` varchar(255) DEFAULT NULL,
  `pendienteAmortizarHipoteca` int(11) DEFAULT NULL,
  `cuotaMensualHipoteca` int(11) DEFAULT NULL,
  `importeRefinanciacionHipoteca` int(11) DEFAULT NULL,
  `precioCompraVentaHipoteca` int(11) DEFAULT NULL,
  `avalistaOtraHipoteca` varchar(45) DEFAULT NULL,
  `importeOtrosPrestamos` int(11) DEFAULT NULL,
  `entidadOtrosPrestamos` char(4) DEFAULT NULL,
  `numViviendasEnPropiedad` int(11) DEFAULT NULL,
  `brutoAnualTitulares` int(11) DEFAULT NULL,
  `netoMesTitulares` int(11) DEFAULT NULL,
  `netoMesFamilia` int(11) DEFAULT NULL,
  `motivosImpago` varchar(255) DEFAULT NULL,
  `ayudaAlimentos` varchar(255) DEFAULT NULL,
  `dificultadesNecesidadesBasicas` varchar(255) DEFAULT NULL,
  `impactoSalud` varchar(255) DEFAULT NULL,
  `fasePrePAH` varchar(45) DEFAULT NULL,
  `renegociacionPrePAH` varchar(45) DEFAULT NULL,
  `tratoDenigrantePrePAH` varchar(255) DEFAULT NULL,
  `explicaTratoDenigrantePrePAH` varchar(255) DEFAULT NULL,
  `servSocialesPrePAH` varchar(45) DEFAULT NULL,
  `valoracionServSocialesPrePAH` int(11) DEFAULT NULL,
  `servMediacionPrePAH` varchar(45) DEFAULT NULL,
  `ayuPrePAH` varchar(255) DEFAULT NULL,
  `viviPrePAH` varchar(255) DEFAULT NULL,
  `otrasAyuPrePAH` varchar(255) DEFAULT NULL,
  `valoracionServMediacionPrePAH` int(11) DEFAULT NULL,
  `cualServMediacionPrePAH` varchar(255) DEFAULT NULL,
  `asocApoyoPrePAH` varchar(100) DEFAULT NULL,
  `valoracionAsocApoyoPrePAH` int(11) DEFAULT NULL,
  `asocPrePAH` varchar(100) DEFAULT NULL,
  `ley13PrePAH` varchar(2) DEFAULT NULL,
  `ley15PrePAH` varchar(2) DEFAULT NULL,
  `codibuenasPrePAH` varchar(255) DEFAULT NULL,
  `fechaImpago` date DEFAULT NULL,
  `fechaDemandaJudicial` date DEFAULT NULL,
  `numEjecucion` varchar(45) DEFAULT NULL,
  `cantidadReclamadaPrincipal` int(11) DEFAULT NULL,
  `cantidadReclamadaIntereses` int(11) DEFAULT NULL,
  `costasJudiciales` int(11) DEFAULT NULL,
  `justiciaGratuita` varchar(45) DEFAULT NULL,
  `demandaExtrajudicial` varchar(45) DEFAULT NULL,
  `viviendaSiDesahucio` varchar(45) DEFAULT NULL,
  `objetivosNegociacion` varchar(255) DEFAULT NULL,
  `tipoNegociacion` varchar(45) DEFAULT NULL,
  `fechaDocumentacion` date DEFAULT NULL,
  `fechaEnvio` date DEFAULT NULL,
  `faseNegociacion` varchar(45) DEFAULT NULL,
  `oficinaMediacion` varchar(45) DEFAULT NULL,
  `servSociales` varchar(45) DEFAULT NULL,
  `deGuindos` varchar(45) DEFAULT NULL,
  `resolucionDeuda` varchar(45) DEFAULT NULL,
  `resolucionVivienda` varchar(45) DEFAULT NULL,
  `precioAlquiler` int(11) DEFAULT NULL,
  `fechaResolucion` date DEFAULT NULL,
  `observaciones` mediumtext,
  `observacionesResolucion` mediumtext,
  `creadoEn` timestamp NULL DEFAULT NULL,
  `modificadoEn` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `idPAH` int(11) DEFAULT NULL,
  `relacionAlquiler` varchar(255) DEFAULT NULL,
  `direccionAlquiler` varchar(255) DEFAULT NULL,
  `CPAlquiler` char(5) DEFAULT NULL,
  `idCiudadAlquiler` int(11) DEFAULT NULL,
  `residesEnAlquiler` varchar(45) DEFAULT NULL,
  `bancoAlquiler` char(4) DEFAULT NULL,
  `anyoFirmaAlquiler` int(11) DEFAULT NULL,
  `importeAlquiler` int(11) DEFAULT NULL,
  `numTitularesAlquiler` int(11) DEFAULT NULL,
  `avalistasAlquiler` varchar(45) DEFAULT NULL,
  `numAvalistasAlquiler` int(11) DEFAULT NULL,
  `clausulasAbusivasAlquiler` varchar(255) DEFAULT NULL,
  `cuotaMensualAlquiler` int(11) DEFAULT NULL,
  `hayMenores` int(11) DEFAULT NULL,
  `hayMenoresde` varchar(255) DEFAULT NULL,
  `hayMayores` int(11) DEFAULT NULL,
  `hayDependencia` varchar(255) DEFAULT NULL,
  `noSociales` varchar(255) DEFAULT NULL,
  `noMediacion` varchar(255) DEFAULT NULL,
  `noAsoc` varchar(255) DEFAULT NULL,
  `noOrg` varchar(255) DEFAULT NULL,
  `noPago` varchar(255) DEFAULT NULL,
  `demandaEje` varchar(255) DEFAULT NULL,
  `noDoc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idAfectado`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=MyISAM AUTO_INCREMENT=168 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Desahucios`
--

DROP TABLE IF EXISTS `Desahucios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Desahucios` (
  `idDesahucio` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `resultado` varchar(45) DEFAULT NULL,
  `idAfectado` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDesahucio`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Familiares`
--

DROP TABLE IF EXISTS `Familiares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Familiares` (
  `idFamiliar` int(11) NOT NULL AUTO_INCREMENT,
  `nacidoEnAnyo` int(11) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `nacionalidad` char(2) DEFAULT NULL,
  `situacionLaboral` varchar(45) DEFAULT NULL,
  `discapacidad` decimal(4,2) DEFAULT NULL,
  `relacionHipoteca` varchar(45) DEFAULT NULL,
  `idAfectado` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFamiliar`)
) ENGINE=MyISAM AUTO_INCREMENT=908 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PAHs`
--

DROP TABLE IF EXISTS `PAHs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PAHs` (
  `idPAH` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) NOT NULL,
  `passwd` char(40) NOT NULL,
  `responsable` varchar(255) DEFAULT NULL,
  `idCiudad` int(11) DEFAULT NULL,
  `web` varchar(255) DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  `creadoEn` timestamp NULL DEFAULT NULL,
  `modificadoEn` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cambioPasswdEn` timestamp NULL DEFAULT NULL,
  `desactivadaEn` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idPAH`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Subastas`
--

DROP TABLE IF EXISTS `Subastas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Subastas` (
  `idSubasta` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `resultado` varchar(45) DEFAULT NULL,
  `importeAdjudicacion` int(11) DEFAULT NULL,
  `deudaRestante` int(11) DEFAULT NULL,
  `idAfectado` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSubasta`)
) ENGINE=MyISAM AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-19 18:04:23
