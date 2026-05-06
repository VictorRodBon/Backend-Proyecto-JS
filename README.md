# Backend-Proyecto-JS

Backend para gestión de hotel con Node.js, Express y MongoDB.

## Stack

- **Node.js** + **Express**
- **MongoDB** (contenedor Docker)
- **Mongo Express** (interfaz web)
- **express-session** (gestión de sesiones)
- **bcrypt** (hash de contraseñas)

## Estructura

```
├──index.js           # Servidor principal
├──modelos/           # Modelos Mongoose
│   ├── Clientes.js
│   ├── Empleados.js
│   └── Habitaciones.js
├──controladores/     # Lógica de negocio
│   ├── controladorLogin.js
│   ├── controladorClientes.js
│   └── controladorHabitaciones.js
├──rutas/             # Rutas Express
│   ├── rutasClientes.js
│   └── rutasHabitaciones.js
├──util/              # Utilidades
│   ├── validate.js
│   └── logger.js
├──seed.js            # Datos iniciales
└──docker-compose.yml # Contenedores Docker
```

## Instalación

```bash
npm install
```

## Docker

```bash
docker compose up -d
```

Puertos:
- **3000**: Servidor Node.js
- **27017**: MongoDB
- **9017**: Mongo Express (`user123`/`pass123`)

## Iniciar servidor

```bash
node index.js
```

## API

### Login
- **POST** `/usuarios/login`
```json
{
  "identificador": "ana@mail.com",
  "password": "ana123"
}
```

### Logout
- **POST** `/usuarios/logout`

### Habitaciones
- **GET** `/habitaciones` - Listar todas
- **PUT** `/habitaciones/:id` - Actualizar
```json
{
  "ocuped": true
}
```

## Datos iniciales

```bash
node seed.js
```

Genera:
- 5 clientes
- 35 habitaciones
- 6 empleados