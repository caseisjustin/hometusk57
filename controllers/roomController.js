import Room from '../models/Room.js';

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.getAll();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.getById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req, res, next) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom[0]);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.update(req.params.id, req.body);
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(updatedRoom[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.delete(req.params.id);
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    next(error);
  }
};
