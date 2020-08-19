const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

// exports.deleteSeveral = Model =>
//   catchAsync(async (req, res, next) => {
//     console.log(req.params.id);
//     const doc = await Model.deleteMany({ _id: req.params.id });

//     if (!doc) {
//       return next(new AppError('No document found with that ID', 404));
//     }

//     res.status(204).json({
//       status: 'success',
//       data: null
//     });
//   });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'succes',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'succes',
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.params.id);
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    // Tour.findOne({ _id: req.params.id })
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'succes',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    //To allow for nested GET reviews on tour (hack)
    let filter;
    if (req.params.tourId) filter = { tour: req.params.tourId };
    // EXECUTE THE QUERY
    // console.log(req.query);
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sorting()
      .limitFields()
      .paginate();
    const doc = await features.query;
    // const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'succes',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
