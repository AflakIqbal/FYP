const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Owner = require('../../../models/owner/Owner');
// @route   get api/auth
// @desc    test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const owner = await Owner.findById(req.user.id).select('-password');
    res.json(owner);
    console.log(owner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   POST /api/owner/login
// @desc    owner login
// @access  Public
router.post(
  '/login',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;

    try {
      let owner = await Owner.findOne({ email });

      if (!owner) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credential, no owner' }] });
      }

      const isMatch = await bcrypt.compare(password, owner.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credential, wrong password' }] });
      }

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

module.exports = router;
