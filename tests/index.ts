import Aya from "@aya/services/Aya"

(async () => {
    const aya = new Aya({ token: Bun.env.BEARER as string, debug: false });
    const profile = await aya.userProfile();
    //console.log(profile)
})()