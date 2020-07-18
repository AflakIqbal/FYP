const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Customer = require('../../../models/customer/Customer');
const Booking = require('../../../models/owner/Booking');
const Vehicle = require('../../../models/owner/Vehicle');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const ReportOwner = require('../../../models/reports/ReportOwner');

// @route   POST /api/owner/register
// @desc    Register owner
// @access  Public
router.post(
  '/register',
  [
    check('name', 'name is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('cellPhone', 'Number is required').not().isEmpty(),
    check('city', 'city is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
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
      address,
      cellPhone,
      city,
      imageURI,
    } = req.body;

    try {
      let customer = await Customer.findOne({ email });

      if (customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Customer alreadt exixt' }] });
      }

      customer = new Customer({
        name,
        email,
        password,
        cellPhone,
        address,
        city,
        imageURI,
      });

      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(password, salt);
      await customer.save();

      const payload = {
        user: {
          id: customer.id,
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

// @route   POST /api/customer/book/:vehicleId
// @desc    Book a vehicle
// @access  Private
router.post(
  '/book/:vehicleId',
  [auth, check('days', 'Days are required and should be integer').isInt()],
  async (req, res) => {
    try {
      console.log('chal raha hai');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { days, comments } = req.body;

      const vehicle = await Vehicle.findById(req.params.vehicleId);

      if (!vehicle) {
        return res.status(400).json({ msg: 'Vehicle not found' });
      }

      if (!vehicle.available) {
        return res.status(400).json({ msg: 'Vehicle not available' });
      }

      const newBooking = new Booking({
        customer: req.user.id,
        owner: vehicle.owner,
        vehicle: vehicle.id,
        days,
        comments,
      });

      await newBooking.save();

      vehicle.available = false;

      await vehicle.save();
      res.json(newBooking);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   POST /api/customer/end/:vehicleId
// @desc    End the Booking
// @access  Private
router.post('/end/:vehicleId', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);

    vehicle.available = true;

    await vehicle.save();
    res.json({ msg: 'Booking End Sucessfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route   POST /api/customer/booked/:vehicleId
// @desc    change the booking status
// @access  Private
router.post('/booked/:bookingID', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingID);

    booking.booked = true;

    await booking.save();
    res.json({ msg: 'Sucessfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route   POST /api/customer/rank/:bookingId
// @desc    rank & feedback
// @access  Private
router.post('/rank/:bookingId', auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { feedbackOwner, feedbackVehicle, rankOwner, rankVehicle } = req.body;

    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(400).json({ msg: 'Booking not found' });
    }

    booking.ownerFeedback.feedback = feedbackOwner;
    booking.ownerFeedback.rating = rankOwner;
    booking.vehicleFeedback.feedback = feedbackVehicle;
    booking.vehicleFeedback.rating = rankVehicle;

    await booking.save();

    res.json(booking);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route   POST /api/customer/rank/:bookingId
// @desc    rank & feedback to vehicle
// @access  Private
router.post('/rankVehicle/:bookingId', auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rank, feedback } = req.body;

    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(400).json({ msg: 'Booking not found' });
    }

    if (feedback) {
      booking.vehicleFeedback.feedback = feedback;
    }
    booking.vehicleFeedback.rating = rank;

    await booking.save();

    res.json(booking);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route   POST /api/reportOwner/:customerId
// @desc    Report Customer
// @access  private
router.post(
  '/reportOwner/:ownerId',
  [auth, check('report', 'Report is required').not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { report } = req.body;

      const newReport = new ReportOwner({
        owner: req.user.id,
        customer: req.params.ownerId,
        report,
      });

      await newReport.save();
      res.json(newReport);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   PUT /api/owner/update/:Id
// @desc    update
// @access  Private
router.put('/update', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let customer = await Customer.findById(req.user.id);

    if (!customer) {
      return res.status(400).json({ msg: 'Group does not exist' });
    }

    const { name, address, cellPhone, city, email } = req.body;

    customer = await Customer.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          name,
          address,
          cellPhone,
          city,
          email,
        },
      },
      { new: true }
    );

    res.json(customer);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
