const express = require('express');
const app = express();
const path = require('path');
const port = 3001;


app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));



app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.listen(port, "127.0.0.1");
console.log(`Listening on port ${port}...`);
