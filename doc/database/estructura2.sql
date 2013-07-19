SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `datapah` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `datapah` ;

-- -----------------------------------------------------
-- Table `datapah`.`PAHs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `datapah`.`PAHs` ;

CREATE  TABLE IF NOT EXISTS `datapah`.`PAHs` (
  `idPAH` INT NOT NULL AUTO_INCREMENT ,
  `correo` VARCHAR(255) NOT NULL ,
  `passwd` CHAR(40) NOT NULL ,
  `responsable` VARCHAR(255) NULL ,
  `idCiudad` INT NULL ,
  `web` VARCHAR(255) NULL ,
  `rol` VARCHAR(45) NULL ,
  `creadoEn` TIMESTAMP NULL ,
  `modificadoEn` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `cambioPasswdEn` TIMESTAMP NULL ,
  `desactivadaEn` TIMESTAMP NULL ,
  PRIMARY KEY (`idPAH`) ,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) )
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `datapah`.`Afectados`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `datapah`.`Afectados` ;

CREATE  TABLE IF NOT EXISTS `datapah`.`Afectados` (
  `idAfectado` INT NOT NULL AUTO_INCREMENT ,
  `autorFicha` VARCHAR(255) NULL ,
  `nombre` VARCHAR(255) NULL ,
  `dni` CHAR(9) NOT NULL ,
  `direccion` VARCHAR(255) NULL ,
  `idCiudad` INT NULL ,
  `nacionalidad1` CHAR(2) NULL ,
  `nacionalidad2` CHAR(2) NULL ,
  `relacionHipoteca` VARCHAR(45) NULL ,
  `comoHasContactado` VARCHAR(45) NULL ,
  `correo` VARCHAR(45) NULL ,
  `tfFijo` VARCHAR(15) NULL ,
  `tfMovil` VARCHAR(15) NULL ,
  `dispuestoPrensa` VARCHAR(45) NULL ,
  `direccionHipoteca` VARCHAR(255) NULL ,
  `CPHipoteca` CHAR(5) NULL ,
  `idCiudadHipoteca` INT NULL ,
  `residesEnHipoteca` VARCHAR(45) NULL ,
  `bancoHipoteca` CHAR(4) NULL ,
  `bancoOrigenHipoteca` VARCHAR(255) NULL ,
  `anyoFirmaHipoteca` INT NULL ,
  `importeHipoteca` INT NULL ,
  `anyosHipoteca` INT NULL ,
  `tasacionHipoteca` INT NULL ,
  `numTitularesHipoteca` INT NULL ,
  `avalistasHipoteca` VARCHAR(45) NULL ,
  `numAvalistasHipoteca` INT NULL ,
  `clausulasAbusivasHipoteca` VARCHAR(255) NULL ,
  `pendienteAmortizarHipoteca` INT NULL ,
  `cuotaMensualHipoteca` INT NULL ,
  `importeRefinanciacionHipoteca` INT NULL ,
  `precioCompraVentaHipoteca` INT NULL ,
  `avalistaOtraHipoteca` VARCHAR(45) NULL ,
  `importeOtrosPrestamos` INT NULL ,
  `entidadOtrosPrestamos` CHAR(4) NULL ,
  `numViviendasEnPropiedad` INT NULL ,
  `brutoAnualTitulares` INT NULL ,
  `netoMesTitulares` INT NULL ,
  `netoMesFamilia` INT NULL ,
  `motivosImpago` VARCHAR(255) NULL ,
  `ayudaAlimentos` VARCHAR(255) NULL ,
  `dificultadesNecesidadesBasicas` VARCHAR(255) NULL ,
  `impactoSalud` VARCHAR(255) NULL ,
  `fasePrePAH` VARCHAR(45) NULL ,
  `renegociacionPrePAH` VARCHAR(45) NULL ,
  `tratoDenigrantePrePAH` VARCHAR(255) NULL ,
  `explicaTratoDenigrantePrePAH` VARCHAR(255) NULL ,
  `servSocialesPrePAH` VARCHAR(45) NULL ,
  `valoracionServSocialesPrePAH` INT NULL ,
  `servMediacionPrePAH` VARCHAR(45) NULL ,
  `valoracionServMediacionPrePAH` INT NULL ,
  `asocApoyoPrePAH` VARCHAR(100) NULL ,
  `valoracionAsocApoyoPrePAH` INT NULL ,
  `asocPrePAH` VARCHAR(100) NULL ,
  `fechaImpago` DATE NULL ,
  `fechaDemandaJudicial` DATE NULL ,
  `numEjecucion` VARCHAR(45) NULL ,
  `cantidadReclamadaPrincipal` INT NULL ,
  `cantidadReclamadaIntereses` INT NULL ,
  `costasJudiciales` INT NULL ,
  `justiciaGratuita` VARCHAR(45) NULL ,
  `demandaExtrajudicial` VARCHAR(45) NULL ,
  `viviendaSiDesahucio` VARCHAR(45) NULL ,
  `objetivosNegociacion` VARCHAR(255) NULL ,
  `tipoNegociacion` VARCHAR(45) NULL ,
  `fechaDocumentacion` DATE NULL ,
  `fechaEnvio` DATE NULL ,
  `faseNegociacion` VARCHAR(45) NULL ,
  `oficinaMediacion` VARCHAR(45) NULL ,
  `servSociales` VARCHAR(45) NULL ,
  `deGuindos` VARCHAR(45) NULL ,
  `resolucionDeuda` VARCHAR(45) NULL ,
  `resolucionVivienda` VARCHAR(45) NULL ,
  `precioAlquiler` INT NULL ,
  `fechaResolucion` DATE NULL ,
  `observaciones` MEDIUMTEXT NULL ,
  `observacionesResolucion` MEDIUMTEXT NULL ,
  `creadoEn` TIMESTAMP NULL ,
  `modificadoEn` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `idPAH` INT NULL ,
  PRIMARY KEY (`idAfectado`) ,
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC) )
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `datapah`.`Familiares`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `datapah`.`Familiares` ;

CREATE  TABLE IF NOT EXISTS `datapah`.`Familiares` (
  `idFamiliar` INT NOT NULL AUTO_INCREMENT ,
  `nacidoEnAnyo` INT NULL ,
  `sexo` CHAR(1) NULL ,
  `situacionLaboral` VARCHAR(45) NULL ,
  `discapacidad` TINYINT NULL ,
  `relacionHipoteca` VARCHAR(45) NULL ,
  `idAfectado` INT NULL ,
  PRIMARY KEY (`idFamiliar`) )
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `datapah`.`Subastas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `datapah`.`Subastas` ;

CREATE  TABLE IF NOT EXISTS `datapah`.`Subastas` (
  `idSubasta` INT NOT NULL ,
  `fecha` DATE NULL ,
  `resultado` VARCHAR(45) NULL ,
  `importeAdjudicacion` INT NULL ,
  `deudaRestante` INT NULL ,
  `idAfectado` INT NULL ,
  PRIMARY KEY (`idSubasta`) )
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `datapah`.`Desahucios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `datapah`.`Desahucios` ;

CREATE  TABLE IF NOT EXISTS `datapah`.`Desahucios` (
  `idDesahucio` INT NOT NULL ,
  `fecha` DATE NULL ,
  `resultado` VARCHAR(45) NULL ,
  `idAfectado` INT NULL ,
  PRIMARY KEY (`idDesahucio`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

USE `datapah` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
