const express = require('express');
const cloudinary = require('cloudinary').v2;
//const cloudinaryStorage = require('multer-storage-cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Owner = require('../../../models/owner/Owner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const ReportCustomer = require('../../../models/reports/ReportCustomer');
const Booking = require('../../../models/owner/Booking');

var multer = require('multer');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(file);
//     cb(null, '../../Images/Owner');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.filename);
//   },
// });

cloudinary.config({
  cloud_name: 'sawari',
  api_key: '578152951985421',
  api_secret: 'Ht74AoMOnhz7cEsXSFK6vv_7Nqw',
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  allowedFormats: ['jpg', 'png'],
  destination: function (req, file, cb) {
    cb(null, 'folder');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single('file');
var upload = multer({ storage: storage, limits: { fileSize: 12582912 } });
// @route   GET /api/owner
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => {
  res.send('Owner route');
  console.log(req.body);
});

router.post('/uploadPhoto', (req, res, next) => {
  // console.log(req.file);
  try {
    upload.single('photo')(req, res, (err) => {
      console.log(req.file);
      console.log(req.file.path);
      res.status(200).json({
        read: true,
        url: req.file.path,
      });
    });
  } catch (e) {
    res.status(500).json({
      read: false,
      err: e,
    });
    console.log(e);
  }
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
    const {
      name,
      email,
      password,
      address,
      city,
      cellPhone,
      imageURI,
    } = req.body;
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
        imageURI,
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

// @route   POST /api/customer/booked/:vehicleId
// @desc    change the booking status
// @access  Private
router.post('/booked/:bookingID', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingID);

    booking.bookedForOwner = true;

    await booking.save();
    res.json({ msg: 'Sucessfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route   PUT /api/owner/update/:Id
// @desc    update
// @access  Private
router.put('/update', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let owner = await Owner.findById(req.user.id);

    if (!owner) {
      return res.status(400).json({ msg: 'Group does not exist' });
    }

    const { name, address, cellPhone, city, email } = req.body;

    owner = await Owner.findOneAndUpdate(
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

    res.json(owner);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
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

    const { rankCustomer, feedbackCustomer } = req.body;

    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(400).json({ msg: 'Booking not found' });
    }

    booking.cusomterFeedback.feedback = feedbackCustomer;

    booking.cusomterFeedback.rating = rankCustomer;

    await booking.save();

    res.json(booking);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

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
