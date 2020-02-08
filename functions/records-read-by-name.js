/* code from functions/todos-create.js */
import faunadb from 'faunadb' /* Import faunaDB sdk */
const getId = require('./getId')

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
    const nickname = "talonF"
    const id = context

    const data = JSON.parse(event.body)
    console.log("Function `records-read-by-name` invoked", data.name)
    // const record = {
    //     data: data
    // }
    /* construct the fauna query */
    return client.query(q.Get((q.Match(q.Ref('indexes/records_by_name'), data.name))))
        .then((response) => {
            console.log("success", response)
            /* Success! return the response with statusCode 200 */
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(response)
            })
        }).catch((error) => {
            if (error.name == 'NotFound') {
                return callback(null, {
                    statusCode: 404, 
                    body: JSON.stringify(error)
                })
            }
            else {
                console.log("클라이언트 에러", error)
                /* Error! return the error with statusCode 400 */
                return callback(null, {
                    statusCode: 400,
                    body: JSON.stringify(error)
                })
            }
        })
}
