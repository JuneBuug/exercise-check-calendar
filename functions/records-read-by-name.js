/* code from functions/todos-create.js */
import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body)
    console.log("Function `records-read-by-name` invoked", data.name)


    return client.query(q.Paginate((q.Match(q.Index('records_by_name'), data.name))))
        .then((response) => {
            const recordRefs = response.data
            console.log("Record refs", recordRefs)
            console.log(`${recordRefs.length} records found`)
            // create new query out of todo refs. http://bit.ly/2LG3MLg
            const getAllRecordDataQuery = recordRefs.map((ref) => {
                return q.Get(ref)
            })
            // then query the refs
            return client.query(getAllRecordDataQuery).then((ret) => {
                console.log("final results: ", ret)
                return callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(ret)
                })
            })
        }).catch((error) => {
            console.log("error", error)
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify(error)
            })
        })
}
