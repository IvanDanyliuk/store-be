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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacancies_1 = require("../controllers/vacancies");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, itemsPerPage } = req.query;
    try {
        const vacancies = yield (0, vacancies_1.getVacancies)(page, itemsPerPage);
        res.status(200).json(vacancies);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vacancy = yield (0, vacancies_1.getVacancy)(id);
        res.status(200).json(vacancy);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vacancy } = req.body.params;
    try {
        const newVacancy = yield (0, vacancies_1.createVacancy)(vacancy);
        res.status(200).json(newVacancy);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, updatedVacancy } = req.body.params.updatedVacancy;
    try {
        const updated = yield (0, vacancies_1.updateVacancy)(id, updatedVacancy);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const vacancyDeletingMessage = yield (0, vacancies_1.deleteVacancy)(id);
        res.status(200).json(vacancyDeletingMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
