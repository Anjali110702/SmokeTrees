// Import necessary modules
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser'); // Import body-parser

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set up Sequelize for SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // Path where your SQLite database file will be created
});

// Define User and Address models
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Address = sequelize.define('Address', {
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Define relationships
User.hasMany(Address);
Address.belongsTo(User);

// Sync models with database
sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Unable to create database tables:', err));

// Serve the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/form.html'); // Serve the form HTML file
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const { username, address } = req.body;

    try {
        // Create user and address entries
        const user = await User.create({ username });
        await Address.create({ address, UserId: user.id }); // Associate address with the user

        res.send('User and address saved successfully!');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
