require('babel-polyfill')
const express = require('express');
const app = express();
const fs = require('fs');
const request = require('request-promise')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const getUserData = (req,res) => {
    request('https://randomuser.me/api/?results=30')
    .then((json) => res.json(json))
    .catch((err) => console.log("SERVER ERROR:", err));
}

const getUserDataModern = async (req,res) => {
    try {
        const json = await request('https://randomuser.me/api/?results=30')
        res.json(json)
    } catch (error) {
        console.log("SERVER ERROR:", error)
    }
}

app.get('/names', (req, res) => {
    getUserDataModern(req,res)
})

app.listen(3000, () => { console.log('SERVER RUNNING') })