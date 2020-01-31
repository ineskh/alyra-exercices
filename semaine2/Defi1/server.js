let express = require('express')
let fs = require('fs');
let path = require('path');

let app = express()


app.set('view engine', 'ejs')

app.use('/assests', express.static('public'))
app.use(express.static(path.join('/home/bobby/InesWork/Defi1', 'public')));


app.get('/', (request, response) => {

    response.render('pages/converter', {test:'salut'})

})

app.listen(8080)