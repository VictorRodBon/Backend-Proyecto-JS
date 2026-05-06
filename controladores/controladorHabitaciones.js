const Habitaciones = require('../modelos/Habitaciones.js');

const SECRET_KEY = process.env.SECRET_KEY;

const getHabitaciones = async (req, res) => {
    try{
        const habitaciones = await Habitaciones.find();
        res.status(200).json(habitaciones);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener las habitaciones', error });
    }
}

const getHabitacionById = async (req, res) => {
    try{
        const {id}= req.body;
        const habitacion = await Habitaciones.findById(id);
        if(!habitacion)return res.status(404).json({ message: 'Habitación no encontrada' });
        res.status(200).json(habitacion);
    }catch(err){
        res.status(500).json({ message: 'Error al obtener la habitación por id', err });
    }
}

const crearHabitacion = async(req,res) => {
    try{}catch(err){res.status(500).json({message: "Error al crear la habitación"})}
}

const actualizarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const habitacion = await Habitaciones.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!habitacion) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        res.status(200).json(habitacion);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar la habitación", error: err.message });
    }
};

module.exports = {
    getHabitaciones,
    getHabitacionById,
    crearHabitacion,
    actualizarHabitacion,
};