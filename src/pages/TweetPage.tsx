import * as React from 'react';
import { Subscribe } from 'unstated';
import camera from '../media/camera-icon.png';
import avatarIcon from '../media/avatar-icon.png';
import galaxy from '../media/cover.jpg';
import Image from '../components/Image';
import * as tweetsStore from '../store/tweets';
import * as userStore from '../store/user';
import { formatDate } from '../utils/date';

import { User, Tweets } from '../api/types';
import Tweet from '../components/Tweet';
import Input from '../components/Input';
import Button from '../components/Button';

type Props = {
  history: any;
  postReceipts?: Function;
  createTweet: tweetsStore.TweetsContainer['createTweet'];
  userAvatar: userStore.UserContainer['uploadImage'];
  updateUserIntro: userStore.UserContainer['updateUserIntro'];
  updateUserName: userStore.UserContainer['updateUserName'];
  tweet: Tweets[];
  user: User[];
};

type State = {
  newTweet: string;
  cover: string;
  avatar: string;
  error: string;
  userName: String;
  intro: String;
};

class TweetPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    avatar: '',
    cover: '',
    newTweet: '',
    error: '',
    userName: '',
    intro: '',
    userId: ''
  };

  componentDidMount(){
    const { user } = this.props;
    this.setState((state) => ({
      ...state,
      userId: user[0].id,
      avatar: user[0].avatar!,
      cover: user[0].cover!,
      userName: user[0].username!,
      intro: user[0].intro!
    }));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { user, updateUserIntro, updateUserName } = this.props;
    const { userName, intro, userId } = this.state;
    if (prevProps.user !== user) {
      this.setState((state) => ({
        ...state,
        userId: user[0].id,
        avatar: user[0].avatar!,
        cover: user[0].cover!,
        userName: user[0].username!,
        intro: user[0].intro!
      }));
    }
    if ((prevState.intro !== intro) && userId){
      updateUserIntro(userId, intro);
    }
    if ((prevState.userName !== userName) && userId){
      updateUserName(userId, userName);
    }
  }

  private handleChange = (field: keyof State, value: string): void => {
    this.setState((state) => ({ ...state, [field]: value }));
  };

  private handleImage = (field: keyof State, event: any):void => {
    event.persist();
    const { user , userAvatar} = this.props;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        if (e.target) {
          this.setState((state) => ({
            ...state,
            [field]: e.target!.result
          }), () => {
            userAvatar(user[0].id!, field, this.state[field])
          });
        }
      };
    }
  };

  public handleSubmit = (e: any): void => {
    e.preventDefault();
    const { newTweet } = this.state;
    if (!Boolean(newTweet)) return;
    this.props.createTweet(newTweet);
    this.setState({ newTweet: '' })
  };

  public render() {
    const {
      newTweet,
    } = this.state;
    const { tweet } = this.props;
    const avatar = this.state.avatar ? this.state.avatar : avatarIcon;
    const userName = this.state.userName ? this.state.userName : 'Unknown Jedi';
    const intro = this.state.intro ? this.state.intro : 'a long time ago in a galaxy far far away';
    const cover = this.state.cover ? this.state.cover : galaxy;
    return (
      <React.Fragment>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <Image image={cover} cover/>
              <div className='cover__upload'>
                <Image height={'48px'} width={'48px'} image={camera}/>
                <Input
                  type={'file'}
                  name={'file'}
                  accept={"image/*"}
                  onChange={(e) => this.handleImage('cover', e)}
                />
              </div>
              <div className="container">
                <div className="carousel-caption d-none d-md-block text-left">
                  <div className="button__upload">
                    <Image
                      image={avatar}
                      avatar
                      height={'150px'}
                      width={'150px'}
                    />
                    <Input
                      type={'file'}
                      name={'file'}
                      accept={'image/*'}
                      onChange={(e: any) => this.handleImage('avatar', e)}
                    />
                    
                  </div>
                  <Input
                    classe={'input'}
                    type={'text'}
                    onChange={(e: any) => this.handleChange('userName', e.target.value)}
                  />
                  <h1>{userName}</h1>
                  <Input
                    classe={'input'}
                    type={'text'}
                    onChange={(e: any) => this.handleChange('intro', e.target.value)}
                  />
                  <p>{intro}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="input-group">
          <textarea
            className="form-control z-depth-1"
            placeholder="Write something here..."
            value={newTweet}
            onChange={e => this.handleChange('newTweet', e.target.value)}
          ></textarea>
          <div className="input-group-append">
            <Button
              type={'button'}
              primary
              onClick={this.handleSubmit}
            >Tweet</Button>
          </div>
        </div>
        <hr className="featurette-divider"/>
        <div className="container marketing">
          {
            tweet.map(({ tweet, id }) => (
              <Tweet
                key={id}
                image={avatar}
                tweet={tweet}
                date={formatDate(id!)}
                userName={userName}
              />
            ))
          }
          <footer>
            <p className="float-right"><a href="#">Back to top</a></p>
            <p>&copy; 2018 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default ({ history }: Pick<Props, 'history'>) => (
  <Subscribe to={[tweetsStore.TweetsContainer, userStore.UserContainer]}>
    {(tweet: tweetsStore.TweetsContainer, user: userStore.UserContainer) => (
      <TweetPage
        user={userStore.getUserState(user.state)}
        userAvatar={user.uploadImage}
        tweet={tweetsStore.getEntities(tweet.state)}
        createTweet={tweet.createTweet}
        updateUserIntro={user.updateUserIntro}
        updateUserName={user.updateUserName}
        history={history}
      />
    )}
  </Subscribe>
);

