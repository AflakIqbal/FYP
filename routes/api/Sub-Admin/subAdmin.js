const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const SubAdmin = require('../../../models/Sub-Admin/subAdmin');
const Owner = require('../../../models/owner/Owner');
const Customer = require('../../../models/customer/Customer');
const Vehicle = require('../../../models/owner/Vehicle');
const Booking = require('../../../models/owner/Booking');
const ReportCustomer = require('../../../models/reports/ReportCustomer');
const ReportOwner = require('../../../models/reports/ReportOwner');

// @route   GET /api/owner
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => {
  res.send('SubAdmin route');
  console.log(req.body);
});

// @route   POST /api/subAdmin/register
// @desc    Register subAdmin
// @access  Public
router.post(
  '/register',
  [
    check('name', 'name is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('cellPhone', 'Number is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('officeLocation', 'location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      cellPhone,
      address,
      officeLocation,
    } = req.body;

    try {
      let subAdmin = await SubAdmin.findOne({ email });

      if (subAdmin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'subAdmin alreadt exixt' }] });
      }

      newSubAdmin = new SubAdmin({
        name,
        email,
        password,
        cellPhone,
        address,
        officeLocation,
      });

      const salt = await bcrypt.genSalt(10);
      newSubAdmin.password = await bcrypt.hash(password, salt);
      await newSubAdmin.save();

      const payload = {
        user: {
          id: newSubAdmin.id,
        },
      };

      jwt.sign(
        payload,
        config.get('Secret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   post /api/subAdmin/viewOwner
// @desc    get all Owner
// @access  Public
router.get('/viewOwner', auth, async (req, res) => {
  try {
    const subAdmin = await SubAdmin.findById(req.user.id);

    const owners = await Owner.find({ address: subAdmin.city });
    res.json(owners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewOwnerById
// @desc    get Owner by id
// @access  Public
router.get('/viewOwnerById/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);

    if (!owner) {
      return res.status(400).json({ msg: 'no profile' });
    }
    res.json(owner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewCustomer
// @desc    get all Customers
// @access  Public
router.get('/viewCustomer', auth, async (req, res) => {
  try {
    const subAdmin = await SubAdmin.findById(req.user.id);

    const customers = await Customer.find({ address: subAdmin.city });
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewCustomerById
// @desc    get customer by id
// @access  Public
router.get('/viewCustomerById/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(400).json({ msg: 'no profile' });
    }
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewVehicle
// @desc    get all vehicle
// @access  Public
router.get('/viewVehicle', auth, async (req, res) => {
  try {
    const subAdmin = await SubAdmin.findById(req.user.id);

    const owners = await Owner.find({ address: subAdmin.address });
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewByOwnerId/:id
// @desc    get all vehicle
// @access  Public
router.get('/viewByOwnerId/:_id', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.params._id });

    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewByOwnerBookings/:id
// @desc    get all vehicle
// @access  Public
router.get('/viewVehicleBookings/:_id', async (req, res) => {
  try {
    const booking = await Booking.find({
      vehicle: req.params._id,
    }).populate('customer', ['name', 'address']);

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewVehicleById
// @desc    get vehicle by id
// @access  Public
router.get('/viewVehicleById/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(400).json({ msg: 'no profile' });
    }
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewCustomerReports
// @desc    get all Customer Reports
// @access  Public
router.get('/viewCustomerReports', async (req, res) => {
  try {
    const reports = await ReportOwner.find();
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   post /api/subAdmin/viewOwnerReports
// @desc    get all viewOwnerReports
// @access  Public
router.get('/viewOwnerReports', async (req, res) => {
  try {
    const reports = await ReportCustomer.find()
      .populate('owner', ['name'])
      .populate('customer', ['name']);
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   Delete /api/owner/vehicle/delete
// @desc    get current owner vehicle
// @access  Private

router.delete('/deleteOwner/:id', async (req, res) => {
  try {
    //delete owner
    const owner = await Owner.findByIdAndRemove(req.params.id);

    //delete vehicle

    await Vehicle.deleteMany({ owner: owner._id });

    if (!owner) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, vehicle');
  }
});

// @route   Delete /api/subAdmin/vehicle/delete
// @desc    delete vehicle
// @access  Private

router.delete('/deleteVehicle/:id', async (req, res) => {
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

// delete Customer
router.delete('/deleteCustomer/:id', async (req, res) => {
  try {
    await Customer.findByIdAndRemove(req.params.id);

    // if (!vehicle) {
    //   return res.status(400).json({ msg: 'vehicle not found' });
    // }
    res.json({ msg: 'Customer deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, Customer');
  }
});

module.exports = router;
