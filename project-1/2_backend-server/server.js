const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Portfolio = require('./models/portfolioModel.js');

dotenv.config();

const portfolios = [
  {
    image: 'img.jpg',
    description: 'White table',
    dimensions: '100cm x 100cm x 120cm',
    color: 'Brown',
  },
  {
    image: 'img.jpg',
    description: 'Red table',
    dimensions: '130cm x 130cm x 120cm',
    color: 'Brown',
  },
  {
    image: 'img.jpg',
    description: 'Blue table',
    dimensions: '140cm x 140cm x 120cm',
    color: 'Brown',
  },
  {
    image: 'img.jpg',
    description: 'Green table',
    dimensions: '100cm x 100cm x 120cm',
    color: 'Brown',
  },
  {
    image: 'img.jpg',
    description: 'Yellow table',
    dimensions: '100cm x 100cm x 120cm',
    color: 'Brown',
  },
  {
    image: 'img.jpg',
    description: 'Black table',
    dimensions: '130cm x 100cm x 120cm',
    color: 'Brown',
  },
  {
    image: 'img.jpg',
    description: 'Orange table',
    dimensions: '150cm x 100cm x 120cm',
    color: 'Brown',
  },
  {
    image: 'img.jpg',
    description: 'Pink table',
    dimensions: '100cm x 90cm x 120cm',
    color: 'Brown',
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log('- Connected to mongoDB');

    Portfolio.insertMany(portfolios)
      .then(() => console.log('-- Portfolios collection updated'))
      .catch((err) => console.log('-- Error: ' + err));
  })
  .catch((err) => {
    console.log('- Error: ' + err);

    process.exit(1);
  });
