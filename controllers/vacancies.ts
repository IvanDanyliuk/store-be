import mongoose from 'mongoose';
import { IVacancy } from 'types';
import Vacancy from '../models/vacancy';


export const getVacancies = async (page: any, itemsPerPage: any) => {
  try {
    const response = await Vacancy.find();
    const pages = Math.ceil(response.length / itemsPerPage);
    const vacancies = response.slice(itemsPerPage * (page - 1), itemsPerPage * page);
    return ({
      data: vacancies,
      pages
    });
  } catch (error: any) {
    throw Error('Cannot find vacancies');
  }
};

export const getVacancy = async (id: any) => {
  try {
    const vacancy = await Vacancy.findById(id);
    return vacancy;
  } catch (error: any) {
    throw Error('Cannot find a vacancy by passed id');
  }
};

export const createVacancy = async (vacancy: IVacancy) => {
  const newVacancyItem = new Vacancy(vacancy);
  try {
    const newVacancy = await newVacancyItem.save();
    return newVacancy;
  } catch (error: any) {
    throw Error('Cannot create a new vacancy');
  }
};

export const updateVacancy = async (id: any, updatedVacancy: any) =>{
  try {
    const updated = await Vacancy.findByIdAndUpdate(id, updatedVacancy, { new: true });
    return updated;
  } catch (error: any) {
    throw Error('Cannot update a vacancy');
  }
};

export const deleteVacancy = async (id: any) => {
  try {
    await Vacancy.findByIdAndDelete(id);
    return 'Vacancy has been deleted successfully';
  } catch (error: any) {
    throw Error('Cannot delete a vacancy');
  }
};