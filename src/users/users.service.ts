import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs'; //if library's fault, export their functions directly

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash

  }
  async create(userDto: CreateUserDto) {
    let password = this.hashPassword(userDto.password) //this because class
    // let user = await this.userModel.create(userDto)
    let user = await this.userModel.create({
      email: userDto.email,
      password: password,
      name: userDto.name
    })
    console.log('created')
    return user
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'User not found.'
    return this.userModel.findOne({ _id: id });

  }

  async update(updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(updateUserDto._id))
      return 'User not found.'
    let user = await this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto })
    console.log('updated')
    return user
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
