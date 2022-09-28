import mongoose from 'mongoose';
import Order from '../models/order';
import Stripe from 'stripe';


export const getOrders = async (req: any, res: any) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req: any, res: any) => {
  try {
    const { email } = req.body.params;
    const orders = await Order.find({ email });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req: any, res: any) => {
  try {
    const newOrderData = req.body.params.order;
    const newOrder = new Order(newOrderData);
    res.status(200).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req: any, res: any) => {
  try {
    const { id, dataToUpdate } = req.body.params.updatedOrder;
    const updated = await Order.findByIdAndUpdate(id, dataToUpdate, { new: true });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const payOrder = async (req: any, res: any) => {
  try {
    const stripe = new Stripe(
      process.env.SECRET_KEY!, 
      { apiVersion: '2022-08-01', typescript: true }
    );

    const { items } = req.body.params.paymentData;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: items,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    await Order.findByIdAndDelete(id);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};