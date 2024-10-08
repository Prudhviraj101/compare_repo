const express= require('express');
const app=express();
const server=require('http').createServer(app);
const mysql=require('mysql');
const PORT=8000; 
const bodyparser= require('body-parser');
const path=require('path');
const cors=require('cors');
app.use(bodyparser.json());
const multer=require("multer");
app.use(express.static('upload'));

const updimg=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+file.originalname+path.extname(file.originalname));
    }
})

const updimgdata=multer({
    storage:updimg
})

const connection =mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'compare'
    }
)

connection.connect((err)=>{
    if(!err){ 
        console.log("Database Connected Successfully")
    }
    else{
        console.log("Database not connected")
    }
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.post('/signup',(req,res)=>{
    connection.query('SELECT * FROM `signupdetails` WHERE username="'+req.body.Username+'" and email="'+req.body.Email+'"',(err,row)=>{
        if(!err && row.length>0){
            res.send("user already exist");
        }
        else{
            connection.query('INSERT INTO `signupdetails`(`username`, `email`, `password`) VALUES ("'+req.body.Username+'","'+req.body.Email+'","'+req.body.Password+'")',(err,row)=>{
                if(!err){
                    res.send("no err");
                }
                else{
                    console.log(err);
                }
            })
        }
    })
})


app.post('/weblogin',(req,res)=>{
    connection.query('SELECT * FROM `signupdetails` WHERE username="'+req.body.username+'" or email="'+req.body.email+'" and password="'+req.body.password+'"',(err,rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})



app.post('/textdata',(req,res)=>{
    connection.query('INSERT INTO `mobile`(`Model`, `Display`, `Processor`, `Storage`, `Camera`, `Battery`,`type`) VALUES ("'+req.body.Model+'","'+req.body.Display+'","'+req.body.Processor+'","'+req.body.Storage+'","'+req.body.Camera+'","'+req.body.Battery+'","'+req.body.type+'")',(err,row)=>{
        if(!err){
            res.send("ok");
        }else{
            console.log(err);
        }
    })
})



app.post('/imgdata',updimgdata.single('mobileimage'),(req,res)=>{
    connection.query('SELECT `id` FROM `mobile` WHERE `mobile_images`=""',(err,row)=>{
        if(!err){
            connection.query('UPDATE mobile SET mobile_images=? WHERE id="'+row[0].id+'"',[req.file.filename],(err,result)=>{
                if(!err){
                    res.send("saved..");
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })
})


app.get('/productdata/:id',(req,res)=>{
    connection.query('SELECT * FROM `'+req.params.id+'`',(err,row)=>{
        if(!err){
            res.send(row);
        }else{
            console.log(err);
        }
    })
    
})


app.get('/pdt/:id',(req,res)=>{

    const obj={one:"",two:""};

    connection.query('SELECT * FROM `mobile` WHERE `id`="'+req.params.id[0]+'"',(err,row)=>{
        if(!err){
            obj.one=row;
            connection.query('SELECT * FROM `mobile` WHERE `id`="'+req.params.id[2]+'"',(err,row)=>{
                if(!err){
                    obj.two=row;
                    res.send(obj);
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })
})


  server.listen(PORT,()=>{
    console.log('server running in '+PORT);
})