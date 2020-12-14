
const { SendResponse } = require('../../util/utility')
var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })
//var upload = multer({ storage: storage }).single('file')


module.exports = app => {
    app.post('/register', function (req, res) {
        console('dooooooool')
        try {
            // res.socket.emit(Events.LAST_VOYAGES_LOADED, result);
            //SendResponse(req, res, result, (result && result.length > 0))
            console.log(req.body);
            // upload(req, res, function (err) {
            //     if (err instanceof multer.MulterError) {
            //         console.log(err.message)
            //         return res.status(500).json(err)
            //     } else if (err) {
            //         console.log(err)
                  return res.status(200).json('doool')
            //     }
            //     return res.status(200).send(req.file)
    
            //})
        } catch (error) {
            return SendResponse(req, res, 'getEquipmentsForLoadUnload', false, 500);
        }
    
    })
}; 