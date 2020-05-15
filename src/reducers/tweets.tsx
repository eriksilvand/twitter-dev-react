import { ProfileType } from "./profile";

export type TweetType = {
  id?: number,
  Profile: ProfileType,
  message: string,
  media?: any,
  updatedAt?: string,
  like?: boolean,
  retweet?: boolean,
  comments?: Array<CommentType>
}

type CommentType = {
  profile: ProfileType,
  message: string,
  media?: any,
  updatedAt: string,
  like: boolean,
  retweet: boolean
}

const initialState: Array<TweetType> = [];

export default (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TWEET":
      return [action.tweet, ...state];
    case "SET_TWEETS":
      return [...action.tweets];
    case "REMOVE_TWEET":
      return state.filter(item => item.id !== action.tweet.id);
    default:
      return [...state]
  }
}