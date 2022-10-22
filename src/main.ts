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
const application = applicationContainer.get<Application>(Component.Application);
await application.init();

