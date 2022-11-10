"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vacancySchema = new mongoose_1.default.Schema({
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
let Vacancy = mongoose_1.default.model('Vacancy', vacancySchema);
exports.default = Vacancy;
