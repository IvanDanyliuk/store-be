import mongoose from 'mongoose';
import { IOrder } from 'types';
import Order from '../models/order';


export const getOrders = async (page: any, ordersPerPage: any, filterData: any) => {
  try {
    const query = filterData ? { 'customer.lastName': filterData } : {};

    const orders = await Order
      .find(query)
      .skip((+page - 1) * +ordersPerPage)
      .limit(+ordersPerPage);
      
    const ordersCount = await Order.countDocuments(query);
    const pages = Math.ceil(ordersCount / ordersPerPage);

    return ({
      data: orders,
      pages
    });
  } catch (error: any) {
    throw Error('Cannot find orders');
  }
};

export const getUserOrders = async (page: any, ordersPerPage: any, email: any) => {
  try {
    const orders = await Order
      .find({ 'customer.email': email })
      .skip(+page * +ordersPerPage)
      .limit(+ordersPerPage);

    const ordersCount = await Order.countDocuments({ 'customer.email': email });
    const pages = Math.ceil(ordersCount / ordersPerPage);

    return ({
      data: orders,
      pages
    });
  } catch (error: any) {
    throw Error('Cannot find orders');
  }
};

export const createOrder = async (order: IOrder) => {
  try {
    const newOrderItem = new Order(order);
    const newOrder = newOrderItem.save();
    return newOrder;
  } catch (error: any) {
    throw Error('Cannot create an order');
  }
};

export const updateOrder = async (id: string, updatedOrder: IOrder) => {
  try {
    const updated = await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
    return updated;
  } catch (error: any) {
    throw Error('Cannot update an order');
  }
};

export const payOrder = async () => {
  try {
    return 'Currently payment is not available'
  } catch (error: any) {
    throw Error('Cannot pay an order');
  }
};

export const deleteOrder = async (id: any) => {
  try {
    await Order.findByIdAndDelete(id);
    return 'The order had been successfully deleted!';
  } catch (error: any) {
    throw Error('Cannot delete an order');
  }
};