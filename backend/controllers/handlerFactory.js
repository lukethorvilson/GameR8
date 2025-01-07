const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/appError");
const { Op } = require("sequelize");

/**
 * Finds one of the model and deletes it, (Soft delete only for Users!)
 * @param {*} Model - The sequelize table used for querying and making changes to the Postgres database.
 */
exports.deleteOne = (Model) => {
  catchAsync(async (req, res, next) => {
    // find row by id and destroy it
    const row = await Model.destroy({
      where: {
        id: +req.params.id,
      },
      // if the Model is a user, then save a soft copy
      force: !Model.getTableName().toLowerCase().contains("user"),
    });

    if (!row) {
      return next(new AppError("No record found with that ID", 404));
    }

    res.status(404).json({
      status: "success",
      data: null,
    });
  });
};

/**
 * This creates a new row in the Model used in this method with the current body of the incoming request.
 * @param {*} Model - The sequelize table used for querying and making changes to the Postgres database.
 * @returns void
 */
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const row = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: row,
    });
  });

/**
 * Gets all of the queried model and returns the data in descending order by creation
 * @param {*} Model - Model being queried
 * @returns void
 */
exports.getAll = (Model, searchFields = []) =>
  catchAsync(async (req, res, next) => {
    // automatically gets all the models ordered by the date
    let queryOptions = { order: [["createdAt", "DESC"]] };
    if (req.query?.limit) {
      const number = Number(req.query.limit);
      if (Number.isInteger(number)) queryOptions.limit = Math.round(number);
    }
    // check for search query parameter and add it to the query for partial matching string
    if (req.query?.search) {
      const searchString = req.query.search;
      queryOptions.where = {
        // for each field in the searchFields array, add a query to the where clause
        [Op.like]: searchFields.map((field) => ({
          // field name such as username or fullName
          [field]: {
            [Op.iLike]: `%${searchString}%`,
          },
        })),
      };
    }
    const rows = await Model.findAll(queryOptions);
    res.status(200).json({
      status: "success",
      data: rows,
    });
  });

/**
 * Gets all of the queried model by Pk and returns the data in descending order by creation
 * @param {*} Model - Model being queried to get all rows for (id)
 * @returns void
 */
exports.getAllByPk = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!req.params?.id) {
      return next(
        new AppError("No ID was specified for the Table to query!", 404)
      );
    }
    // automatically gets all the models ordered by the date
    let queryOptions = { order: [["createdAt", "DESC"]] };
    if (req.query?.limit) {
      const number = Number(req.query.limit);
      if (Number.isInteger(number)) queryOptions.limit = Math.round(number);
    }
    const rows = await Model.findAll({
      where: {
        id: +req.params.id,
      },
      ...queryOptions,
    });
    res.status(200).json({
      status: "success",
      data: rows,
    });
  });
