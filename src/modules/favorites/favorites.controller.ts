import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import {FavoritesServiceInterface} from './favorites-service.interface.js';
// import CreateFavoritesDto from './dto/create-favorites.dto.js';
import FavoritesResponse from './response/favorites.response.js';

@injectable()
export default class FavoritesController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FavoritesServiceInterface) private readonly favoritesService: FavoritesServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController...');

    this.addRoute({path: '/:id/:type', method: HttpMethod.Post, handler: this.addDelete});
    this.addRoute({path: '/:email', method: HttpMethod.Get, handler: this.index});

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const favorites = await this.favoritesService.findByUserEmail(_req.params.email);
    console.log(favorites);
    const favoritesResponse = fillDTO(FavoritesResponse, favorites);
    this.ok(res, favoritesResponse);
  }


  public async addDelete(_req: Request, res: Response): Promise<void> {
    console.log(_req.params);
    if(_req.params.type){
      const addFavorite = await this.favoritesService.addFavorite(_req.body.email, _req.params.id);
      this.ok(
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
