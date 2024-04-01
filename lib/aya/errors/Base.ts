import { Err } from "@aya/types/Err";

export enum Errors {
  Unknown = 'unknown',
  ParameterTypeMismatch = 'parameter.type.mismatch',
  OutdatedVersion = 'outdated.version',
  InvalidGameVersion = 'invalid.game.version',
  ExpiredToken = 'expired.token',
  NotExistThisGameId = 'not.exist.this.gameid',
  InvalidIdReplayVersion = 'invalid.id.replay.version',
  InternalServerError = 'internal.server.error',
  TokenMissing = 'token.is.missing',
  PlayerNotFound = 'player.not.found'
}

export default class AyaError extends Error {

  public readonly cod?: number;
  public readonly message: string;

  protected static readonly _defaultError: Err = { cod: 500, message: Errors.InternalServerError };

  constructor(error: Err) {
    super()
    this.cod = error.cod;
    this.message = error.message;
  }

  static listExceptions(code: number): Err {
    const errors: { [key: number]: Err } = {
      1000: { cod: 498, message: Errors.Unknown },
      1001: { cod: 498, message: Errors.ParameterTypeMismatch },
      1004: { cod: 498, message: Errors.OutdatedVersion },
      1007: { cod: 498, message: Errors.InvalidGameVersion },
      1102: { cod: 498, message: Errors.ExpiredToken },
      1201: { cod: 498, message: Errors.NotExistThisGameId },
      9300: { cod: 498, message: Errors.InvalidIdReplayVersion }
    }
    return errors[code] || this._defaultError;
  }

}