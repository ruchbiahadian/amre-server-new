import mysql from "mysql2"

// export const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "amre"
// })

export const db = mysql.createConnection({
    host:"containers-us-west-86.railway.app",
    user: "root",
    password: "RXwYXgN74jXNIfZuyyiS",
    database: "railway",
    port: 5942
})