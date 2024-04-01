export interface Config {
  gameVersion: string;
  replayVersion: string;
  authProvider: string
}

const CONFIG: Config = {
  gameVersion: '1.17.0',
  replayVersion: '1.17.0',
  authProvider: 'STEAM'
}

export default CONFIG;