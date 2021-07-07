const express = require('express')
const app = express()
 
app.get('/hello', function (req, res) {
  res.send('Hello World')
})
/* lista de end-point CRUD
Create -->
*/
 
app.listen(3000)
