const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const db = sworm.db(setting.db.sqlConfig);


router.post('/getActivePaths', async (req, res) => {
    try {
        var result = await db.query(queries.JOBCOMPANY.getActivePaths);
        SendResponse(req, res, result, result.length > 0);
    } catch (error) {
        return SendResponse(req, res, `getActivePaths`, false, 500);
    }

})
module.exports = router;