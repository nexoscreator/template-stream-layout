import express from 'express';
// import fetch from 'node-fetch';
const dotenv = require('dotenv');  //initializes dotenv
dotenv.config();
import axios from 'axios';
const app = express();
const port = 3001;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const SERVER_ID = process.env.SERVER_ID;
const API_KEY = process.env.API_KEY;
const YTCHANNEL_ID = process.env.YTCHANNEL_ID;

app.get('/discord-chat', async (req, res) => {
    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
});

app.get('/discord-info', async (req, res) => {
    try {
        const response = await axios.get(`https://discord.com/api/v9/guilds/${SERVER_ID}/widget.json`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
});

app.get('/youtube-info', async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${YTCHANNEL_ID}&key=${API_KEY}`);
        const channel = response.data.items[0];
        res.json(channel);
    } catch (error) {
        console.error('Error fetching channel details:', error);
        res.status(500).send('Error fetching channel details');
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
