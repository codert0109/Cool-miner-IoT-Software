import { LangStore } from './lang';
import { GodStore } from './god';
import { UserStore } from './user';
import { AuthStore } from './auth';
import { NFTStore } from './nft';
import { TokenStore } from './token';
import { StakeStore } from './stake';
import { CameraStore } from './camera';
import { RewardStore } from './reward';
import { ProfileStore } from './profile';
import { AlertStore } from './alert';

export default class RootStore {
  lang = new LangStore();
  god = new GodStore(this);
  user = new UserStore(this);
  auth = new AuthStore(this);
  nft = new NFTStore(this);
  token = new TokenStore(this);
  stake = new StakeStore(this);
  camera = new CameraStore(this);
  reward = new RewardStore(this);
  profile = new ProfileStore(this);
  alert = new AlertStore(this);
}