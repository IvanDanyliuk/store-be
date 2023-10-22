"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVacancy = exports.updateVacancy = exports.createVacancy = exports.getVacancy = exports.getVacancies = void 0;
const vacancy_1 = __importDefault(require("../models/vacancy"));
const getVacancies = (page, itemsPerPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacancies = yield vacancy_1.default.find({}).skip((+page - 1) * +itemsPerPage).limit(+itemsPerPage);
        const vacanciesCount = yield vacancy_1.default.countDocuments({});
        const pages = Math.ceil(vacanciesCount / itemsPerPage);
        // const vacancies = response.slice(itemsPerPage * (page - 1), itemsPerPage * page);
        return ({
            data: vacancies,
            pages
        });
    }
    catch (error) {
        throw Error('Cannot find vacancies');
    }
});
exports.getVacancies = getVacancies;
const getVacancy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacancy = yield vacancy_1.default.findById(id);
        return vacancy;
    }
    catch (error) {
        throw Error('Cannot find a vacancy by passed id');
    }
});
exports.getVacancy = getVacancy;
const createVacancy = (vacancy) => __awaiter(void 0, void 0, void 0, function* () {
    const newVacancyItem = new vacancy_1.default(vacancy);
    try {
        const newVacancy = yield newVacancyItem.save();
        return newVacancy;
    }
    catch (error) {
        throw Error('Cannot create a new vacancy');
    }
});
exports.createVacancy = createVacancy;
const updateVacancy = (id, updatedVacancy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield vacancy_1.default.findByIdAndUpdate(id, updatedVacancy, { new: true });
        return updated;
    }
    catch (error) {
        throw Error('Cannot update a vacancy');
    }
});
exports.updateVacancy = updateVacancy;
const deleteVacancy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield vacancy_1.default.findByIdAndDelete(id);
        return 'Vacancy has been deleted successfully';
    }
    catch (error) {
        throw Error('Cannot delete a vacancy');
    }
});
exports.deleteVacancy = deleteVacancy;
