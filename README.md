# Vagrant + Docker-compose + MongoDB
Este repositorio contiene un proyecto con acciones/funciones de un base de datos para MongoDB <br>
Usango Vagrant + Docker-compose

# Requisitos funcionales
Para hacer funcionar la aplicación se requiere tener instalado, como requisito lo siguiente:
* NodeJS +14.x.x (o superior)
* npm
* docker
* docker-compose
* vagrant
* MongoDB
* Browser (Google Chrome, Firefox, etc.)

# Acceder a servidor MongoDB
Este comando accede al servidor de MongoDB <br>
con autenticación con los siguientes datos:
+  Usuario: root
+  Contraseña: secret
+  Puerto: 27025
  
```shell
   mongo -u root -p secret  --port 27025
```

# Acceder a la base de datos con usuario por defecto (usario user_vagrant)

```shell
   mongo mongodb://user_vagrant:pass@localhost:27025/db_vagrant?authSource=admin
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

# Crear un nuevo usario
Este comando sirve para crear nuevos usuarios usando la base de datos admin
```shell
   mongo mongodb://root:secret@localhost:27025/admin --authenticationDatabase=admin --eval "db.runCommand({createUser: 'myuser', pwd: 'mypassword', roles: [{ role: 'readWrite', db: 'mydatabase' }]})"
```

# Acceder a la base de datos
Este comando accede a la base de datos de `music_app` usando mongo <br>
con autenticación con los siguientes datos:
+  Usuario: myuser
+  Contraseña: mypassword
+  Host: localhost
+  Puerto: 27025
+  Base de datos: mydatabase
+  Autorización: admin

```shell
   mongo mongodb://myuser:mypassword@localhost:27025/mydatabase?authSource=admin
```