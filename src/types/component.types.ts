export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  FavoritesModel: Symbol.for('FavoritesModel'),
  FavoritesServiceInterface: Symbol.for('FavoritesServiceInterface'),
  OfferController: Symbol.for('OfferController'),
  UserController: Symbol.for('UserController'),
  FavoritesController: Symbol.for('FavoritesController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  CommentController: Symbol.for('CommentController'),
} as const;
