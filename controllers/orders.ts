import mongoose from 'mongoose';
import Order from '../models/order';
import Stripe from 'stripe';


export const getOrders = async (req: any, res: any) => {
  const { page, ordersPerPage, filterData } = req.query;
  try {
    const response = !filterData ? 
      await Order.find() : 
      await Order.find({ 'customer.lastName': filterData });
    const pages = Math.ceil(response.length / ordersPerPage);
    const orders = response.slice(ordersPerPage * (page - 1), ordersPerPage * page);
    res.status(200).json({
      data: orders,
      pages
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req: any, res: any) => {
  try {
    const { page, ordersPerPage, email } = req.query;
    const response = await Order.find({ 'customer.email': email });
    const pages = Math.ceil(response.length / ordersPerPage);
    const orders = response.slice(ordersPerPage * (page - 1), ordersPerPage * page);
    res.status(200).json({
      data: orders,
      pages
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req: any, res: any) => {
  try {
    const newOrderItem = new Order(req.body.params.order);
    const newOrder = newOrderItem.save();
    res.status(200).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req: any, res: any) => {
  try {
    const { id, updatedOrder } = req.body.params.updatedOrder;
    const updated = await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const payOrder = async (req: any, res: any) => {
  try {
    
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    await Order.findByIdAndDelete(id);
    res.status(200).json('The order had been successfully deleted!')
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};