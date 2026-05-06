require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Clientes = require('./modelos/Clientes');
const Habitaciones = require('./modelos/Habitaciones');
const Empleados = require('./modelos/Empleados');

const listaHabitaciones = [
    { numero_habitacion: "303", planta: 3, camas: 2, numero_huespedes: 2, precio: 80.0, estado: "libre" },
    { numero_habitacion: "101", planta: 1, camas: 1, numero_huespedes: 1, precio: 50.0, estado: "libre" },
    { numero_habitacion: "501", planta: 5, camas: 3, numero_huespedes: 3, precio: 110.0, estado: "ocupada" },
    { numero_habitacion: "201", planta: 2, camas: 1, numero_huespedes: 1, precio: 55.0, estado: "libre" },
    { numero_habitacion: "505", planta: 5, camas: 1, numero_huespedes: 1, precio: 65.0, estado: "libre" },
    { numero_habitacion: "102", planta: 1, camas: 2, numero_huespedes: 2, precio: 75.0, estado: "ocupada" },
    { numero_habitacion: "302", planta: 3, camas: 3, numero_huespedes: 4, precio: 120.0, estado: "ocupada" },
    { numero_habitacion: "401", planta: 4, camas: 1, numero_huespedes: 1, precio: 60.0, estado: "ocupada" },
    { numero_habitacion: "202", planta: 2, bedrooms: 2, numero_huespedes: 3, precio: 85.0, estado: "ocupada" },
    { numero_habitacion: "402", planta: 4, bedrooms: 2, numero_huespedes: 2, precio: 90.0, estado: "libre" },
    { numero_habitacion: "105", planta: 1, bedrooms: 1, numero_huespedes: 1, precio: 55.0, estado: "ocupada" },
    { numero_habitacion: "301", planta: 3, bedrooms: 2, numero_huespedes: 2, precio: 85.0, estado: "libre" },
    { numero_habitacion: "210", planta: 2, bedrooms: 3, numero_huespedes: 4, precio: 120.0, estado: "reservada" },
    { numero_habitacion: "503", planta: 5, bedrooms: 1, numero_huespedes: 1, precio: 60.0, estado: "libre" },
    { numero_habitacion: "112", planta: 1, bedrooms: 2, numero_huespedes: 2, precio: 70.0, estado: "ocupada" },
    { numero_habitacion: "407", planta: 4, bedrooms: 3, numero_huespedes: 3, precio: 110.0, estado: "libre" },
    { numero_habitacion: "208", planta: 2, bedrooms: 1, numero_huespedes: 1, precio: 50.0, estado: "reservada" },
    { numero_habitacion: "306", planta: 3, bedrooms: 2, numero_huespedes: 2, precio: 80.0, estado: "libre" },
    { numero_habitacion: "604", planta: 6, bedrooms: 2, numero_huespedes: 2, precio: 95.0, estado: "ocupada" },
    { numero_habitacion: "104", planta: 1, bedrooms: 1, numero_huespedes: 1, precio: 45.0, estado: "libre" },
    { numero_habitacion: "309", planta: 3, bedrooms: 3, numero_huespedes: 4, precio: 130.0, estado: "reservada" },
    { numero_habitacion: "504", planta: 5, bedrooms: 2, numero_huespedes: 2, precio: 90.0, estado: "libre" },
    { numero_habitacion: "204", planta: 2, bedrooms: 1, numero_huespedes: 1, precio: 55.0, estado: "ocupada" },
    { numero_habitacion: "410", planta: 4, bedrooms: 2, numero_huespedes: 2, precio: 85.0, estado: "libre" },
    { numero_habitacion: "307", planta: 3, bedrooms: 1, numero_huespedes: 1, precio: 60.0, estado: "reservada" },
    { numero_habitacion: "601", planta: 6, bedrooms: 2, numero_huespedes: 2, precio: 100.0, estado: "libre" },
    { numero_habitacion: "103", planta: 1, bedrooms: 2, numero_huespedes: 2, precio: 75.0, estado: "ocupada" },
    { numero_habitacion: "212", planta: 2, bedrooms: 3, numero_huespedes: 3, precio: 115.0, estado: "libre" },
    { numero_habitacion: "405", planta: 4, bedrooms: 1, numero_huespedes: 1, precio: 50.0, estado: "reservada" },
    { numero_habitacion: "308", planta: 3, bedrooms: 2, numero_huespedes: 2, precio: 85.0, estado: "libre" },
    { numero_habitacion: "502", planta: 5, bedrooms: 3, numero_huespedes: 4, precio: 125.0, estado: "ocupada" },
    { numero_habitacion: "106", planta: 1, bedrooms: 1, numero_huespedes: 1, precio: 48.0, estado: "libre" },
    { numero_habitacion: "211", planta: 2, bedrooms: 2, numero_huespedes: 2, precio: 90.0, estado: "reservada" },
    { numero_habitacion: "406", planta: 4, bedrooms: 2, numero_huespedes: 2, precio: 88.0, estado: "libre" },
    { numero_habitacion: "305", planta: 3, bedrooms: 1, numero_huespedes: 1, precio: 52.0, estado: "ocupada" }
];

