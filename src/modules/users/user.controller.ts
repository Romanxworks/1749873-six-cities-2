import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {UserServiceInterface} from './user-service.interface.js';
import {fillDTO} from '../../utils/common.js';
import UserResponse from './response/user.response.js';
import CreateUserDto from './dto/create-user.dto.js';
import { FavoritesServiceInterface } from '../favorites/favorites-service.interface.js';


@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.FavoritesServiceInterface) private readonly favoritesService: FavoritesServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:id', method: HttpMethod.Get, handler: this.index});

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const user = await this.userService.findById(_req.params.id);
    const userResponse = fillDTO(UserResponse, user);
    this.ok(res, userResponse);
  }


  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): Promise<void> {
    const result = await this.userService.findOrCreate(body, 'solt');
    await this.favoritesService.create({email:body.email,offerId:[] });
    this.created(
      res,
      fillDTO(UserResponse, result)
    );
  }

}
