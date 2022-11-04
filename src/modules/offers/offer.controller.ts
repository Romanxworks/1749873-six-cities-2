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
import HttpError from '../../common/errors/http-error.js';
import * as core from 'express-serve-static-core';
import {CommentServiceInterface} from '../comments/comment-service.interface.js';
import CommentResponse from '../comments/response/comment.response.js';

type ParamsGetOffer = {
  id: string;
}

export type RequestQuery = {
  count?: number;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:id', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.showPremium});
    this.addRoute({path: '/:id', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:id', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/:id/comments', method: HttpMethod.Get, handler: this.getComments});
  }

  public async index(
    {query}: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response): Promise<void> {
    const count = Number(query.count);
    if(!count){
      const offers = await this.offerService.find();
      return  this.ok(res, fillDTO(OfferResponse, offers));
    }
    const offers = await this.offerService.find(count);
    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferResponse, offer));
  }

  public async update(
    {params, body}:  Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const existOffer = await this.offerService.exists(params.id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id "${params.id}" not exists.`,
        'OfferController'
      );
    }

    const result = await this.offerService.updateById(params.id, body);
    this.ok(res, fillDTO(OfferResponse, result));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.exists(params.id);
    const errorMessage = `Offer with id "${params.id}" has been removed.`;
    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        errorMessage,
        'OfferController'
      );
    }
    const offer = await this.offerService.deleteById(params.id);
    this.noContent(res, offer);
    this.logger.info(errorMessage);
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.exists(params.id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id "${params.id}" not exists.`,
        'OfferController'
      );
    }
    const offer = await this.offerService.findById(params.id);
    this.ok(res, fillDTO(OfferResponse, offer));
  }

  public async showPremium(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findByPremium(_req.params.city);
    const offerResponse = fillDTO(OfferResponse, offers);
    this.ok(res, offerResponse);
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    console.log(await this.offerService.exists(params.id));
    if (!await this.offerService.exists(params.id)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.id} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.id);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

}
