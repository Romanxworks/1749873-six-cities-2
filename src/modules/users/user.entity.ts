import {User} from '../../types/user.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';
import {
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME,
  // MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD
} from '../../const.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.name = data.name;
    this.type = data.type;
  }

  @prop({ unique: true,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']
  })
  public email!: string;

  @prop({required: false, default: 'avatar-angelina.jpg'})
  public avatarUrl!: string;

  @prop({required: true,
    minlength: [MIN_LENGTH_NAME, `Min length for name is ${MIN_LENGTH_NAME}`],
    maxlength: [MAX_LENGTH_NAME, `Max length for name is ${MAX_LENGTH_NAME}`],
    default: ''})
  public name!: string;

  @prop({required: true,
    // minlength: [MIN_LENGTH_PASSWORD, `Min length for password is ${MIN_LENGTH_PASSWORD}`],
    // maxlength: [MAX_LENGTH_PASSWORD, `Max length for password is ${MAX_LENGTH_PASSWORD}`],
    default: ''})
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  @prop({required: true, default: false})
  public type!: boolean;
}

export const UserModel = getModelForClass(UserEntity);
