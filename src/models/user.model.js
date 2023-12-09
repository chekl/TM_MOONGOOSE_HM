import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 60,
      required: true,
      trim: true,
    },
    fullName: String,
    password: {
      type: String,
      minLength: 3,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['admin', 'writer', 'guest'],
    },
    age: {
      type: Number,
      min: 1,
      max: 99,
    },
    numberOfArticles: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

userSchema.pre('save', function (next) {
  this.age = this.age < 0 ? 1 : this.age;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