const listaClientes = [
    { id: "1", name: "Ana Gómez", city: "Madrid", mail: "ana@mail.com", password: "ana123" },
    { id: "2", name: "Luis Martínez", city: "Barcelona", mail: "luis@mail.com", password: "luis456" },
    { id: "3", name: "María López", city: "Valencia", mail: "maria@mail.com", password: "maria789" },
    { id: "4", name: "Carlos Ruiz", city: "Sevilla", mail: "carlos@mail.com", password: "carlos321" },
    { id: "5", name: "Laura Fernández", city: "Bilbao", mail: "laura@mail.com", password: "laura654" }
];

const listaEmpleados = [
    { id: "1", nombre: "Laura Gómez", puesto: "Director", usuario: "lauraG", password: "pass123", edad: 45, salario: 3500, email: "laura@hotel.com" },
    { id: "2", nombre: "Carlos Ruiz", puesto: "Limpiador", usuario: "carlosR", password: "limpia456", edad: 32, salarial: 1200, email: "carlos@hotel.com" },
    { id: "3", nombre: "Marta Sánchez", puesto: "Recepcionista", usuario: "martaS", password: "recep789", edad: 28, salarial: 1800, email: "marta@hotel.com" },
    { id: "4", nombre: "Luis Fernández", puesto: "Contable", usuario: "luisF", password: "conta321", edad: 39, salary: 2900, email: "luis@hotel.com" },
    { id: "5", nombre: "Ana Torres", puesto: "Recursos Humanos", usuario: "anaT", password: "rh654", edad: 41, salary: 3100, email: "ana@hotel.com" },
    { id: "6", nombre: "Javier López", puesto: "Técnico", usuario: "javiL", password: "tech987", edad: 35, salary: 2600, email: "javier@hotel.com" }
];

const mapHabitacion = (h) => ({
    id: h.numero_habitacion,
    floor: h.planta,
    beds: (h.camas || h.bedrooms || 1).toString(),
    maxGests: h.numero_huespedes,
    price: h.precio,
    ocuped: h.estado !== "libre"
});

const mapCliente = async (c) => ({
    id: c.id.toString(),
    name: c.name,
    city: c.city,
    mail: c.mail,
    password: await bcrypt.hash(c.password, 10)
});

const mapEmpleado = async (e) => ({
    id: e.id.toString(),
    nombre: e.nombre,
    puesto: e.puesto,
    usuario: e.usuario,
    edad: e.edad,
    salario: e.salario || e.salary || e.salarial,
    email: e.email,
    password: await bcrypt.hash(e.password, 10)
});

const datosIniciales = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Conectado a MongoDB');

        const clientesCount = await Clientes.countDocuments();
        const habitacionesCount = await Habitaciones.countDocuments();
        const empleadosCount = await Empleados.countDocuments();

        if (clientesCount === 0) {
            const clientesHashed = await Promise.all(listaClientes.map(mapCliente));
            await Clientes.insertMany(clientesHashed);
            console.log(`${listaClientes.length} clientes creados`);
        } else {
            console.log(`Ya existen ${clientesCount} clientes`);
        }

        if (habitacionesCount === 0) {
            await Habitaciones.insertMany(listaHabitaciones.map(mapHabitacion));
            console.log(`${listaHabitaciones.length} habitaciones creadas`);
        } else {
            console.log(`Ya existen ${habitacionesCount} habitaciones`);
        }

        if (empleadosCount === 0) {
            const empleadosHashed = await Promise.all(listaEmpleados.map(mapEmpleado));
            await Empleados.insertMany(empleadosHashed);
            console.log(`${listaEmpleados.length} empleados creados`);
        } else {
            console.log(`Ya existen ${empleadosCount} empleados`);
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

datosIniciales();