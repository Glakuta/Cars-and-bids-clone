import { Client } from "pg";

const client = new Client({
    host: "localhost",
    user: "postgress",
    default: 5432,
    password:"Muflonik34%",
    database:"Cars and Bids database"
})

client.connect()