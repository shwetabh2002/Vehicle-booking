const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//put connection string for database connection
mongoose.connect('CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// MongoDB schema is below
const vehicleSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  wheels: Number,
  vehicleType: String,
  startDate: Date,
  endDate: Date,
});
const Vehicle = mongoose.model('Vehicle', vehicleSchema);


//moethods I used like get and post for name
app.get('/', (req, res) => {
    res.render('name', { nextUrl: '/wheels' });
  });
  
app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    res.render('no-ofwheels', { prevUrl: '/', nextUrl: '/vehicle-type', firstName, lastName });
  });


//for no. of wheels
app.get('/wheels', (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    res.render('no-ofwheels', { prevUrl: '/', nextUrl: '/vehicle-type', firstName, lastName });
  });
  
  //for rendering page according to wheels selection and also carry forward the data
app.post('/wheels', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const wheels = parseInt(req.body.wheels);
  
    if (wheels === 2) {
      res.render('type2', { prevUrl: '/wheels', nextUrl: '/vehicle-type', firstName, lastName, wheels });
    } else if (wheels === 4) {
      res.render('type4', { prevUrl: '/wheels', nextUrl: '/vehicle-type', firstName, lastName, wheels });
    }
  });
  
//for coming back to previous page after going forward if selected 2 wheels
  app.get('/type2', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName; 
    const wheels = parseInt(req.body.wheels);
    const vehicleType = req.body.vehicleType;
  
    res.render('type2', { prevUrl: '/vehicle-type', nextUrl: '/select-date', firstName, lastName, wheels, vehicleType });
  });
  
  //for coming back to previous page after going forward if selected 4 wheels
  app.get('/type4', (req, res) => {
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName; 
    const wheels = parseInt(req.body.wheels);
    const vehicleType = req.body.vehicleType;
  
    res.render('type4', { prevUrl: '/vehicle-type', nextUrl: '/select-date', firstName, lastName, wheels, vehicleType });
  });
  
  

  //for taking input from frontend to taking forward to next route
  app.post('/vehicle-type', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const wheels = parseInt(req.body.wheels);
    const vehicleType = req.body.vehicleType;
  
    res.render('select-date',{prevUrl: '/wheels', nextUrl:'/select-date', firstName, lastName, wheels, vehicleType });
  });
  

  //In this route ,for date and then saving all the data into database
  app.post('/select-date', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const wheels = parseInt(req.body.wheels);
    const vehicleType = req.body.vehicleType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
  
    
    const newVehicle = new Vehicle({
      firstName,
      lastName,
      wheels,
      vehicleType,
      startDate,
      endDate,
    });
  
    // Save the vehicle details in database
    newVehicle.save()
      .then(() => {
        res.send('Details saved successfully!');
      })
      .catch(err => {
        res.status(500).send(`Error saving details: ${err}`);
      });
  });
  
 


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
