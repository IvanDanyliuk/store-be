"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = __importDefault(require("./routes/products"));
const reviews_1 = __importDefault(require("./routes/reviews"));
const categories_1 = __importDefault(require("./routes/categories"));
const shipping_1 = __importDefault(require("./routes/shipping"));
const users_1 = __importDefault(require("./routes/users"));
const orders_1 = __importDefault(require("./routes/orders"));
const vacancies_1 = __importDefault(require("./routes/vacancies"));
const gallery_1 = __importDefault(require("./routes/gallery"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb' }));
app.use('/products', products_1.default);
app.use('/reviews', reviews_1.default);
app.use('/categories', categories_1.default);
app.use('/shipping', shipping_1.default);
app.use('/user', users_1.default);
app.use('/orders', orders_1.default);
app.use('/vacancies', vacancies_1.default);
app.use('/gallery', gallery_1.default);
mongoose_1.default.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`)))
    .catch((error) => console.log(`${error} did not connect`));
