import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getArticles = async (req, res, next) => {
  try {
    const { title, limit, page } = req.query;
    await Article.find(
      req.query?.title ? { title: { $regex: title } } : {},
      {},
      { limit: limit ?? 5, skip: (limit ?? 5) * (page ?? 0) }
    )
      .populate({ path: 'owner', select: 'fullName email age -_id' })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    await Article.findById(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    await Article.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};

export const updateArticleById = async (req, res, next) => {
  try {
    if (req.query.password) {
      const article = await Article.findById(req.params.id);

      if (!article) {
        res.status(404).json({ message: 'This article was not found' });
      }

      const user = await User.findById(article.owner);

      if (user.password != req.query.password) {
        res.status(403).json({ message: 'Forbidden: wrong password' });
      }

      await Article.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      ).then((result) => res.status(200).json(result));
    } else {
      res.status(403).json({ message: 'Forbidden: write password' });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    if (req.query.password) {
      const article = await Article.findById(req.params.id);

      if (!article) {
        res.status(404).json({ message: 'This article was not found' });
      }

      const user = await User.findById(article.owner);
      if (user.password !== req.query.password) {
        res.status(403).json({ message: 'Forbidden: wrong password' });
      }

      await Article.deleteOne({ _id: article._id }).then((result) =>
        res.status(200).json({ message: 'This article was deleted!' })
      );
    } else {
      res.status(403).json({ message: 'Forbidden: write password' });
    }
  } catch (err) {
    next(err);
  }
};
