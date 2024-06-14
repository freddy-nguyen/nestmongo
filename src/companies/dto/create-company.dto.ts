//data transfer object
import { IsNotEmpty } from "class-validator"
export class CreateCompanyDto {
    @IsNotEmpty({ message: 'Email cannot be empty.' })
    email: string
    @IsNotEmpty({ message: 'Address cannot be empty.' })
    address: string
    @IsNotEmpty({ message: 'Description cannot be empty.' })
    description: string
}
