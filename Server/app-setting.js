module.exports = {
    portNo: 4001,
    db: {
        mongo: {
            main: {
                name:'OCTAPI' ,
                address: 'localhost:27017'
            },
            log: {
                name:'OCTAPI-LOG' ,
                address: 'localhost:27017'
            }
        },
        sqlConfig: {
            driver: 'mssql',
            config: {
                user: 'sa',
                password:'8700823' ,
                server: 'localhost',
                database: 'OctapiDB',
                pool: {
                    max: 10,
                    min: 0,
                    idleTimeoutMillis: 60000
                }
            }
        }
    },
    jwtExpireTime: 200,
    tokenHashKey: '8c10%$#f9be0b053082',
    requiresAuth: true,
    jwtSecret: "9057c4f0-b57e-4320-9a7e-c028bc3e54cb"
}
