import http from 'http';

export const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Worl')
}).listen(3000, () => {
    console.log('Server running on port 3000');
})