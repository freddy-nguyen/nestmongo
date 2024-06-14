import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) { }

  async create(companyDto: CreateCompanyDto, user: IUser) {
    // let company = await this.companyModel.create({
    //   email: companyDto.email,
    //   address: companyDto.address,
    //   description: companyDto.description,
    // })
    // console.log('company created')
    // return company
    return this.companyModel.create({
      ...companyDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, user: IUser, updateCompanyDto: UpdateCompanyDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'User not found.'
    let company = await this.companyModel.updateOne({ ...updateCompanyDto, updatedBy: { _id: id, email: user.email } })
    console.log('company updated')
    return {
      ...company, updatedBy: { _id: id, email: user.email }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
