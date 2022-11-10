import mongoose from 'mongoose';
import { IVacancy } from 'types';


const vacancySchema = new mongoose.Schema({
  title: String,
  employment: String,
  character: String,
  responsibilities: String,
  mustHaves: String,
  experience: String,
  salary: String,
  contactPerson: String,
  contactPhone: String,
  contactEmail: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let Vacancy = mongoose.model<IVacancy>('Vacancy', vacancySchema);

export default Vacancy;