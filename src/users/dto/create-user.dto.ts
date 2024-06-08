//data transfer object
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"
export class CreateUserDto {
    @IsEmail({}, { message: 'Email format is incorrect.' })
    @IsNotEmpty({ message: 'Email cannot be empty.' })
    email: string

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 2,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, { message: 'Password length must be at least 6. Password must have at least 1 uppercased letter, 1 number and 1 symbol.' })
    @IsNotEmpty()
    password: string

    name: string
    address: string
}
