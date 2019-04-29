const express = require('express');
const os = require('os');
const path = require('path');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ userDetails: JSON.stringify(os.userInfo()) }));

app.get('*', (request, response) => response.sendFile(path.resolve(__dirname, '../../dist', 'index.html')));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
