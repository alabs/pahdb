-- -----------------------------------------------------
-- Table `Afectados`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Afectados` ;

CREATE  TABLE IF NOT EXISTS `Afectados` (
  `idAfectado` CHAR(9) NOT NULL COMMENT 'DNI/NIE' ,
  `nombre` VARCHAR(255) NULL ,
  `nacidoEnAnyo` INT NULL ,
  `nacionalidad1` CHAR(2) NULL ,
  `nacionalidad2` CHAR(2) NULL ,
  `correo` VARCHAR(255) NULL ,
  `tfFijo` VARCHAR(15) NULL ,
  `tfMovil` VARCHAR(15) NULL ,
  `direccion` VARCHAR(255) NULL ,
  `idCiudad` INT NULL ,
  `idPAH` VARCHAR(320) NULL ,
  `situacionLaboral` VARCHAR(255) NULL ,
  `ingresosNetos` INT NULL ,
  `ingresosFamilia` INT NULL ,
  `motivosImpago` VARCHAR(255) NULL ,
  `impactoSalud` VARCHAR(255) NULL ,
  `dificultadesNecesidadesBasicas` VARCHAR(255) NULL ,
  `ayudasAdministracion` VARCHAR(255) NULL ,
  `viviendaTrasDesahucio` VARCHAR(255) NULL ,
  `accionNegociarBanco` VARCHAR(255) NULL ,
  `accionTratoBanco` VARCHAR(255) NULL ,
  `accionServiciosSociales` VARCHAR(255) NULL ,
  `accionServiciosSocialesValoracion` VARCHAR(255) NULL ,
  `accionMediacion` VARCHAR(255) NULL ,
  `accionMediacionValoracion` VARCHAR(255) NULL ,
  `accionOtrasAsociaciones` VARCHAR(255) NULL ,
  `accionOtrasAsociacionesValoracion` VARCHAR(255) NULL ,
  `justiciaGratuitaEn` DATE NULL ,
  `dispuestoPrensa` VARCHAR(255) NULL ,
  `avalistaOtrasHipotecas` VARCHAR(255) NULL ,
  `otrosCreditos` INT NULL ,
  `consideraFraude` VARCHAR(255) NULL ,
  `propietarioInmueble` VARCHAR(255) NULL ,
  `autorFicha` VARCHAR(255) NULL ,
  `creadoEn` TIMESTAMP NULL ,
  `modificadoEn` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `comoNosHaConocido` VARCHAR(255) NULL ,
  `viviendaSiDesahucio` VARCHAR(255) NULL ,
  `asociaciones` VARCHAR(255) NULL ,
  `daccionPagoEn` DATE NULL ,
  `objetivos` VARCHAR(255) NULL ,
  `entregaDocumentacionEn` DATE NULL ,
  `resolucionEn` DATE NULL ,
  `resolucion` VARCHAR(255) NULL ,
  `faseNegociacion` VARCHAR(255) NULL ,
  `tipoNegociacion` VARCHAR(255) NULL ,
  `documentos` VARCHAR(255) NULL ,
  PRIMARY KEY (`idAfectado`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `PAHs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PAHs` ;

CREATE  TABLE IF NOT EXISTS `PAHs` (
  `idPAH` INT NOT NULL ,
  `correo` VARCHAR(255) NOT NULL ,
  `passwd` CHAR(40) NOT NULL COMMENT 'Las passwords se guardan cifradas con SHA1.' ,
  `creadoEn` TIMESTAMP NULL ,
  `modificadoEn` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `cambioPasswdEn` TIMESTAMP NULL ,
  `responsable` VARCHAR(255) NULL COMMENT 'Nombre y apellidos del responsable designado por la PAH local.' ,
  `idCiudad` INT NULL ,
  `web` VARCHAR(255) NULL ,
  `rol` VARCHAR(255) NULL ,
  `desactivadaEn` TIMESTAMP NULL ,
  PRIMARY KEY (`idPAH`) ,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `Accesos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Accesos` ;

CREATE  TABLE IF NOT EXISTS `Accesos` (
  `idAcceso` INT NOT NULL ,
  `fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `correo` VARCHAR(255) NULL ,
  `exito` TINYINT(1) NULL ,
  `IP` VARCHAR(15) NULL ,
  `proxyIP` VARCHAR(15) NULL ,
  `userAgent` VARCHAR(255) NULL ,
  INDEX `fecha` (`fecha` ASC) ,
  PRIMARY KEY (`idAcceso`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `Hipotecas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Hipotecas` ;

CREATE  TABLE IF NOT EXISTS `Hipotecas` (
  `idHipoteca` INT NOT NULL ,
  `direccion` VARCHAR(255) NULL ,
  `CP` CHAR(5) NULL ,
  `residenciaHabitual` VARCHAR(255) NULL ,
  `anyoFirmaHipoteca` INT NULL ,
  `importePrestamo` INT NULL ,
  `anyosHipoteca` INT NULL ,
  `tasacion` INT NULL ,
  `cuotaMensual` INT NULL ,
  `pendieteAmortizar` INT NULL ,
  `numAvalistas` INT NULL ,
  `relacionAvalistas` VARCHAR(255) NULL ,
  `impagoEn` DATE NULL ,
  `demandaJudicialEn` DATE NULL ,
  `numEjecucion` VARCHAR(255) NULL ,
  `cantidadPrincipal` INT NULL ,
  `cantidadIntereses` INT NULL ,
  `costasJudiciales` INT NULL ,
  `subastaEn` DATE NULL ,
  `importeAdjudicacion` INT NULL ,
  `deudaRestante` INT NULL ,
  `desahucioEn` DATE NULL ,
  `relacionAfectado` VARCHAR(255) NULL ,
  `numeroTitulares` INT NULL ,
  `idAfectado` CHAR(9) NULL ,
  `idCiudad` INT NULL ,
  `idSucursal` INT NULL ,
  `idBancoActual` INT NULL ,
  `idBancoOrigen` INT NULL ,
  PRIMARY KEY (`idHipoteca`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `Familiares`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Familiares` ;

CREATE  TABLE IF NOT EXISTS `Familiares` (
  `idFamiliar` INT NOT NULL ,
  `nacidoEnAnyo` INT NULL ,
  `dependiente` VARCHAR(255) NULL ,
  `idAfectado` CHAR(9) NULL ,
  PRIMARY KEY (`idFamiliar`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `Ciudades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ciudades` ;

CREATE  TABLE IF NOT EXISTS `Ciudades` (
  `idCiudad` INT NOT NULL ,
  `ciudad` VARCHAR(255) NULL ,
  `provincia` VARCHAR(255) NULL ,
  `CA` VARCHAR(255) NULL ,
  PRIMARY KEY (`idCiudad`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `Bancos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Bancos` ;

CREATE  TABLE IF NOT EXISTS `Bancos` (
  `idBanco` INT NOT NULL ,
  `nombre` VARCHAR(255) NULL ,
  `siglas` VARCHAR(255) NULL ,
  PRIMARY KEY (`idBanco`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `Sucursales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sucursales` ;

CREATE  TABLE IF NOT EXISTS `Sucursales` (
  `idSucursal` INT NOT NULL ,
  `numero` VARCHAR(255) NULL ,
  `direccion` VARCHAR(255) NULL ,
  `CP` VARCHAR(255) NULL ,
  `idCiudad` INT NULL ,
  `idBanco` INT NULL ,
  `personaContacto` VARCHAR(255) NULL ,
  `tf` VARCHAR(255) NULL ,
  `fax` VARCHAR(255) NULL ,
  PRIMARY KEY (`idSucursal`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `Anotaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Anotaciones` ;

CREATE  TABLE IF NOT EXISTS `Anotaciones` (
  `idAnotaciones` INT NOT NULL ,
  `idAfectado` CHAR(9) NULL ,
  `seccion` VARCHAR(100) NULL ,
  `anotacion` MEDIUMTEXT NULL ,
  PRIMARY KEY (`idAnotaciones`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

