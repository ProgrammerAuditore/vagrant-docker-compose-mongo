# Vagrant + Docker-compose + MongoDB
Este repositorio contiene un proyecto con acciones/funciones de un base de datos para MongoDB <br>
Usango Vagrant + Docker-compose

# Screenshot

![Preview 1](/screenshot/preview_01.jpg)

![Preview 2](/screenshot/preview_02.jpg)

# Requisitos funcionales
Para hacer funcionar la aplicación se requiere tener instalado, como requisito lo siguiente:
* NodeJS +14.x.x (o superior)
* npm
* docker
* docker-compose
* vagrant
* MongoDB
* Browser (Google Chrome, Firefox, etc.)

# Configuración App | Mongoose App
Es necesario crear un archivo `.env` del proyecto de backend dentro del path **./mongoose**, opcionalmente puede hacer una copia del archivo `.env.example` con el nombre de **.env** que incluyen variables de entorno predeterminado o por default para funcionar con **docker-compose** y **vagrant**. <br> 

### Variables de entorno para App | Mongoose App

* __Variables de entorno (para servidor local)__ 
  *  **API_PORT** *(Requerido)* Puerto para __service_mongoose__ por default es `3055`
  *  **APP_DB_URI** *(Requerido)* <br/> Solo en caso de requerir usuario y contraseña, por ejemplo: `mongodb://<user>:<password>@<host>:<port>/<database>?<options>`. <br>
  Este variable de entorno anula *APP_DB_USER*, *APP_DB_PASSWORD* y *APP_DB_DATABASE*. <br>
  El URI por defecto es __mongodb://user_vagrant:pass@service_db/db_vagrant?authSource=admin__
 
* __Variables de entorno (para servidor MongoDB Atlas)__
  *  __APP_DB_USER__ *(Requerido)* Usuario proporcionado por MongoDB Atlas.
  * __APP_DB_PASSWORD__ *(Requerido)* Contraseña proporcionado por MongoDB Atlas.
  *  __APP_DB_DATABASE__ *(Requerido)* Nombre de la base de datos proporcionado por MongoDB Atlas
  

# Acceder a servidor MongoDB
Este comando accede al servidor de MongoDB <br>
con autenticación con los siguientes datos:
+  Usuario: root
+  Contraseña: secret
+  Puerto: 2755
  
```shell
   mongo -u root -p secret  --port 2755
```

# Acceder a la base de datos con usuario por defecto dentro de docker-compose (usario user_vagrant)
Este comando se usa para interior del contenedor docker, es decir, para que los servicios <br>
del docker-compose se puedan comunicar entre servicio `service_db` y `service_mongoose`

**NOTA** <br>
Este URI `mongodb://user_vagrant:pass@service_db/db_vagrant?authSource=admin` es la que se usa por defecto.

```shell
   mongo mongodb://user_vagrant:pass@service_db/db_vagrant?authSource=admin
```

# Acceder a la base de datos con usuario por defecto fuera de docker-compose (usario user_vagrant)
Este comando se usa para fuera del contenedor docker

```shell
   mongo mongodb://user_vagrant:pass@localhost:2755/db_vagrant?authSource=admin
```

## Correr aplicación de forma automatizada (Usando docker-compose)
Es necesario ejecutar el siguiente comando desde donde se encuetra el archivo **docker-compose.yml** 

##### Esto construye y corre la aplicación en segundo plano
```shell
   docker-compose build && docker-compose up -d
```

##### Esto detiene y elimina la aplicación
```shell
   docker-compose stop -f && docker-compose rm -f
```

## Correr aplicación de forma automatizada (Usando vagrant)
Es necesario ejecutar el siguiente comando desde donde se encuetra el archivo **docker-compose.yml** 

##### Solo si, lo ejecuta por primera vez
```shell
   vagrant up 
```

##### Ejecutalo las veces necesarias
```shell
   vagrant reload --provision
```

##### NOTA
create-user.js ; Se ejecutará solo si la carpeta __/data/db__ <br>
no contenga contenido de MongoDB (es decir, si no se ha inicializado MongoDB) 

# Crear un nuevo usario
Este comando sirve para crear nuevos usuarios usando la base de datos admin
```shell
   mongo mongodb://root:secret@localhost:2755/admin --authenticationDatabase=admin --eval "db.runCommand({createUser: 'myuser', pwd: 'mypassword', roles: [{ role: 'readWrite', db: 'mydatabase' }]})"
```

# Acceder a la base de datos
Este comando accede a la base de datos de usando el usuario creado previamente. <br>
Usando MongoDB con los siguientes datos de autenticación:
+  Usuario: myuser
+  Contraseña: mypassword
+  Host: localhost
+  Puerto: 2755
+  Base de datos: mydatabase
+  Autorización: admin

```shell
   mongo mongodb://myuser:mypassword@localhost:2755/mydatabase?authSource=admin
```
