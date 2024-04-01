import { BuildOrder } from "@aya/enum/BuildOrder";
import { Character } from "@aya/enum/Character";

export type Nickname = {
    productId: string;
    salePurchase: boolean;
    newNickname: string;
}

export type WeaponRoute = {
    characterCode: number;
    likeType?: number;
    slotId: BuildOrder;
}

export type WeaponRouteCount = {
    characterCode: Character,
    recommendWeaponRouteId: number;
    order: BuildOrder;
    slotId?: number;
}

export type Report = {
    reportType: string;
    reportedUserNum: number;
    reportedNickname: string;
    gameId: number;
    reason: string;
    matchingTeamMode: string
}

export type Body = {
    NICKNAME: Nickname;
    WEAPONROUTE: WeaponRoute;
    WEAPONROUTECOUNT: WeaponRouteCount;
    REPORT: Report
}