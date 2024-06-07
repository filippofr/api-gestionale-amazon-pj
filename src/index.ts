import 'reflect-metadata';

import app from './app';
import mongoose from 'mongoose';
require('dotenv').config();
import cron from 'node-cron';
import orderItemSrv from './api/order-item/order-item.service';
import orderSrv from './api/order/order.service';

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

mongoose.set('debug', true);
mongoose.connect(DB_URI!)
  .then(_ => {
    console.log('Connected to db');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    cron.schedule('0 * * * *', () => {
      orderSrv.fetchOrders();
      orderItemSrv.fetchItems();
    });
  })
  .catch(err => {
    console.error(err);
  })
