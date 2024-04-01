type Err = {
  cod?: number,
  message: string
}

export enum Errors {
  PlayerNotFound = 'player.not.found',
  BuildNotFound = 'build.not.found',
}

export default class NinaError extends Error {

  public readonly cod?: number;
  public readonly message: string;

  protected static readonly _defaultError: Err = { cod: 500, message: 'internal.server.error' };

  constructor(error: Err) {
    super()
    this.cod = error.cod;
    this.message = error.message;
  }
}