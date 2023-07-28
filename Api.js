const express= require("express")
const app=express()
const bodyp=require("body-parser")
const compiler=require("compilex")
const options={stats:true}
compiler.init(options)
app.use(bodyp.json())
app.use("/codemirror-5.65.14",express.static("A:/myskills/webdevelopment/codeeditor/compiler/codemirror-5.65.14"))
app.get("/",function(req,res){
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("A:/myskills/webdevelopment/codeeditor/compiler/skel.html")
})
app.post("/compile",function(req,res){
    var code=req.body.code
    var input=req.body.input
    var lang=req.body.lang
    try{
        if(lang=="CPP")
        {
            if(!input)
            {
                 //if windows  
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
                var envData = { OS : "linux" , cmd : "gcc" ,options:{timeout:10000}};
                compiler.compileCPP(envData , code , function (data) {
                if(data.output) {res.send(data);}
                else res.send({output:"Error"});
                });
                //res is the response object
            }
            else
            {
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
                var envData = { OS : "linux" , cmd : "gcc" ,options:{timeout:10000}};
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                if(data.output) {res.send(data);}
                else res.send({output:"Error"});
                });                     }
        }
        else if(lang=="Java")
        {
            if(!input)
            {
                 //if windows  
                var envData = { OS : "windows" ,options:{timeout:10000}}; 
                var envData = { OS : "linux" ,options:{timeout:10000} };
                compiler.compileJava(envData , code , function (data) {
                if(data.output) {res.send(data);}
                else res.send({output:"Error"});
                });
                //res is the response object
            }
            else
            {
                var envData = { OS : "windows",options:{timeout:10000}}; 
                var envData = { OS : "linux" ,options:{timeout:10000} };
                compiler.compileJavaWithInput(envData , code , input , function (data) {
                if(data.output) {res.send(data);}
                else res.send({output:"Error"});
                });                     
            }
        }
        else if(lang=="Python")
        {
            if(!input)
            {
                 //if windows  
                var envData = { OS : "windows",options:{timeout:10000}}; 
                var envData = { OS : "linux"  ,options:{timeout:10000}};
                compiler.compilePython(envData , code , function (data) {
                if(data.output) {res.send(data);}
                else res.send({output:"Error"});
                });
                //res is the response object
            }
            else
            {
                var envData = { OS : "windows",options:{timeout:10000}}; 
                var envData = { OS : "linux" ,options:{timeout:10000} };
                compiler.compilePythonWithInput(envData , code , input , function (data) {
                if(data.output) {res.send(data);}
                else res.send({output:"Error"});
                });                     
            }
        }

    }
    catch(e)
    {
        console.log("Error")
    }
})
app.listen(8000)