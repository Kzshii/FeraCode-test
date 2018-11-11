import * as React from 'react';
// import classNames from 'classnames';
// import ImageComponent from '../components/Image';
import Button from '../components/Button';
import Input from '../components/Input';
import { Subscribe } from 'unstated';
import * as userStore from '../store/user';
import { User } from '../api/types';

type Props = {
  history: any;
  postUser?: Function;
  loginUser: userStore.UserContainer['loginUser'];
  user: User[];
};

type State = {
  username: string;
  password: string;
  error: string;
};

class LoginPage extends React.PureComponent<Props, State> {
  state = {
    username: '',
    password: '',
    error: ''
  };

  handleChange = (field: keyof State, value: string) => {
    this.setState((state) => ({ ...state, [field]: value }));
  };


  handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {
      username,
      password,
    } = this.state;
    if (!Boolean(username && password)) {
      this.setState((state) => ({
        ...state,
        error: 'username or password invalid'
      }));
      return;
    }
    this.props.loginUser(username, password);
  };

  public render() {
    const {
      username,
      password,
      error
    } = this.state;
    return (
      <div className='container login'>
        <form>
          <div className="form-group">
            <label>Username</label>
            <Input
              type="text"
              name="username"
              login
              value={username}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.handleChange('username', e.currentTarget.value)
              }
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <Input
              type="text"
              name="password"
              login
              value={password}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.handleChange('password', e.currentTarget.value)
              }
            />
          </div>
          <Button success block primary onClick={this.handleSubmit}>
            Sign In
          </Button>
          {error && <div className="alert alert-danger" role="alert">
            {error}
          </div>
          }
        </form>
      </div>

    );
  }
}

export default ({ history }: Pick<Props, 'history'>) => (
  <Subscribe to={[userStore.UserContainer]}>
    {(user: userStore.UserContainer) => (
      <LoginPage
        user={userStore.getUserState(user.state)}
        loginUser={user.loginUser}
        history={history}
      />
    )}
  </Subscribe>
);
