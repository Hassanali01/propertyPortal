const express = require("express");
const router = express.Router();
const { verifyAdmin } = require('../../utils/verifytoken')
const Purpose = require("../../Models/purpose")
const { propertytypes } = require("../../Models/propertyType")
const { Psubtype } = require('../../Models/propertysubtype')
const { createError } = require("../../utils/error")



//adding purpose 

router.post('/addproperty/purpose/', async (req, res, next) => {
    try {
        const addpurpose = new Purpose({
            purpose: req.body.purpose
        })

        await addpurpose.save();
        res.status(200).json({ message: "Successfully added" })
    } catch (error) {
        next(error)
    }
})



//getting all purpose

router.get('/addproperty/purpose', async (req, res, next) => {
    try {
        const getpurpose = await Purpose.find();
        console.log("all purpose", getpurpose)
        res.status(200).json({ message: "Succes", getpurpose })
    } catch (error) {
        next(error)
    }
})




//deletting a purpose 


router.delete('/addproperty/purpose/:id', async (req, res, next) => {
    try {
        const findone = await Purpose.findById(req.params.id);
        if (!findone) {
            next(createError(404, "Purpose not found"));
        }
        const deletePurpose = await Purpose.findByIdAndDelete(req.params.id)
        deletePurpose && res.status(200).json({ message: "successfully deleted", deletePurpose })
    } catch (error) {
        next(error)
    }
})

//adding a propertyType

router.post('/addproperty/propertytype', async (req, res, next) => {
    try {
        const addproptype = new propertytypes({
            propertyType: req.body.propertyType
        })
        const save = await addproptype.save();
        save && res.status(200).json({ message: "Saved Successfully ", save })
    } catch (error) {
        next(error)
    }
})
//getting propertytype
router.get('/addproperty/propertytype', async (req, res, next) => {
    try {
        const getType = await propertytypes.find();
        getType && res.status(200).json({ message: "success", getType })
    } catch (error) { }
})
//delete
router.delete('/addproperty/propertytype/:id', async (req, res, next) => {
    try {
        const find = await propertytypes.findOneAndDelete({
            _id: req.params.id
        });
        console.log(" property type found successfully ")
        if (!find) {
            next(createError(404, " property type not found "))
        }
        const dellType = await propertytypes.remove({ _id: req.params.id });
        console.log(dellType)
        dellType && res.status(200).json({ message: "successfully deleted Propertytype", dellType })
    } catch (error) {
        console.log("error called")

        next(error)
    }
})
//adding a subtype a property
router.post('/addproperty/propertysubtype', async (req, res, next) => {
    try {
        const addsubtype = new Psubtype({
            propertysubtype: req.body.propertysubtype,
            addedIn: req.body.addedIn
        })
        const save = await addsubtype.save();
        save && res.status(200).json({ messgae: "Successfully Added", save })
    } catch (error) {
        next(error)
    }
})
//deleting a subtype
router.delete('/addproperty/propertysubtype/:id', async (req, res, next) => {
    try {
        const dell = await Psubtype.findById(req.params.id);
        if (!dell) {
            next(createError(404, "Subtype Not found"))
        }
        const dellsub = await Psubtype.findByIdAndDelete(req.params.id)
        dellsub && res.status(200).json({ message: "successfully deleted", dellsub })
    } catch (error) {
        next(error)
    }
})


//getting categories with subcategories:

router.get('/addproperty/propertysubtype/:id', async (req, res, next) => {

    try {
        const detail = await Psubtype.find({ addedIn: req.params.id }).populate('addedIn').exec();
        detail && res.status(200).json({ message: "success", detail })
    } catch (error) {
        next(error)
    }

})


module.exports = router;