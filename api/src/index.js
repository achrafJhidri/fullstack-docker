const express = require("express");
const MongoClient = require("mongodb").MongoClient;
let countDb ;
let client;
const mongoUrl=process.env.NODE_ENV === 'production' ? 
`mongodb://${ process.env.MONGO_USERNAME }:${ process.env.MONGO_PWD }@db`
:
`mongodb://db`

MongoClient.connect(
    mongoUrl
    ,{useUnifiedTopology:true},(err,client) =>{
    if (err)
        console.log(err);
    else{
        countDb = client
        count = client.db("test").collection("count");
        
    }
})

const app = express();

app.get("/api/count",(req,res) => {
    count.findOneAndUpdate({},{$inc :  {count : 1 }},{returnNewDocument:true})
    .then((doc) =>{
        const cnt = doc.value.count;
        res.status(200).json(cnt);
    })

})
app.all("*",(req,res)=>{
    res.status(404).end();
})

const server = app.listen(80);

process.addListener('SIGINT',()=>{
    server.close(err => {

        console.log("stopped !")
        if(err){
            process.exit(err)
        }else{
            if(clientDb)
                countDb.close(err => {
                    process.exit(err?1:0)
                })
            else    
                process.exit(0);
        }
    })
})