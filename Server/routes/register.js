const { SendResponse } = require('../util/utility');
const setting = require("../app-setting");
const sworm = require("sworm");
const db = sworm.db(setting.db.sqlConfig);
const queries = require("../util/T-SQL/queries");
require('dotenv').config();
const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mrezakhansari',
        pass: 'mohammad'
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log('verify error', error);
    }
    else {
        console.log("Server is ready to take our message");
    }
});

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
            let data = result[0]['JobApplicantCompanyId'] !== 0 && result[0]['ApplicantId'] !== 0 ? {
                message: "The operation has been done successfully",
            } : "Operation failed";

            console.log(result);
            if (result[0]['JobApplicantCompanyId'] !== 0 && result[0]['ApplicantId'] !== 0) {
                //-----------------------------------------------------
                // accessing the file
                const myFile = req.files.attachment;
                // console.log('fileeee',req.files)
                //  mv() method places the file inside public directory
                myFile.mv(`${__dirname}/public/${userData.email}.pdf`, function (err) {
                    if (err) {
                        console.log('shsh', err)
                        return SendResponse(req, res, "Error occured", false, 500);
                    }
                    // returing the response with file path and name
                    console.log('ggg', { name: myFile.name, path: `/${myFile.name}` });
                    let body ={
                        from: 'mrezakhansari@gmail.com',
                        to: 'mrezakhansari@gmail.com',
                        subject: 'اطلاعات کاربری شما در اکتاپی',
                        html: `<h2>Welcome to octapi</h2><br><p>Your Credentials:</p><br><h3>Username:${userData.email}<br>Password:${result[0]['Password']}</h3>`,
                    }
                    
                    transporter.sendMail(body, (err, result) => {
                        console.log(result);
                        if (err) {
                            console.log('send error', err);
                            return SendResponse(req, res, err, false, 500);
                        }

                        else {
                            console.log("email sent");
                            return SendResponse(req, res, { ...data, name: myFile.name, path: `/${myFile.name}` }, true)
                        }
                    })

                    //return res.send();
                });
            }
            else {
                return SendResponse(req, res, { ...data }, false, 401)
            }
        } catch (error) {
            return SendResponse(req, res, `/api/register`, false, 500);
        }

    })

}; 
