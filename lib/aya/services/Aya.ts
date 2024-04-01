import ENDPOINT from '@aya/utils/endpoints';
import Client from '@aya/services/Client'
import { Character } from '@aya/enum/Character';
import Nina, { BuildInfo } from '@nina/services/Nina';
import { GameStatus } from '@aya/enum/GameStatus';
import BODY from '@aya/utils/body';
import { WeaponRoute, WeaponRouteCount } from '@aya/types/Body';

export default class Aya extends Client {

  public async userProfile(): Promise<any> {
    return await this.instance({ method: 'get', endpoint: ENDPOINT.LOBBY });
  }

  public async changeNickname(userName: string): Promise<any> {
    BODY.NICKNAME.newNickname = userName;
    return await this.instance({ method: 'post', endpoint: ENDPOINT.NICKNAME, body: BODY.NICKNAME });
  }

  public async weaponRouteLike(buildId: number): Promise<void> {
    const { characterCode, slotId } = await Nina.weaponRoute(buildId) as BuildInfo;
    const build: WeaponRoute = { characterCode, likeType: 1, slotId };
    setInterval(async () => await this.instance({ method: 'post', endpoint: ENDPOINT.WEAPONROUTE, body: build }), 1000);
  }

  public async addRecommendWeaponRouteCount(buildId: number): Promise<void> {
    const { characterCode, slotId } = await Nina.weaponRoute(buildId) as BuildInfo;
    const build: WeaponRouteCount = { characterCode, recommendWeaponRouteId: buildId, order: slotId, slotId };
    setInterval(async () => await this.instance({ method: 'post', endpoint: ENDPOINT.WEAPONROUTECOUNT, body: build }), 1000);
  }

  public async savedPlan(userName: string, character: Character): Promise<any> {
    const userNum = await Nina.userNum(userName);
    return await this.instance({ method: 'get', endpoint: `${ENDPOINT.SAVEDPLAN}?userNum=${userNum}&characterCode=${character}` });
  }

  public async massReport(userName: string, gameId: number): Promise<void> {
    const userNum = await Nina.userNum(userName);
    const body = BODY.REPORT;

    body.gameId = gameId;
    body.reportedNickname = userName;
    body.reportedUserNum = userNum!;

    setInterval(async () => await this.instance({ method: 'post', endpoint: ENDPOINT.REPORT, body }), 1000);
  }

  public async playerStatus(gamestatus: GameStatus) {
    const userCode = this.userProfile();
    const body = { userCode, gamestatus };
    return await this.instance({ method: 'post', endpoint: ENDPOINT.PLAYERSTATUS, body });
  }
}