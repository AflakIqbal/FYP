const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Vehicle = require('../../../models/owner/Vehicle');
const Owner = require('../../../models/owner/Owner');
const { check, validationResult } = require('express-validator');

// @route   GET /api/owner/vehicle
// @desc    get current owner vehicle
// @access  Private

router.get('/my', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      owner: req.user.id
    }).populate('owner', ['name', 'address']);

    if (!vehicles) {
      return res.status(400).json({ msg: 'There is no vehicle' });
    }
    res.json(vehicles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, vehicle');
  }
});

// @route   post /api/vehicle/add
// @desc    get current owner vehicle
// @access  Private
router.post(
  '/add',
  [
    auth,
    check('type', 'type is required')
      .not()
      .isEmpty(),
    check('manufacturer', 'Manufacturer is required')
      .not()
      .isEmpty(),
    check('model', 'Model is required')
      .not()
      .isEmpty(),
    check('year', 'Year is required')
      .not()
      .isEmpty(),
    check('seatingCapacity', 'Capacity is required')
      .not()
      .isEmpty(),
    check('transmission', 'Transmition is required')
      .not()
      .isEmpty(),
    check('fare', 'fare is required & should be a number').isInt()
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      manufacturer,
      model,
      year,
      seatingCapacity,
      transmission,
      fare
    } = req.body;

    //buid vehicla object
    const vehicleFields = {};
    vehicleFields.owner = req.user.id;
    if (type) vehicleFields.type = type;
    if (manufacturer) vehicleFields.manufacturer = manufacturer;
    if (model) vehicleFields.model = model;
    if (year) vehicleFields.year = year;
    if (seatingCapacity) vehicleFields.seatingCapacity = seatingCapacity;
    if (transmission) vehicleFields.transmission = transmission;
    if (fare) vehicleFields.fare = fare;

    try {
      //   let vehicle = await Vehicle.findOne({ owner: req.user.id });

      //   if (vehicle) {
      //     //update
      //     vehicle = await Vehicle.findOneAndUpdate(
      //       { owner: req.user.id },
      //       { $set: vehicleFields },
      //       { new: true }
      //     );
      //     console.log(vehicle);
      //     return res.json(vehicle);
      //   }

      //create
      const vehicle = new Vehicle(vehicleFields);
      await vehicle.save();
      res.json(vehicle);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   post /api/vehicle/all
// @desc    get all vehicle
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('owner', [
      'name',
      'address'
    ]);
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/vehicle/ownerVehicle
// @desc    get all vehicle
// @access  Public
router.get('/ownerVehicle', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user.id });
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   Delete /api/owner/vehicle/delete
// @desc    delete vehicle
// @access  Private

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    //delete vehicle
    console.log(req.params.id);
    await Vehicle.findByIdAndRemove(req.params.id);

    // if (!vehicle) {
    //   return res.status(400).json({ msg: 'vehicle not found' });
    // }
    res.json({ msg: 'vehicle deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, vehicle');
  }
});

module.exports = router;
