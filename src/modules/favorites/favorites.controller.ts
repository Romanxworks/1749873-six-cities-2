import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import {FavoritesServiceInterface} from './favorites-service.interface.js';
import FavoritesResponse from './response/favorites.response.js';
import HttpError from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';


@injectable()
export default class FavoritesController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FavoritesServiceInterface) private readonly favoritesService: FavoritesServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController...');

    this.addRoute({
      path: '/:id/:type',
      method: HttpMethod.Post,
      handler: this.addOrDelete,
      middlewares: [new ValidateObjectIdMiddleware('id')]
    });
    this.addRoute({path: '/:email', method: HttpMethod.Get, handler: this.show});

  }

  public async show(_req: Request, res: Response,): Promise<void> {
    const favorites = await this.favoritesService.findByUserEmail(_req.params.email);
    const favoritesResponse = fillDTO(FavoritesResponse, favorites);
    return this.send(res, StatusCodes.OK, favoritesResponse);
  }


  public async addOrDelete(_req: Request, res: Response): Promise<void> {
    const existsUser = await this.favoritesService.findByUserEmail(_req.body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${_req.body.email} not registered.`,
        'FavoritesController',
      );
    }

    const addDelete = Boolean(Number.parseInt(_req.params.type, 10));

    if(addDelete){
      const addFavorite = await this.favoritesService.addFavorite(_req.body.email, _req.params.id);
      return this.ok(
        res,
        fillDTO(FavoritesResponse, addFavorite)
      );

    }

    const deleteFavorite = await this.favoritesService.deleteFavorite(_req.body.email, _req.params.id);
    this.ok(
      res,
      fillDTO(FavoritesResponse, deleteFavorite)
    );

  }

}
