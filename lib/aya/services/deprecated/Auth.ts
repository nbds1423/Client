import Client from '@aya/services/Client';
import ENDPOINTS from '@aya/utils/endpoints';

export default abstract class Auth extends Client {

  private readonly _payload = {
    "alc": "en",
    "ap": this._config.authProvider,
    "dlc": "pt",
    "glc": "ko",
    "idt": process.env.BEARER,
    "la": 2,
    "mn": process.env.DEVICE,
    "prm": {
      "authorizationCode": process.env.BEARER
    },
    "ver": this._config.gameVersion
  }

  public async authenticate(): Promise<string> {
    const token = await this.instance({ method: 'post', endpoint: ENDPOINTS.AUTHENTICATE, body: this._payload });
    return token;
  }

  private async renewalSession(): Promise<void> {
    this.instance({ method: 'post', endpoint: ENDPOINTS.RENEWALSESSION })
      .then(r => console.log(r.data))
      .catch(e => console.error(e.response));
  }

}