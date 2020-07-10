const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Owner = require('../../../models/owner/Owner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const ReportCustomer = require('../../../models/reports/ReportCustomer');
const Booking = require('../../../models/owner/Booking');

// @route   GET /api/owner
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => {
  res.send('Owner route');
  console.log(req.body);
});

// @route   POST /api/owner/register
// @desc    Register owner
// @access  Public
router.post(
  '/register',
  [
    check('name', 'name is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('city', 'city is required').not().isEmpty(),
    check('cellPhone', 'Number is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('city', 'city is required').not().isEmpty(),
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
    const { name, email, password, address, city, cellPhone } = req.body;
    console.log(req.body);

    try {
      let owner = await Owner.findOne({ email });

      if (owner) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'owner alreadt exixt' }] });
      }

      owner = new Owner({
        name,
        email,
        password,
        cellPhone,
        address,
        city,
      });

      const salt = await bcrypt.genSalt(10);
      owner.password = await bcrypt.hash(password, salt);
      await owner.save();

      const payload = {
        user: {
          id: owner.id,
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

// @route   post /api/owner/viewVehicle
// @desc    get all vehicle
// @access  Public
router.get('/viewVehicle', auth, async (req, res) => {
  try {
    const owners = await Owner.find();
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   POST /api/customer/rank/:bookingId
// @desc    rank & feedback
// @access  Private
router.post(
  '/rank/:bookingId',
  [auth, check('rank', 'Rank is required and should be integer').isInt()],
  async (req, res) => {
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
        booking.cusomterFeedback.feedback = feedback;
      }
      booking.cusomterFeedback.rating = rank;

      await booking.save();

      res.json(booking);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   POST /api/reportCustomer/:customerId
// @desc    Report Customer
// @access  private
router.post(
  '/reportCustomer/:customerId',
  [auth, check('report', 'Report is required').not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { report } = req.body;

      const newReport = new ReportCustomer({
        owner: req.user.id,
        customer: req.params.customerId,
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

module.exports = router;
