import User, { IUser} from "src/models/User";

export class UserRepository{
    public async findByEmail(email: string): Promise<IUser | null>{
        return await User.findOne({email});
    }

    public async create(user: IUser): Promise<IUser>{
        return await user.save();
    }

    public async update(user: IUser): Promise<IUser> {
        return await user.save();
    }
}