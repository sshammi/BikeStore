import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { TUser } from "./user.interface";
import config from "../../config";
const userSchema = new Schema<TUser>(
    {
      name: {
        type: String,
        required: true,
        trim: true, 
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
      },
      deactive:{
        type:Boolean,
        default:false,
      }
    },
    {
      timestamps: true,
      versionKey:false,
    }
  );
  
  userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; 
  
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  
    next();
});
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TUser>('User', userSchema);