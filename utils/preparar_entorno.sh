#!/bin/bash
#
# Script interactivo para preparar el entorno de ejecución de pahdb con pool de PHPFPM, nginx y MySQL.
# Debe ejecutarse como root y tener definido /root/.my.cnf
#
# 1. Crea usuario en el sistema
# 2. Crea usuario y base de datos con el mismo nombre que el de sistema
# 3. Generar el certificado SSL autofirmado
# 4. Configura entorno de ejecución de php
# 5. Configura virtualhost de nginx
# 6. Ajustamos permisos
#

## VARIABLES DE CONFIGURACIÓN DEPENDIENTES DE LA DISTRIBUCIÓN
NGINX_EXE="/etc/init.d/nginx"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
PHPFPM_EXE="/etc/init.d/php5-fpm"
PHPFPM_POOL_DIR="/etc/php5/fpm/pool.d"
SED_EXE="/bin/sed"
# Las variables USUARIO, GRUPO, PASSWD, DOMINIO, PUERTO, PERMISOS_DIR y PERMISOS_FICH si se definen aqui no se preguntará por ellas
USUARIO=""
GRUPO="www-data"
PASSWD=""
DOMINIO=""
PUERTO="80"
PERMISOS_DIR="750"
PERMISOS_FICH="640"

# Colores
COLOR_ROJO="\e[31m"
COLOR_VERDE="\e[32m"
COLOR_AZUL="\e[36m"
COLOR_NORMAL="\e[0m"

# Nos aseguramos que nos encontramos en el directorio donde está el script
SCRIPTPATH=$( cd $(dirname $0) ; pwd -P)
cd "$SCRIPTPATH"

# Si existe el archivo entorno.conf cargamos las variables de configuración personalizadas desde ahí
if [[ -f entorno.conf ]]; then
	source entorno.conf
	echo -e "${COLOR_VERDE}Cargada configuración de entorno personalizada${COLOR_NORMAL}"
fi

## REVISAMOS LA CONFIGURACIÓN
SALIR=""
# nginx
if [[ ! -x $NGINX_EXE || ! -d $NGINX_SITES_AVAILABLE || ! -d $NGINX_SITES_ENABLED ]]; then
	echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} Configuración de Nginx incorrecta. Revisa $0"
	SALIR="ERROR"
fi
# phpfpm
if [[ ! -x $PHPFPM_EXE || ! -d $PHPFPM_POOL_DIR ]]; then
	echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} Configuración de PHPFPM incorrecta. Revisa $0"
	SALIR="ERROR"
fi
# sed
if [[ ! -x $SED_EXE ]]; then
	echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} comando sed no encontrado. Revisa $0"
	SALIR="ERROR"
fi
# /root/.my.cnf
if [[ ! -f /root/.my.cnf ]]; then
	echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} /root/.my.cnf no encontrado."
	SALIR="ERROR"
fi
if [[ ! -z $SALIR ]]; then exit 1; fi

# Si están definidas como variables de configuración no preguntamos por su valor
if [[ -z "$USUARIO" ]];       then read -p "Usuario:         " USUARIO;       else echo "Usuario:         $USUARIO"; fi
if [[ -z "$GRUPO" ]];         then read -p "Grupo:           " GRUPO;         else echo "Grupo:           $GRUPO";   fi
if [[ -z "$PASSWD" ]];        then read -p "Contraseña (BD): " PASSWD;        else echo "Contraseña (BD): $PASSWD";  fi
if [[ -z "$DOMINIO" ]];       then read -p "Dominio:         " DOMINIO;       else echo "Dominio:         $DOMINIO"; fi
if [[ -z "$PUERTO" ]];        then read -p "Puerto (nginx):  " PUERTO;        else echo "Puerto (nginx):  $PUERTO";  fi
if [[ -z "$PERMISOS_FICH" ]]; then read -p "Permisos (fich): " PERMISOS_FICH; else echo "Permisos (fich): $PERMISOS_FICH";  fi
if [[ -z "$PERMISOS_DIR" ]];  then read -p "Permisos (dirs): " PERMISOS_DIR;  else echo "Permisos (dirs): $PERMISOS_DIR";  fi

# Si alguna de las variables necesarias está sin definir abortamos la instalación
if [[ -z "$USUARIO" || -z "$GRUPO" || -z "$PASSWD" || -z "$DOMINIO" || -z "$PUERTO" ]]; then
	echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} Todos los datos deben estar definidos. Abortado..."
	exit 1
fi


## 1. Crea usuario en el sistema
read -p "¿Crear usuario de sistema? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	if [[ -d "/home/$USUARIO" ]]; then
		echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} El usuario ya existe. Abortado..."
		exit 1
	fi
	useradd -d "/home/$USUARIO" -m -s /bin/bash "$USUARIO"
	echo "$USUARIO:$PASSWD" | chpasswd
	# Añadimos el usuario al grupo
	usermod -aG $USUARIO $GRUPO
	# Damos al grupo permisos de lectura y ejecución sobre la home del usuario
	chmod g+rx "/home/$USUARIO"
	echo -e "${COLOR_VERDE}OK! Usuario creado con éxito${COLOR_NORMAL}"
