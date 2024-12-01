const express = require('express');
const path = require('path');
const userRoutes = require('./routes/LMroutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/Landmarks', userRoutes);
app.listen(port, () => {
    console.log('Server is running on https://localhost:${port}');
});