// Pengaturan aplikasi menggunakan express
const express = require('express')
// Express membaca atau menginisiasi variabel app menjadi
// handler atau pengendali function yang dapat disuply 
// ke server HTTP pada variabel server
const app = express()
const http = require('http');
const server = http.createServer(app);
const port = 3001
const morgan = require('morgan')
const socket = require('socket.io')

app.use(morgan('dev'))

const io = socket(server);

// inisiasi route / 
app.get('/', (req, res) => {
    // mengirim direktori dan file index.html untuk dijalankan di router / atau slash
    res.sendFile(__dirname + '/index.html');
})

// init connection
io.on('connection', (socket) => {

    // socket.on buat nangkep/listen pesan dengan nama event "chat message" dari emitter/pengirim pesan
    socket.on('chat message', (msg) => {
        // socket.broadcast.emit buat memancarkan broadcast dengan nama event "broadcast" yg nantinya diterima penerima
        socket.broadcast.emit('broadcast', msg)

        
        // io.emit('chat message', msg)

        console.log(`Message : ${msg} `);
    })

    // event "disconnect" bakal ke trigger ketika browser di-refres"
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// server disini terintegrasi dengan http server nya socket.io dan 
// log activity akan terlihat di CLI
// client yang dimuat disisi browser