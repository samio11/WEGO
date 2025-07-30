import { Query } from "mongoose";
import { excludingFields } from "./Query.Constants";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, string>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter = { ...this.query };
    for (const x of excludingFields) {
      delete filter[x];
    }
    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }

  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm || "";
    const searchQuery = {
      $or: searchableFields.map((x) => ({
        [x]: { $regex: searchTerm, $options: "i" },
      })),
    };
    this.modelQuery = this.modelQuery.find(searchQuery);
    return this;
  }

  sort(): this {
    const sort = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  fields(): this {
    const fields = this.query.fields.split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  paginate(): this {
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
