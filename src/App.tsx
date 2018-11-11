import * as React from 'react';
import { Provider, Subscribe } from 'unstated';
import { BrowserRouter } from 'react-router-dom';
import { User } from './api/types';
import * as userStore from './store/user';
import store from './store';
import Login from './pages/Login';
import TweetPage from './pages/TweetPage';

type Props = {
  user: User[];
};

class App extends React.Component<Props> {
  render(){
    const { user } = this.props;
    if(!user.length){
      return (
        <Login history={history}/>
      );
    }
    return (
      <BrowserRouter>
        <Provider inject={store}>
          <TweetPage history={history} />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default () => (
  <Subscribe to={[userStore.UserContainer]}>
    {(user: userStore.UserContainer) => <App user={userStore.getUserState(user.state)} />}
  </Subscribe>
);
