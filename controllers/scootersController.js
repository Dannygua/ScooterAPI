import Scooter from "../models/Scooters.js";
import User from "../models/Users.js";
import {
  DeleteUniqueImage,
  uploadMultipleImages,
} from "../utils/uploadImage.js";

const createScooters = async (req, res) => {
  const { user } = req;
  const { Test } = req.body;

  try {
    const admin = await User.findById(user.id);

    if (!admin) {
      const error = new Error("Administrador no registrado");
      return res.status(400).json({ msg: error.message, status: false });
    }

    if (admin.isAdmin) {
      const scooter = new Scooter(req.body);

      if (Test && Test.resultPhoto) {
        let url = await uploadMultipleImages(Test.resultPhoto);
        scooter.Test.resultPhoto = [];
        url.map(async (file) => {
          scooter.Test.resultPhoto.push(file.file);
        });
      }
      await scooter.save();

      res
        .status(200)
        .json({ msg: "Scooter creado Correctamente", status: true });
    } else {
      const error = new Error("usuario no autorizado para esta accion");
      return res.status(400).json({ msg: error.message, status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getScooters = async (req, res) => {
  try {
    const scooters = await Scooter.find();
    res.status(200).json({ data: scooters, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getScootersPrice = async (req, res) => {
  const { maxprice, minprice } = req.body;
  try {
    const scooters = await Scooter.find({
      $and: [{ price: { $gte: minprice } }, { price: { $lte: maxprice } }],
    });
    res.status(200).json({ data: scooters, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getScooter = async (req, res) => {
  const { id } = req.params;

  try {
    const scooters = await Scooter.find({ _id: id });
    res.status(200).json({ data: scooters, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const editScooter = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { Test } = req.body;
  try {
    const admin = await User.findById(user.id);

    const scooter = await Scooter.findById(id);

    if (!scooter) {
      const error = new Error("Scooter no encontrado");
      return res.status(401).json({ msg: error.message, status: false });
    }

    if (admin.isAdmin) {
      if (Test && Test.resultPhoto) {
        scooter.Test.resultPhoto.map(async (file) => {
          const arr = file.split(/[./]/);
          await DeleteUniqueImage(arr[9]);
        });

        let url = await uploadMultipleImages(Test.resultPhoto);

        scooter.Test.resultPhoto = [];
        url.map((file) => {
          scooter.Test.resultPhoto.push(file.file);
        });
      }

      scooter.name = req.body.name || scooter.name;
      scooter.price = req.body.price || scooter.price;
      scooter.description = req.body.description || scooter.description;
      const scooterstored = await scooter.save();
      res.status(200).json({ msg: scooterstored, status: true });
    } else {
      const error = new Error("Usuario no autorizado para esta accion");
      return res.status(400).json({ msg: error.message, status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const deleteScooter = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const admin = await User.findById(user.id);
    const scooter = await Scooter.findById(id);

    if (!scooter) {
      const error = new Error("No Encontrado");
      return res.status(401).json({ msg: error.message, status: false });
    }

    if (admin.isAdmin) {
      await scooter.deleteOne();
      res.status(200).json({ msg: "Scooter Eliminado", status: true });
    } else {
      const error = new Error("Usuario no autorizado para esta accion");
      return res.status(400).json({ msg: error.message, status: false });
    }
  } catch (error) {
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

export {
  createScooters,
  getScooters,
  getScooter,
  editScooter,
  deleteScooter,
  getScootersPrice,
};
