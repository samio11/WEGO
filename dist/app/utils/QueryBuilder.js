"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const Query_Constants_1 = require("./Query.Constants");
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    filter() {
        const filter = Object.assign({}, this.query);
        for (const x of Query_Constants_1.excludingFields) {
            delete filter[x];
        }
        this.modelQuery = this.modelQuery.find(filter);
        return this;
    }
    search(searchableFields) {
        const searchTerm = this.query.searchTerm || "";
        const searchQuery = {
            $or: searchableFields.map((x) => ({
                [x]: { $regex: searchTerm, $options: "i" },
            })),
        };
        this.modelQuery = this.modelQuery.find(searchQuery);
        return this;
    }
    sort() {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    fields() {
        const fields = this.query.fields
            ? this.query.fields.split(",").join(" ")
            : "";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 5;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    build() {
        return this.modelQuery;
    }
}
exports.QueryBuilder = QueryBuilder;
