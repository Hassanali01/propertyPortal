const Querry = require('../Models/peopleQueries')
const multer = require("multer");
const path = require("path");

// Storing property images

// Set The Storage Engine
const storage = multer.diskStorage({
     destination: "./images",

});

// Init Upload
const upload = multer({
     storage: storage,
     // limits:{fileSize: 1000000},
     fileFilter: function (req, file, cb) {
          checkFileType(file, cb);
     },
}).array("uploadedImages");

// Check File Type
function checkFileType(file, cb) {
     // Allowed ext
     const filetypes = /jpeg|jpg|png|gif/;
     // Check ext
     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
     // Check mime
     const mimetype = filetypes.test(file.mimetype);

     if (mimetype && extname) {
          return cb(null, true);
     } else {
          cb("Error: Images Only!");
     }
}


const postQuerry = async (req, res, next) => {

     upload(req, res, async (err) => {

          console.log("called");
          console.log("req", req.files)
          const imgArray = req.files.map((i) => i.path)
          if (err) {
               res.send({
                    msg: err,
               });
          } else {
               if (req.file == undefined) {
                    try {
                         const post = new Querry({

                              propertyImages: imgArray,

                              ...req.body

                         });
                         console.log(req.body);
                         await post.save();
                    } catch (error) {
                         next(error);
                    }
                    res.send({
                         msg: "Error: No File Selected!",
                         file: `${req.files}`

                    });
               } else {
                    res.send({
                         msg: "File Uploaded!",
                         file: `uploads/${req.file.filename}`,
                    });
               }
          }
     });


};




const getRequests = async(req,res,next) =>{
     try{
         const getQuerries  = await Querry.find().populate('postedBy').exec()
         getQuerries && res.status(200).json({message:"qurries",getQuerries})
     }catch(error){
       next(error)
     }
}









module.exports = { postQuerry, getRequests }

