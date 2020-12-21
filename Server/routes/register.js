const { SendResponse } = require('../util/utility');
const setting = require("../app-setting");
const sworm = require("sworm");
const db = sworm.db(setting.db.sqlConfig);
const queries = require("../util/T-SQL/queries");

module.exports = app => {
    //app.use('/api/vessel/berth', require('./berth'));
    // file upload api
    app.post('/api/register', async (req, res) => {

        console.log('req.body', req.body);
        //return res.status(500).send({ msg: "file is not found" })
        if (!req.files) {
            return SendResponse(req, res, "file is not found", false, 401);
        }
        if (!req.body.jsondataRequest) {
            return SendResponse(req, res, "user info isn't enough", false, 401);
        }
        //-------- Insert User Data to database -----------------
        const userData = JSON.parse(req.body.jsondataRequest);
        try {
            var result = await db.query(queries.REGISTERUSER.saveUserInfo, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                mobileNo: userData.mobileNo,
                sex: userData.sex,
                pathId: userData.pathId
            });
            let data = result[0][""][0] !== '0' && result[0][""][1] !== '0' ? {
                message: "The operation has been done successfully",
            } : "Operation failed";

            console.log(result);
            if (result[0][""][0] !== 0 && result[0][""][1] !== 0) {
                //-----------------------------------------------------
                // accessing the file
                const myFile = req.files.attachment;
                // console.log('fileeee',req.files)
                //  mv() method places the file inside public directory
                myFile.mv(`${__dirname}/public/${userData.email}.pdf`, function (err) {
                    if (err) {
                        console.log('shash', err)
                        return SendResponse(req, res, "Error occured", false, 500);
                    }
                    // returing the response with file path and name
                    console.log('gooz', { name: myFile.name, path: `/${myFile.name}` });
                    return SendResponse(req, res, { ...data, name: myFile.name, path: `/${myFile.name}` }, true)
                    //return res.send();
                });
            }
        } catch (error) {
            return SendResponse(req, res, `/api/register`, false, 500);
        }

    })

}; 
