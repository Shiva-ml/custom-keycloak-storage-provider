const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 8081;

app.use(bodyParser.urlencoded({ extended: true }));



// Mock user data
const users = [
    { userName: 'john', firstname: 'John', lastname: 'Doe', email: 'john', userId: '1', roles: '', gender: 'Male', phoneNumber: '+1234567890' },
    { userName: 'jane', firstname: 'Jane', lastname: 'Doe', email: 'jane', userId: '2', roles: '', gender: 'Female', phoneNumber: '+1987654321' }
];

// Mock password store
const passwords = {
    john: '1234',
    jane: '5678'
};

// Endpoint to get user by username
app.get('/users/:userName', (req, res) => {
    const user = users.find(u => u.userName === req.params.userName);
    if (user) {
        res.json(user);
        console.log('User present');
    } else {
        res.status(404).send('User not found');
        console.log('User not found');
    }
});

// Endpoint to verify user password
app.post('/users/:userName/verify-password', (req, res) => {
    console.log(`Finding user to verify the password: ${req.params.userName}`);

    const userName = req.params.userName;
    const password = req.body.password;

    console.log(`Verifying password for user: ${userName}`);

    // Find the user by username and verify password
    if (passwords[userName] && passwords[userName] === password) {
        res.sendStatus(200); // Password correct
        console.log('Password verified successfully');
    } else {
        res.sendStatus(401); // Unauthorized if password incorrect
        console.log('Password verification failed');
    }
});

// Endpoint to search users
app.get('/users/search', (req, res) => {
    const query = req.query.query || '';
    const firstResult = parseInt(req.query.firstResult) || 0;
    const maxResults = parseInt(req.query.maxResults) || users.length;

    const result = users.filter(u => 
        u.userName.includes(query) || 
        u.firstname.includes(query) ||
        u.lastname.includes(query) ||
        u.email.includes(query)
    ).slice(firstResult, firstResult + maxResults);

    res.json(result);
});

app.listen(port, () => {
    console.log(`User service mock server listening at http://localhost:${port}`);
});