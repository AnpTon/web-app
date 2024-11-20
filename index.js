const express = require('express');
const app = express();

app.get('/', (req, res_) => {
    res_.send('Hello World!');
});

app.listen(4000, () => {
    console.log('Server is running on https://localhost:4000');
});