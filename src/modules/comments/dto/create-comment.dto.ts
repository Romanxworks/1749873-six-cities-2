import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';
import { MIN_RATING, MAX_RATING, MIN_LENGTH_TEXT_COMMENT, MAX_LENGTH_TEXT_COMMENT } from '../../../const.js';

export default class CreateCommentDto {

  @IsString({message: 'text is required'})
  @Length(MIN_LENGTH_TEXT_COMMENT, MAX_LENGTH_TEXT_COMMENT, {message: `Min length is ${MIN_LENGTH_TEXT_COMMENT}, max is ${MAX_LENGTH_TEXT_COMMENT}`})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(MIN_RATING, {message: `Minimum rating is ${MIN_RATING}`})
  @Max(MAX_RATING, {message: `Maximum rating is ${MAX_RATING}`})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}
