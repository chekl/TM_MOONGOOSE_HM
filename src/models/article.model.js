import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 5,
      maxLength: 400,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      minLength: 5,
    },
    description: {
      type: String,
      minLength: 5,
      maxLength: 5000,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['sport', 'games', 'history'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.pre('save', async function (next) {
  const user = await this.model('User').findById(this.owner);

  if (!user) {
    throw new Error('User was not found');
  }

  user.numberOfArticles += 1;
  await user.save();

  next();
});

articleSchema.pre('remove', async function (next) {
  const user = await this.model('User').findById(this.owner);

  if (!user) {
    throw new Error('User was not found');
  }

  user.numberOfArticles -= 1;
  await user.save();

  next();
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
