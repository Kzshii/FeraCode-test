import * as tweetsStore from './tweets';
import * as userStore from './user';

export default [
  new tweetsStore.TweetsContainer(),
  new userStore.UserContainer(),
] as [
  tweetsStore.TweetsContainer,
  userStore.UserContainer
];
