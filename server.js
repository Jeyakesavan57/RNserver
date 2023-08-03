
const express= require("express");
const mongoose =require("mongoose");
const app=express();
const uri="mongodb+srv://jeyakesavanzuppa:jeyakesavanzuppa@cluster0.3lsv3ti.mongodb.net/?retryWrites=true&w=majority"
const port1 =3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


// MongoDb Connection .....

async function connect()
{
   try{
   await mongoose.connect(uri);
  console.log("connected to mongo db")

   }
   catch(error)
   {
    console.error(error)
 
  }
}

connect();


const Dbschema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    }
}
)



const collection= new mongoose.model('dbschema',Dbschema);


//Serialport .....

app.listen(8000,()=>
    {console.log("server started");
});

const { SerialPort } = require('serialport');
const { ByteLengthParser } = require('@serialport/parser-byte-length');
const parser = new ByteLengthParser({ length:12 });
const config = {
  path: 'COM24',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  autoOpen: false,
};
const port = new SerialPort(config);
port.open((err) => {
  if (err) {
    console.log('error opening the port' + err.messages);
  }
});
port.write('Hi From Node js', (err) => {
  if (err) {
    console.log('Error writing ' + err.message);
  }
});

let val="";
port.pipe(parser);

// parser.on('data', (data) => {
//   console.log(data.toString());

//   val=data.toString();
//   io.emit("chat message" ,val);
//   collection.insertMany({name:val})
// });




//Socket Connection.. 


io.on('connection', (socket) => {
  console.log("a user connected");
 socket.on("chat message",msg=>
 {
      console.log(msg); 
     
      io.emit("chat message" ,msg);
      
   });

   parser.on('data', (data) => {
    console.log(data.toString());
  
    val=data.toString();
    
app.get('/api/data', (req, res) => {
  res.json(val);
});
    io.emit("chat message" ,val);
    collection.insertMany({name:val})




  });
  


  });



  

  server.listen(port1, () => {console.log("server running on port:"+port1)});



// Sample data with Api call
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// app.get('/api/data', (req, res) => {
//   res.json(data);
// });

const port3 = 5000;
app.listen(port3, () => {
  console.log(`Server running on http://localhost:${port3}`);
});
