import User from '../models/user.model.js';
import Article from '../models/article.model.js';

export const getUsers = async (req, res, next) => {
  try {
    await User.aggregate([
      { $sort: { age: +req.query?.age ?? 1 } },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          age: 1,
        },
      },
    ]).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};

export const getUserByIdWithArticles = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User was not found' });
    }

    const articles = await Article.find(
      { owner: user._id },
      'title subtitle createdAt -_id'
    );

    await User.aggregate([
      {
        $match: { _id: user._id },
      },
      {
        $addFields: {
          articles: [...articles],
        },
      },
    ]).then((result) => res.status(200).json(result));
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    await User.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User was not found' });
    }

    const firstName = req.body?.firstName || user.firstName;
    const lastName = req.body?.lastName || user.lastName;

    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          fullName: `${firstName} ${lastName}`,
          age: req.body?.age,
        },
      },
      {
        new: true,
      }
    ).then((result) => res.status(200).json(result));
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User was not found' });
    }

    await Article.deleteMany({ owner: user._id });
    res
      .status(200)
      .json({ message: 'User and all user`s articles have been deleted' });
  } catch (err) {
    next(err);
  }
};
