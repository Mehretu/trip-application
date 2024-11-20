import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string;
    email: string;
    password_hash: string;
    phone_number?: string;
    role: 'user' | 'driver' | 'admin';
    is_verified: boolean;
    verification_token?: string;
    created_at: Date;
    updated_at: Date;
    last_login?: Date;
    failed_login_attempts: number;
    account_locked: boolean;

}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password_hash:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        unique: true
    },
    role:{
        type: String,
        enum: ['user', 'driver', 'admin'], default: 'user'
    },
    is_verified:{
        type: Boolean,
        default: false
    },
    verification_token:{
        type: String
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
    last_login:{
        type: Date
    },
    failed_login_attempts: {
        type: Number,
        default: 0
    },
    account_locked:{
        type: Boolean,
        default: false
    },
});
// Password Validation
userSchema.methods.isValidPassword = async function (password:string): Promise<boolean> {
    return await bcrypt.compare(password, this.password_hash)
    
}
// Pre-save hook to hash password
userSchema.pre<IUser>('save', async function (next) {
    if(this.isModified('password_hash')){
        this.password_hash = await bcrypt.hash(this.password_hash,10);
    }
    next();
    
});

export default mongoose.model<IUser>('User', userSchema);