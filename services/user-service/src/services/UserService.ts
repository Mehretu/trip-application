import { IUser } from "src/models/User";
import { UserRepository } from "src/repositories/userRepository";

export class UserService{
    constructor(private userRepository: UserRepository){}

    public async register(userData: Partial<IUser>): Promise<{ user: IUser; token: string}>{

        const 

    }
}