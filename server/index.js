const express = require('express'),
      app = express();
      
app.get('/', (req, res) => {
    res.send({hi: 'There'}); 
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is listening..');  
})