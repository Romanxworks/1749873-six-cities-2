import {IsEmail, IsString, Length, IsBoolean} from 'class-validator';
import { MAX_LENGTH_NAME, MAX_LENGTH_PASSWORD, MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from '../../../const.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'avatarUrl is required'})
  public avatarUrl!: string;

  @IsString({message: 'name is required'})
  @Length(MIN_LENGTH_NAME, MAX_LENGTH_NAME, {message: `Min length is ${MIN_LENGTH_NAME}, max is ${MAX_LENGTH_NAME}`})
  public name!: string;

  @IsBoolean({message: 'type must be an boolean'})
  public type!: boolean;

  @IsString({message: 'password is required'})
  @Length(MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD, {message: `Min length for password is ${MIN_LENGTH_PASSWORD}, max is ${MAX_LENGTH_PASSWORD}`})
  public password!: string;
}
