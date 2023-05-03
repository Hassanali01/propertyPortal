const express = require("express");
const { Pfeatures } = require('../../Models/features')
const router = express.Router();



router.post('/addproperty/feature', async (req, res, next) => {
    try {
        console.log("called")
        const addfeature = new Pfeatures({
            featurename: req.body.featurename,
            featuretype: req.body.featuretype,
            addedIn: req.body.addedIn,

        })
        const save = await addfeature.save();
        save && res.status(200).json({ messgae: "successfully added", save })
    }
    catch (error) {
        console.log("error",error)
        next(error)
    }

})

router.get('/addproperty/feature/:id', async (req, res, next) => {
    try {
        const get = await Pfeatures.find({ addedIn: req.params.id })
        get && res.status(200).json({ message: "features", get })
    } catch (error) {
        next(error)
    }
})

router.delete('/addproperty/feature/:id', async (req, res, next) => {
    try {
        const get = await Pfeatures.findByIdAndDelete({ _id: req.params.id })
        get && res.status(200).json({ message: "features", get })
    } catch (error) {
        next(error)
    }
})


module.exports = router