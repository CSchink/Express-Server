const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello John!!');
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Example app is now listening on port 3000')
})

