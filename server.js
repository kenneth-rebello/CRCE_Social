const express = require('express');
const socket = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const Grid = require('gridfs-stream');

const Message = require('./models/Message');
const Chat = require('./models/Chat');
const app = express();

//CONNECT DATABASE
let gfs;
try{
    mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    });

    const conn = mongoose.connection;
    conn.on('open',() => {
        console.log('MongoDB Connected');
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    });

}catch(err){
    console.error(err.message);
    //EXIT PROCESS WITH FAILURE
    process.exit(1);
}

//Init Middleware
app.use(bodyParser.json());
app.use(express.json({extended: false}));
app.use(methodOverride('_method'));

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
app.use('/api/notif', require('./routes/api/notif'));

app.get('/image/:filename', (req, res)=>{
    
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file){
            return res.status(404).json({err: 'No files exist'})
        }

        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }else{
            res.status(404).json({
                err: "Not an image"
            })
        }
    });
});

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