import axios, { AxiosInstance } from 'axios';
import CONFIG, { Config } from '@aya/utils/config';
import AyaError, { Errors } from '@aya/errors/Base';

type Methods = 'get' | 'post' | 'put' | 'delete' | 'patch';

type ClientSettings = {
  method: Methods;
  endpoint: string;
  body?: any
}

type constructor = {
  token: string;
  debug?: boolean
}


export default abstract class Client {

  private readonly _token: string;
  private readonly _debug: boolean = false;

  protected readonly _instance: AxiosInstance;
  protected readonly _config: Config = CONFIG;

  constructor(client: constructor) {

    if (!client.token) throw new AyaError({ message: Errors.TokenMissing });

    this._token = client.token;
    this._debug = client.debug ?? false;

    this._instance = axios.create({
      baseURL: 'https://bser-rest-release.bser.io/api',
      headers: {
        'User-Agent': 'Aya 1.0.0',
        'X-BSER-AuthProvider': this._config.authProvider,
        'X-BSER-SessionKey': 'Session:' + this._token.replace('Session:', ''),
        'X-BSER-Version': this._config.gameVersion,
        'X-BSER-Replay-Version': this._config.replayVersion
      }
    })
  }

  private handleExceptions(response: any): (AyaError | undefined) {
    if (response?.cod < 1000 || response.length == 0) return;

    this._debug ? console.error('[Client | Debug] -> ', response) : null;

    const { cod, message } = AyaError.listExceptions(response?.cod);
    throw new AyaError({ cod, message });
  }

  protected updateHeaders(k: string, v: string): string {
    return this._instance.defaults.headers[k] = v;
  };

  protected async instance(settings: ClientSettings): Promise<any> {
    try {
      const body = settings.body ?? {};
      const response = await this._instance[settings.method](settings.endpoint, body);

      this.handleExceptions(response.data);

      return response.data?.rst ?? response.data;
    } catch (e: any) {
      console.error('[Client] -> %s', e);
    }
  }

}