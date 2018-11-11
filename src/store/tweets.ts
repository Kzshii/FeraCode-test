import { Container } from 'unstated';
import { Tweets } from '../api/types';
import { values, prop } from 'ramda';
import { createSelector } from 'reselect';
import { saveState, loadState } from './statePersistence';

interface State {
  tweets: {
    [props: string]: Tweets;
  };
}

const NAME = 'tweets';

export class TweetsContainer extends Container<State> {
  constructor() {
    super();
    const persistedState = loadState(NAME);
    this.state = (persistedState as State) || { tweets: {} };
    this.asyncState();
  }
  private saveState = () => saveState(NAME, this.state);
  private asyncState = async () => {
    const asyncLoadState = (await loadState(NAME)) as State | void;
    await this.setState(
      (state) => ({ ...state, ...asyncLoadState })
    );
  };

  public createTweet = async (
    tweet: string
  ) => {
    const newTweet: Tweets = {
      id: new Date().toISOString(),
      tweet,
    };
    this.setState((state) =>
      ({ tweets: { [newTweet.id!]: newTweet, ...state.tweets } }), this.saveState
    );
  };
}

export const getEntities = createSelector<State, State['tweets'], Tweets[]>(prop('tweets'), values);

export const getOneById = (state: State, id: string): Tweets | undefined => state.tweets[id];
