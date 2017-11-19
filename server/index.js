const express = require('express'),
      app = express();
      
const PORT = process.env.PORT || 5000;
      
app.get('/', (req, res) => {
    res.send({hi: 'There'}); 
});



app.listen(PORT, process.env.IP, () => {
    console.log('Server is listening..');  
});