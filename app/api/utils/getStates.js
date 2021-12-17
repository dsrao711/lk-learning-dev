var mysqlConnection = require('../../config/connection')

getStates = () => {
    sql_statement = `SELECT * from state`
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql_statement, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        })
    })
}

module.exports = getStates;

