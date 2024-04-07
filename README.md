# Prueba Técnica Backend: Nodejs, TypeScript y Nestjs

La API tiene como propósito facilitar la gestión integral de hoteleria mediante reservacion. Permite registrar habitaciones disponibles, así como asociar y desasociar habitacion de reserva y cliente de manera eficiente. La funcionalidad incluye la validación automática para garantizar que una habitacion no tome varias reservas a la vez solo pueda cargar habitaciones no asignados previamente, y viceversa, simplificando así la administración de las habitaciones.

## Tabla de Contenidos

- [Tecnologías](#Tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)

## Tecnologías

```


1. dotenv
Se uso para almacenar configuraciones sensibles (credenciales de base de datos, etc) fuera del codigo fuente y facilitar la gestion de entornos 
de desarrollo

2. Nestjs
Se uso para la creacion de ritas, el manejo de solicitudes y respuestas HTTP.


3.  morgan
Se utilizo para registrar la informacion sobre las solicitudes recibidas, lo que es util para el monitoreo.

4. TypORM
Para interactuar con la base de datos MYSQL y Facilitar sus consultas.


```


## Instalación

intalacion de dependencia:
```bash
npm install
``` 


Crear un archivo .env con las variables de entorno de la api

```bash
HTTP_PORT=4000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PORT=3306
MYSQL_DBNAME=nestdb
MYSQL_PASSWORD=
```

## Uso

Ejecutar:
```bash
npm run start:dev
```


A continuación, use la herramiente preferida para enviar peticiones HTTP. En mi caso uso postman.

Primero va la ruta de registro que es la siguiente: http://localhost:3000/habitacion

Hacer una peticion POST, en el body pasar un json con la siguiente estructura: 

```json
{
    "numberBed": 2, 
    "tipo": "Doble",
    "descripcion": "Tres Camas doble ",
    "estado": "Disponible"
}
```

la api debe de responder con status 201 (created). 


#### Metodo de traer a todos las habitacion, se usa la peticion Get. 

http://localhost:3000/habitacion  

#### Metodo de traer a todos las habitacion segun id, se usa la peticion Get. Se modifica el numero 1 segun el id que busca de la habitacion creada

http://localhost:3000/habitacion/1 

#### Metodo de traer a todos las habitacion la disponibilidad disponible, se usa la peticion Get. Se modifica el numero 2 segun la pagina que desea ver, porque esta paginada segun la cantidad de habitacion disponibles.

http://localhost:3000/habitacion/disponible/2


#### Metodo de actualizar habitacion, se usa la peticion PUT. El ultimo numero es el ID de la habitacion que desea actualizar

http://localhost:3000/habitacion/4

en el body pasar un json con los atributos que desea modificar de la habitacion deseada:

```json
{
    "estado": "Disponible"
}
```

#### Metodo de actualizar habitacion, se usa la peticion DELETE. El ultimo numero es el ID de la habitacion que desea eliminarrr

http://localhost:3000/habitacion/4

en el body pasar un json con los atributos que desea modificar de la habitacion deseada:

```json
{
    "response": "Room deleted",
    "status": 200,
    "message": "Room deleted",
    "name": "HttpException"
}
```

#### Metodo de traer a todos las reservas, se usa la peticion Get. 

http://localhost:3000/reserva  


#### Metodo de crear reserva, se usa la peticion POST.

http://localhost:3000/reserva

en el body pasar un json con los atributos que desea modificar de la habitacion deseada:

```json
{
    "horaInicio": "10:00",
    "horaFin": "11:00",
    "roomId": 4,
    "clientId": 4
}
```

#### Metodo de traer a todos los cliente, se usa la peticion Get. 

http://localhost:3000/cliente 

#### Metodo de crear cliente, se usa la peticion POST.

http://localhost:3000/cliente

en el body pasar un json con los atributos que desea modificar de la habitacion deseada:

```json
{
    "nombre":"juan",
    "email":"juanfelipe@hotmail.com",
    "telefono":315
}
```