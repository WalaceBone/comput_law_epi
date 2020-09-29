import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now()},
    username: String,
    password: String,
    rules: [String],
    isBritish: Boolean
}, {strict: false});

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

schema.set('toObject', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export const UserSchema = schema;