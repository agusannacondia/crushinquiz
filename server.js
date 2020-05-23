const express = require('express');

const app = express();

app.use(express.static('./dist/crushin-quiz'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/crushin-quiz/'}),
);

app.listen(process.env.PORT || 8080);