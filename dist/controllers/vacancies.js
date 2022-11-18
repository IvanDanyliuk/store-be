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
const getVacancies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, itemsPerPage } = req.query;
    try {
        const response = yield vacancy_1.default.find();
        const pages = Math.ceil(response.length / itemsPerPage);
        const vacancies = response.slice(itemsPerPage * (page - 1), itemsPerPage * page);
        res.status(200).json({
            data: vacancies,
            pages
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getVacancies = getVacancies;
const getVacancy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vacancy = yield vacancy_1.default.findById(id);
        res.status(200).json(vacancy);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getVacancy = getVacancy;
const createVacancy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vacancy } = req.body.params;
    const newVacancyItem = new vacancy_1.default(vacancy);
    try {
        const newVacancy = yield newVacancyItem.save();
        res.status(200).json(newVacancy);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createVacancy = createVacancy;
const updateVacancy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, updatedVacancy } = req.body.params.updatedVacancy;
    try {
        const updated = yield vacancy_1.default.findByIdAndUpdate(id, updatedVacancy, { new: true });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateVacancy = updateVacancy;
const deleteVacancy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield vacancy_1.default.findByIdAndDelete(id);
        res.status(200).json('Vacancy has been deleted successfully');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteVacancy = deleteVacancy;
