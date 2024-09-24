const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.uri).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


const app = express();
app.use(express.json());
app.use('/', require('./routes/routes'));
const router = express.Router();
const cors = require('cors');
const {addPatients,getLatestPatients,latestPatentData} = require('../controllers/controllers');

router.use(cors(
    {
        origin: '*',
        credentials: true
    }
));


router.post('/addpatient',addPatients);
router.get('/getlatest',getLatestPatients);
router.get('/getnew',latestPatentData);


module.exports = router;
const port = 8888;

app.get('/', (req, res) => {
    res.send('Backend is running');
})

try {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}
catch(err) {
    console.error('Error startisng server:', err);
}
