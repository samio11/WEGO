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
exports.adminServices = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const driver_model_1 = require("../driver/driver.model");
const user_model_1 = require("../user/user.model");
const SearchField_contant_1 = require("./SearchField.contant");
const viewAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query)
        .filter()
        .search(SearchField_contant_1.UserSearch)
        .fields()
        .sort()
        .paginate();
    const result = yield queryBuilder.build();
    return result;
});
const updateDriverStatus = (driverId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.User.findById(driverId);
    if (!existUser) {
        throw new AppError_1.AppError(404, "User is Not Exist");
    }
    const updatedDriver = yield driver_model_1.Driver.findOneAndUpdate({ userId: driverId }, { isApproved: payload }, { new: true });
    return updatedDriver;
});
exports.adminServices = { viewAllUser, updateDriverStatus };
