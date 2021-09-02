const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Description } = require('../models/Description')

//=================================
//             Descriptions
//=================================

router.post('/submit', (req, res) => {
    //console.log('description ON')
    const description = new Description(req.body);

    description.save((err, doc) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

module.exports = router;
