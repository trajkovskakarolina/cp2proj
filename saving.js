const express = require('express');
const app = express();
const database = new Datastore('database.db');
database.loadDatabase();

app.listen(8080, () => console.log('listening at 8080'));
app.use(express.static('play.html'));
app.use(express.json({limit: '1mb'}));
app.post('/api', (request, response) => {
	console.log(request.body);
	const data = request.body;
	database.insert(data);
	response.end();
});