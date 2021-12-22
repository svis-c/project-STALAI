const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT;

// Connection to mongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log('- Connected to mongoDB');

    app.listen(PORT, () => console.log(`-- Starting server at port: ${PORT}`));
  })
  .catch((err) => {
    console.log('- Error: ' + err);

    process.exit(1);
  });

// Models
const Portfolio = require('./models/portfolioModel.js');
const Order = require('./models/orderModel.js');

// Middlewares
app.use(cors());
app.use(express.json());

// ROUTES
app.get('/', (req, res) => res.send('API is running...'));

// - GET
// -- /api/portfolio    |   returns all portfolio items (list of created tables)
app.get('/api/portfolio', (req, res) => {
  Portfolio.find({}).then((result) => res.json(result));
});

// -- /api/orders       |   returns all orders
app.get('/api/orders', (req, res) => {
  Order.find({}).then((result) => res.json(result));
});

// - POST
// -- /api/orders       |   adds new order to orders collection
app.post('/api/orders', (req, res) => {
  let newOrder = req.body;
  const order = new Order(newOrder);

  order
    .save()
    .then(() => res.json({ message: 'Jūsų užsakymas išsaugotas' }))
    .catch((err) =>
      res.json({ message: 'Kažkas nepavyko, bandykite dar kartą' })
    );
});

// - PUT
// -- /api/orders/:id   |   updates order (from incompleted to completed) based id
app.put('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;

  Order.findOneAndUpdate({ _id: orderId }, { completed: true })
    .then(() => res.json({ message: 'Order updated' }))
    .catch((err) =>
      res.json({ message: 'Order not updated, please try latter' })
    );
});
