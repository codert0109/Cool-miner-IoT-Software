import { LangStore } from './lang';
import { GodStore } from './god';
import { UserStore } from './user';
import { AuthStore } from './auth';
import { NFTStore } from './nft';
import { TokenStore } from './token';
import { StakeStore } from './stake';

export default class RootStore {
  lang = new LangStore();
  god = new GodStore(this);
  user = new UserStore(this);
  auth = new AuthStore(this);
  nft = new NFTStore(this);
  token = new TokenStore(this);
  stake = new StakeStore(this);
}