fi

## 2. Crea usuario y base de datos con el mismo nombre que el de sistema
read -p "¿Crear usuario en la base de datos? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	SENTENCIA="CREATE DATABASE IF NOT EXISTS $USUARIO CHARACTER SET utf8 COLLATE utf8_general_ci;"
	RESULTADO=`mysql -s -e "$SENTENCIA" 2>&1`
	if [[ "$RESULTADO" == *ERROR* ]]; then 
		echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} No se pudo crear la base de datos"
		exit 1
	else
		echo "Base de datos $USUARIO creada"	
		SENTENCIA="GRANT ALL PRIVILEGES ON $USUARIO.* TO '$USUARIO'@'localhost' IDENTIFIED BY '$PASSWD';"
		RESULTADO=`mysql -s -e "$SENTENCIA" 2>&1`
		if [[ "$RESULTADO" == *ERROR* ]]; then
			echo -e "${COLOR_ROJO}ERROR:${COLOR_NORMAL} No se pudo crear el usuario de la base de datos"
			exit 1
		else
			echo -e "${COLOR_VERDE}OK! Base de datos generada con éxito${COLOR_NORMAL}"
			# generamos .my.cnf
			echo "[client]" > "/home/$USUARIO/.my.cnf"
			echo "user=$USUARIO" >> "/home/$USUARIO/.my.cnf"
			echo "password=$PASSWD" >> "/home/$USUARIO/.my.cnf"
		fi
	fi
fi

## 3. Generar el certificado SSL autofirmado
read -p "¿Generar certificado SSL autofirmado? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	./genera_certificado.sh "${USUARIO}:${GRUPO}" "/home/${USUARIO}/ssl"
	if [[ "$?" == "0" ]]; then echo -e "${COLOR_VERDE}OK! Certificado autofirmado generado con éxito${COLOR_NORMAL}"; fi
fi

cd "$SCRIPTPATH"

## 4. Configura entorno de ejecución de php
read -p "¿Crear un entorno de ejecución para PHP-FPM? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	POOL="${PHPFPM_POOL_DIR}/${USUARIO}.conf"
	# copiamos la plantilla
	cp phpfpm.plantilla $POOL
	# sustituimos las marcas
	$SED_EXE -i "s/\[\[SOCKET\]\]/\/run\/${USUARIO}.socket/g" $POOL
	$SED_EXE -i "s/\[\[USUARIO\]\]/$USUARIO/g" $POOL
	$SED_EXE -i "s/\[\[GRUPO\]\]/$GRUPO/g" $POOL
	# creamos directorio de log y sesiones
	mkdir -p "/home/${USUARIO}/log"
	mkdir -p "/home/${USUARIO}/sesiones"
	# reiniciamos php-fpm
	$PHPFPM_EXE restart	
	if [[ "$?" == "0" ]]; then echo -e "${COLOR_VERDE}OK! Entorno de ejecución php generado con éxito${COLOR_NORMAL}"; fi
fi

## 5. Configura virtualhost de nginx
read -p "¿Crear un virtualhost de nginx? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	NGINX="${NGINX_SITES_AVAILABLE}/${DOMINIO}"
	# copiamos la plantilla
	cp nginx.plantilla $NGINX
	# sustituimos las marcas
	$SED_EXE -i "s/\[\[SOCKET\]\]/\/run\/${USUARIO}.socket/g" $NGINX
	$SED_EXE -i "s/\[\[DOMINIO\]\]/${DOMINIO}/g" $NGINX
	$SED_EXE -i "s/\[\[RAIZ\]\]/\/home\/$USUARIO/g" $NGINX
	$SED_EXE -i "s/\[\[PUERTO\]\]/$PUERTO/g" $NGINX
	# creamos directorio de log y www
	mkdir -p "/home/${USUARIO}/log"
	mkdir -p "/home/${USUARIO}/www"
	# activamos virtualhost
	ln -s "$NGINX" "${NGINX_SITES_ENABLED}/${DOMINIO}"
	# recargamos nginx
	$NGINX_EXE reload
	if [[ "$?" == "0" ]]; then echo -e "${COLOR_VERDE}OK! Host virtual generado con éxito${COLOR_NORMAL}"; fi
fi

cd "$SCRIPTPATH"
## 6. Ajustamos permisos. TODO: Revisar
read -p "¿Ajustamos permisos a la home del usuario? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	find "/home/$USUARIO" -name "*" -exec chown ${USUARIO}:${GRUPO} "{}" \;
	find "/home/$USUARIO" -name "*" -type f -exec chmod ${PERMISOS_FICH} "{}" \;
	find "/home/$USUARIO" -name "*" -type d -exec chmod ${PERMISOS_DIR} "{}" \;
	if [[ "$?" == "0" ]]; then echo -e "${COLOR_VERDE}OK! Ajustados los permisos con éxito${COLOR_NORMAL}"; fi
fi
