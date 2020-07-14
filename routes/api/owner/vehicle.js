const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Vehicle = require('../../../models/owner/Vehicle');
const Booking = require('../../../models/owner/Booking');
const Owner = require('../../../models/owner/Owner');
const { check, validationResult } = require('express-validator');

// @route   GET /api/owner/vehicle
// @desc    get current owner vehicle
// @access  Private

router.get('/my', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      owner: req.user.id,
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
// @desc    ADD new owner's vehicle
// @access  Private
router.post(
  '/add',
  [
    auth,
    check('type', 'type is required').not().isEmpty(),
    check('manufacturer', 'Manufacturer is required').not().isEmpty(),
    check('model', 'Model is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('seatingCapacity', 'Capacity is required').not().isEmpty(),
    check('transmission', 'Transmition is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('fare', 'fare is required & should be a number').isInt(),
    check('driver', 'driver required as boolean').isBoolean(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      city,
      manufacturer,
      model,
      year,
      seatingCapacity,
      transmission,
      fare,
      driver,
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
    if (city) vehicleFields.city = city;
    if (driver) vehicleFields.driver = driver;

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
      'address',
    ]);
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/Ownervehicle/ownerVehicle
// @desc    get all owner vehicle's
// @access  Public
router.get('/ownerVehicle', auth, async (req, res) => {
  try {
    console.log('route pe pohncha');
    const vehicles = await Vehicle.find({ owner: req.user.id });
    console.log(req.user.id);
    console.log(vehicles);
    res.json(vehicles);
    console.log('route chala');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/vehicle/bookings
// @desc    get all bookings of a vehicle
// @access  Public
router.get('/bookings/:vehicleId', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      vehicle: req.params.vehicleId,
      booked: 'true',
    }).populate('customer', ['name']);
    res.json(bookings);
    console.log('route chala');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/vehicle/vehicle/:id
// @desc    get all bookings of a vehicle
// @access  Public
router.get('/vehicle/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.id,
    });
    res.json(vehicle);
    console.log('route chala');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/vehicle/vehicles
// @desc    get all bookings of a vehicle
// @access  Public
router.get('/vehicles/:type/:city/:driver', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      type: req.params.type,
      city: req.params.city,
      driver: req.params.driver,
    }).populate('owner', ['city']);
    res.json(vehicles);
    console.log('route chala');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/vehicle/bookings
// @desc    get all bookings of a owner
// @access  Public
router.get('/ownerBookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      owner: req.user.id,
    })
      .populate('vehicle', ['manufacturer', 'model'])
      .populate('customer', ['name']);
    res.json(bookings);
    console.log('route chala');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/vehicle/bookings
// @desc    get all bookings of a customer
// @access  Public
router.get('/customerBookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user.id,
      booked: 'true',
    })
      .populate('vehicle', ['manufacturer', 'model'])
      .populate('owner', ['name']);
    res.json(bookings);
    console.log('route chala');
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
