const express = require('express');
const connectDB = require('./config/db');
const socket = require('socket.io');
const http = require('http');
const Message = require('./models/Message');
const Chat = require('./models/Chat');
const app = express();

//CONNECT DATABASE
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

app.get('/', function(req, res){
    res.send('API Running..');
});

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/event', require('./routes/api/event'));
app.use('/api/chat', require('./routes/api/chat'));

const PORT = process.env.PORT || 5000;

const serve = http.createServer(app);
const io = socket(serve);

serve.listen(PORT ,()=> {console.log(`Server started on ${PORT}`)});

const connections = [];
io.on('connection', function (socket) {
	console.log("Connected to Socket!!"+ socket.id)	
	connections.push(socket)
	socket.on('disconnect', function(){
		console.log('Disconnected - '+ socket.id);
	});

    socket.on('sendmessage', (data) => {
        io.sockets.emit('change_data')
    });

    socket.on('initial_data', async(data) =>{
        if(data){
            
            let chat = await Chat.findOne({user1:data.to, user2: data.from})
            if(!chat){
                chat = await Chat.findOne({user2:data.to, user1: data.from})
            }
            if(chat){
               
                const msgs = await Message.find({_id: {$in: chat.messages}}).populate('user',['name']);
                
                io.sockets.emit("get_data", msgs);
            }
        }
        else{
            io.sockets.emit("get_data", null);
        }
    })
    
});