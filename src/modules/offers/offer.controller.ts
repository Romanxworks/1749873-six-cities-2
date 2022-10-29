import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import OfferResponse from './response/offer.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/count/:count', method: HttpMethod.Get, handler: this.count});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:id', method: HttpMethod.Get, handler: this.getOffer});
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.getOffersPremium});
    this.addRoute({path: '/:id', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path: '/:id', method: HttpMethod.Delete, handler: this.delete});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offerResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async count(_req: Request, res: Response): Promise<void> {
    const count = Number.parseInt(_req.params.count, 10);
    const offers = await this.offerService.find(count);
    const offerResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async update(
    {params, body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const id = String(params.id);
    const existOffer = await this.offerService.exists(id);

    if (!existOffer) {
      const errorMessage = `Offer with id "${id}" not exists.`;
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    const result = await this.offerService.updateById(id, body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async delete(_req: Request, res: Response): Promise<void> {

    const existOffer = await this.offerService.exists(_req.params.id);
    const errorMessage = `Offer with id "${_req.params.id}" has been removed.`;
    if (!existOffer) {
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, {error: errorMessage});
      return this.logger.error(errorMessage);
    }
    await this.offerService.deleteById(_req.params.id);
    this.send(res, StatusCodes.OK, {info: errorMessage});
    this.logger.info(errorMessage);
  }

  public async getOffer(_req: Request, res: Response): Promise<void> {

    const existOffer = await this.offerService.exists(_req.params.id);

    if (!existOffer) {
      const errorMessage = `Offer with id "${_req.params.id}" not exists.`;
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, {error: errorMessage});
      return this.logger.error(errorMessage);
    }
    const offer = await this.offerService.findById(_req.params.id);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async getOffersPremium(_req: Request, res: Response): Promise<void> {
    console.log(_req.params.city);
    const offers = await this.offerService.findByPremium(_req.params.city);
    const offerResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

}
