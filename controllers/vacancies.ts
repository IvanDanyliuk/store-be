import mongoose from 'mongoose';
import Vacancy from '../models/vacancy';


export const getVacancies = async (req: any, res: any) => {
  const { page, itemsPerPage } = req.query;
  try {
    const response = await Vacancy.find();
    const pages = Math.ceil(response.length / itemsPerPage);
    const vacancies = response.slice(itemsPerPage * (page - 1), itemsPerPage * page);
    res.status(200).json({
      data: vacancies,
      pages
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getVacancy = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const vacancy = await Vacancy.findById(id);
    res.status(200).json(vacancy);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createVacancy = async (req: any, res: any) => {
  const { vacancy } = req.body.params;
  const newVacancyItem = new Vacancy(vacancy);
  try {
    const newVacancy = await newVacancyItem.save();
    res.status(200).json(newVacancy);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVacancy = async (req: any, res: any) =>{
  const { id, updatedVacancy } = req.body.params.updatedVacancy;
  try {
    const updated = await Vacancy.findByIdAndUpdate(id, updatedVacancy, { new: true });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVacancy = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    await Vacancy.findByIdAndDelete(id);
    res.status(200).json('Vacancy has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};