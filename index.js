const express = require('express')
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
})

// create a model to save to database
const SensorData = sequelize.define('sensor-data', {
    serial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
})

const app = express();
const PORT = 5000;

app.use(express.json())

// const dataList = []


app.get('/data', async (req, res) => {
    const allData = await SensorData.findAll()
    res.status(200).send(allData)
    return;

})
app.post('/data', async (req, res) => {
    let data = req.body;
    // dataList.push(data)
    const sensorData = await SensorData.create(data)
    res.status(201).send(SensorData)
    return;

})

app.listen(PORT, () => {
    try {
        sequelize.authenticate()
        console.log('Connected to database')
        sequelize.sync({ alter: true })
        console.log('Connected to database')
    } catch (error) {
        console.log('We could not connect to database', error)
    }
    console.log(`server is listening at port ${PORT}.`)
})