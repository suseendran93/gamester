const  express=require('express');
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/customers',(req,res)=>{
const response=

    {username: req.body.username,
    password: req.body.password}

    res.send(response);

});

const port=process.env.PORT || 8082;
app.listen(port,()=>console.log(`Listening on port ${port}...`));