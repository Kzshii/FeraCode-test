import { Container } from 'unstated';
import { User } from '../api/types';
import { values, prop } from 'ramda';
import { createSelector } from 'reselect';
import { saveState, loadState } from './statePersistence';

interface State {
  user: {
    [props: string]: User;
  };
}

const NAME = 'user';

export class UserContainer extends Container<State> {
  constructor() {
    super();
    this.asyncState();
    const persistedState = loadState(NAME);
    this.state = (persistedState as State) || { user: {} };
  }
  private saveState = () => saveState(NAME, this.state);
  private asyncState = async () => {
    const asyncLoadState = await loadState(NAME) as State | void;
    await this.setState((state) => ({ ...state, ...asyncLoadState }));
  };

  public loginUser = (
    username: string,
    password: string,
  ) => {
    const userInfo: User = {
      id: new Date().toISOString(),
      username,
      password,
    };
    this.setState((state) => ({ user: { ...state.user, [userInfo.id!]: userInfo } }), this.saveState);
  };

  public updateUserIntro = (
    userId: string,
    intro: string,
  ) => {
    this.setState((state) => ({ user: { [userId]: { ...state.user[userId], intro } } }), this.saveState);
  }

  public updateUserName = (
    userId: string,
    username: string,
  ) => {
    this.setState((state) => ({ user: { [userId]: { ...state.user[userId], username } } }), this.saveState);
  }
  public uploadImage = async(
    userId: string,
    field: string,
    image: string
  ) => {
    this.setState((state) => ({ user: { [userId]: { ...state.user[userId], [field]: image } } }), this.saveState);
  };

}

export const getUserState = createSelector<State, State['user'], User[]>(prop('user'), values);

export const getUser = (state: State): User | undefined => state.user;

export const getOneById = (state: State, id: string): User | undefined => state.user[id];
