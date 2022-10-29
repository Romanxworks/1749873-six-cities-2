import {Expose} from 'class-transformer';

export default class UserResponse {
  @Expose()
  public _id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public name!: string;

  @Expose()
  public type!: boolean;
}
