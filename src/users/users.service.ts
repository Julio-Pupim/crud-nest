import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUserDto(createBookDto: CreateBookDto): Promise<User> {
    const createdBook = new this.userModel(createBookDto);
    return createdBook.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: ObjectId) {
    return this.userModel.findOne(id);
  }

  update(id: ObjectId, updateBookDto: UpdateUserDto) {
    return this.userModel.findOneAndDelete(id, updateBookDto);
  }

  remove(id: ObjectId) {
    return this.userModel.deleteOne(id);
  }

  findUser(email:string){
    return this.userModel.find({email:email}).select("-password");
  }
}
