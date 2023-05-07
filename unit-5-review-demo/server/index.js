const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const {PORT} = process.env
const {
    seed,
    createFighter,
    createWeapon,
    getFightersList,
    getFightersWeapons,
    deleteWeapon,
    deleteFighter
} = require('./controller.js')

//app.post('/seed', seed)
app.post('/fighter', createFighter)
app.post('/weapon', createWeapon)
app.get('/fighters-list', getFightersList)
app.get('/fighters-and-weapons', getFightersWeapons)
app.delete('/weapon/:id', deleteWeapon)

app.listen(PORT, () => console.log(`up on ${PORT}`))