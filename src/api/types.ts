export type Tweets = Partial<{
  id: string;
  tweet: string;
}>;

export type ListOfTweets = Partial<{
  tweets: Tweets[];
}>;

export type User = Partial<{
  id: string,
  username: string;
  password: string;
  cover: string;
  avatar: string;
  intro: string;
}>;
