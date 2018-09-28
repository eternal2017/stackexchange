const express = require('express');
const app = express();
const port = 3000;
const ACCESS_TOCKEN = 'lmDeUyPFi1oifsGHEE8wjw))';

const users = new Map();
users.set('test1', 'password1');
users.set('test2', 'password2');
users.set('test3', 'password3');
const checkData = (body) => {

    if (body.login && body.password) {
        return users.get(body.login) === body.password;
    }
    return false;
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.listen(port, err => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
app.get('/', (request, response) => {
    response.send('Hello from Express!');
});
app.post('/authentication', (request, response) => {

    if (checkData(request.body)) {
        const responseJson = {
            accessTocken: ACCESS_TOCKEN,
        };
        response.send(JSON.stringify(responseJson));
    }
    const responseJson = {
        message: 'incorrect data',
    };
    response.status(401).end(JSON.stringify(responseJson));
});