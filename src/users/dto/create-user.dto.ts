import {
  IsEmail,
  IsString,
  MaxLength,
  maxLength,
  minLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(40)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(40)
  username: string;
}
