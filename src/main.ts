import Application from './app/application.js';
import LoggerService from './common/logger/logger.service.js';
import ConfigService from './common/config/config.service.js';
import {Container} from 'inversify';
import {LoggerInterface} from './common/logger/logger.interface.js';
import {Component} from './types/component.types.js';
import {ConfigInterface} from './common/config/config.interface.js';
import DatabaseService from './common/database/database.service.js';
import {DatabaseInterface} from './common/database/database.interface.js';
import 'reflect-metadata';
import UserService from './modules/users/user.service.js';
import {UserServiceInterface} from './modules/users/user-service.interface.js';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './modules/users/user.entity.js';
import {OfferServiceInterface} from './modules/offers/offer-service.interface.js';
import {OfferEntity, OfferModel} from './modules/offers/offer.entity.js';
import OfferService from './modules/offers/offer.service.js';
import CommentService from './modules/comments/comment.service.js';
import {CommentServiceInterface} from './modules/comments/comment-service.interface.js';
import {CommentEntity, CommentModel} from './modules/comments/comment.entity.js';
import {FavoritesServiceInterface} from './modules/favorites/favorites-service.interface.js';
import { FavoritesEntity, FavoritesModel } from './modules/favorites/favorites.entity.js';
import  FavoritesService  from './modules/favorites/favorites.service.js';
import {ControllerInterface} from './common/controller/controller.interface.js';
import OfferController from './modules/offers/offer.controller.js';
import UserController from './modules/users/user.controller.js';
import FavoritesController from './modules/favorites/favorites.controller.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import {ExceptionFilterInterface} from './common/errors/exception-filter.interface.js';
import CommentController from './modules/comments/comment.controller.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
applicationContainer.bind<FavoritesServiceInterface>(Component.FavoritesServiceInterface).to(FavoritesService).inSingletonScope();
applicationContainer.bind<types.ModelType<FavoritesEntity>>(Component.FavoritesModel).toConstantValue(FavoritesModel);

applicationContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.FavoritesController).to(FavoritesController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.CommentController).to(CommentController).inSingletonScope();

applicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();

