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

# Nos aseguramos que nos encontramos en el directorio donde está el script
SCRIPTPATH=$( cd $(dirname $0) ; pwd -P)
cd "$SCRIPTPATH"

read -p "Usuario:         " USUARIO
#read -p "Grupo:           " GRUPO
GRUPO="www-data"
read -p "Contraseña (BD): " PASSWD
read -p "Dominio:         " DOMINIO
PUERTO="8080"
#read -p "Puerto (nginx):  " PUERTO

if [[ -z "$USUARIO" || -z "$GRUPO" || -z "$PASSWD" || -z "$DOMINIO" || -z "$PUERTO" ]]; then
	echo "ERROR: Todos los datos deben estar definidos. Abortado..."
	exit 1
fi

# 1. Crea usuario en el sistema
read -p "¿Crear usuario de sistema? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	if [[ -d "/home/$USUARIO" ]]; then
		echo "ERROR: El usuario ya existe. Abortado..."
		exit 1
	fi
	useradd -d "/home/$USUARIO" -m -s /bin/bash "$USUARIO"
	echo "$USUARIO:$PASSWD" | chpasswd
	# Añadimos el usuario al grupo
	usermod -aG $USUARIO $GRUPO
	# Damos al grupo permisos de lectura y ejecución sobre la home del usuario
	chmod g+rx "/home/$USUARIO"
fi

# 2. Crea usuario y base de datos con el mismo nombre que el de sistema
read -p "¿Crear usuario en la base de datos? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	SENTENCIA="CREATE DATABASE IF NOT EXISTS $USUARIO CHARACTER SET utf8 COLLATE utf8_general_ci;"
	RESULTADO=`mysql -s -e "$SENTENCIA" 2>&1`
	if [[ "$RESULTADO" == *ERROR* ]]; then 
		echo "(_*_) ERROR CREANDO BD"
		exit 1
	else
		echo "Base de datos $USUARIO creada"	
		SENTENCIA="GRANT ALL PRIVILEGES ON $USUARIO.* TO '$USUARIO'@'localhost' IDENTIFIED BY '$PASSWD';"
		RESULTADO=`mysql -s -e "$SENTENCIA" 2>&1`
		if [[ "$RESULTADO" == *ERROR* ]]; then
			echo "(_*_) ERROR CREANDO USUARIO"
			exit 1
		else
			echo "$USUARIO creada"
			# generamos .my.cnf
			echo "[client]" > "/home/$USUARIO/.my.cnf"
			echo "user=$USUARIO" >> "/home/$USUARIO/.my.cnf"
			echo "password=$PASSWD" >> "/home/$USUARIO/.my.cnf"
		fi
	fi
fi

# 3. Generar el certificado SSL autofirmado
read -p "¿Generar certificado SSL autofirmado? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	./genera_certificado.sh "${USUARIO}:${GRUPO}" "/home/${USUARIO}/ssl"
fi

cd "$SCRIPTPATH"

# 4. Configura entorno de ejecución de php
read -p "¿Crear un entorno de ejecución para PHP-FPM? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	POOL="/etc/php5/fpm/pool.d/${USUARIO}.conf"
	# copiamos la plantilla
	cp phpfpm.plantilla $POOL
	# sustituimos las marcas
	sed -i "s/\[\[SOCKET\]\]/\/run\/${USUARIO}.socket/g" $POOL
	sed -i "s/\[\[USUARIO\]\]/$USUARIO/g" $POOL
	sed -i "s/\[\[GRUPO\]\]/$GRUPO/g" $POOL
	# reiniciamos php-fpm
	/etc/init.d/php5-fpm restart
fi

# 5. Configura virtualhost de nginx
read -p "¿Crear un virtualhost de nginx? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	NGINX="/etc/nginx/sites-available/${DOMINIO}"
	# copiamos la plantilla
	cp nginx.plantilla $NGINX
	# sustituimos las marcas
	sed -i "s/\[\[SOCKET\]\]/\/run\/${USUARIO}.socket/g" $NGINX
	sed -i "s/\[\[DOMINIO\]\]/${DOMINIO}/g" $NGINX
	sed -i "s/\[\[RAIZ\]\]/\/home\/$USUARIO/g" $NGINX
	sed -i "s/\[\[PUERTO\]\]/$PUERTO/g" $NGINX
	# creamos directorio de log
	mkdir -p "/home/${USUARIO}/log"
	# activamos virtualhost
	ln -s "$NGINX" "/etc/nginx/sites-enabled/${DOMINIO}"
	# recargamos nginx
	/etc/init.d/nginx reload
fi

cd "$SCRIPTPATH"
# 6. Ajustamos permisos. TODO: Revisar
read -p "¿Ajustamos permisos a la home del usuario? (S/N) " CONFIRMA
if [[ "$CONFIRMA" == "S" || "$CONFIRMA" == "s" ]]; then
	find "/home/$USUARIO" -name "*" -exec chown ${USUARIO}:${GRUPO} "{}" \;
	find "/home/$USUARIO" -name "*" -type f -exec chmod 640 "{}" \;
	find "/home/$USUARIO" -name "*" -type d -exec chmod 750 "{}" \;
fi
