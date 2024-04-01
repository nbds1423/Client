import NinaError, { Errors } from '@nina/errors/Base';
import ENDPOINTS from '@nina/utils/endpoints';
import axios from 'axios';

export interface BuildInfo {
  id: number;
  characterCode: number;
  userNum: number;
  slotId: number;
}

export default class Nina {

  private static _instance = axios.create({
    baseURL: 'https://open-api.bser.io/v1',
    headers: {
      'x-api-key': Bun.env.TOKEN ? Bun.env.TOKEN : '',
    }
  })

  public static async userNum(userName: string): Promise<number | undefined> {
    try {
      const { data } = await this._instance.get(`${ENDPOINTS.GETUSERNUM}?query=${userName.trim()}`);
      if (data?.code !== 200) throw new NinaError({ cod: 404, message: Errors.PlayerNotFound });
      return data.user.userNum;
    } catch (e: any) {
      console.error('[Nina] -> %s', e);
    }
  }

  public static async weaponRoute(buildId: number): Promise<BuildInfo | undefined> {
    try {
      const response = await this._instance.get(`${ENDPOINTS.WEAPONROUTES}/${buildId}`);
      if (response.data?.code !== 200) throw new NinaError({ cod: 404, message: Errors.BuildNotFound });

      const data: BuildInfo = response.data.result.recommendWeaponRoute;
      return data;
    } catch (e: any) {
      console.error('[Nina] -> %s', e);
    }
  }

}