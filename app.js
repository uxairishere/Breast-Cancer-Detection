const express = require('express')
const { spawn } = require('child_process')
const app = express();


app.set('view engine', 'ejs');

app.get('/python-test', (req, res) => {
    var dataTosend;
    var data1 = 22;
    var data2 = 33
    const python = spawn('python', ['script1.py', data1, data2]);

    python.stdout.on('data', function (data) {
        console.log('PIPE DATA FROM PYTHON SCRIPT ...');
        dataTosend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`CHILD PROCESS CLOSE ALL STDIO WITH CODE ${code}`);
        res.send(`<h1>PRINTING RESULTS FROM PYHTON: ${dataTosend}</h1>` );
    });

})

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/breastcancer', (req,res) => {
    var dataTosend;
    var largeData = [];
    const python = spawn('python', ['script.py']);

    python.stdout.on('data', function (data) {
        console.log('PIPE DATA FROM PYTHON SCRIPT ...');
        dataTosend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`CHILD PROCESS CLOSE ALL STDIO WITH CODE ${code}`);
        res.render('breastresult', { dataTosend });
    });
})


// PYTHON ROUTE 
app.get('/runphp/:firstname/:lastname', callPhpData);

function callPhpData(req, res) {
    var dataTosend;
    const php = spawn('php', ['script2.php',req.params.firstname, req.params.firstname]);

    php.stdout.on('data', function (data) {
        console.log('DATA RECIEVED FROM PHP' + data.toString());
        dataTosend = data.toString();
    });

    php.on('close', (code) => {
        console.log(`CHILD PROCESS CLOSE FROM ALL STDIO WITH CODE ${code}`);
        res.send(dataTosend);
    })
}

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})