export interface UserChatItem {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string | null;
  verifiedAsHost: boolean;
  role: string;
  picture: string | null;
}

export interface ChatItem {
  id: string;
  lastMessage: string;
  isArchived: boolean;
  read: boolean;
  createdDate: string;
  initiator: {
    id: string;
    firstName: string;
    lastName: string;
    nickname: string;
    verifiedAsHost: boolean;
    role: string;
    picture: string;
  };
  chatBuddy: {
    id: string;
    firstName: string;
    lastName: string;
    nickname: string | null;
    verifiedAsHost: boolean;
    role: string;
    picture: string | null;
  };
}

export interface ChatItem2 {
  id: string;
  message: string;
  isArchived: boolean;
  read: boolean;
  createdDate: string;
  chat: {
    createdDate: string;
    id: string;
    isArchived: boolean;
    lastMessage: string;
    read: boolean;
    updatedDate: string;
  };
  initiator: {
    id: string;
    firstName: string;
    lastName: string;
    nickname: string;
    verifiedAsHost: boolean;
    role: string;
    picture: string;
  };
  chatBuddy: {
    id: string;
    firstName: string;
    lastName: string;
    nickname: string | null;
    verifiedAsHost: boolean;
    role: string;
    picture: string | null;
  };
}

export interface UserChatInfo {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string | null;
  verifiedAsHost: boolean;
  role: string;
  picture: string | null;
}

export interface ChatUserItem {
  page: number;
  activeId: string;
  user: UserChatInfo;
  chats: ChatItem2[];
}

export interface ChatStoreItem {
  host: ChatUserItem;
  guest: ChatUserItem;
}

export interface CommunityItemTyping {
  id: string;
  name: string;
  icon: string;
  isDisclosed: boolean;
  type: string;
  createdDate: string;
  updatedDate: string;
}

export interface CommunityItem {
  communities: CommunityItemTyping[];
  activeId: string;
  name: string;
}

export interface PollQuestion {
  createdDate: string;
  deletedDate: string | null;
  expiryDate: string;
  id: string;
  multipleVote: boolean;
  options: string[];
  postId: string;
  question: string;
  updatedDate: string;
  voteResults: {
    myVote: boolean;
    option: string;
    percentage: number;
    total: number;
  }[];
}

export interface QuizQuestion {
  createdDate: string;
  deletedDate: string | null;
  expiryDate: string;
  id: string;
  multipleVote: boolean;
  options: string[];
  postId: string;
  question: string;
  updatedDate: string;
  rightAnswer: string;
  attemptResults: {
    myAttempt: boolean;
    option: string;
    percentage: number;
    total: number;
  }[];
}

export interface PostTyping {
  id: string;
  message: string;
  file: string;
  isMuted: boolean;
  communityId: string;
  createdDate: string;
  updatedDate: string;
  myReaction?: string;
  pollQuestion?: PollQuestion;
  quizQuestion?: QuizQuestion;
  user: {
    firstName: string;
    lastName: string;
    nickname: string;
    verifiedAsHost: boolean;
    role: string;
    picture: string;
    isNickname: boolean;
    id: string;
    reviews: [];
    favTeam: string;
    bio: string;
  };
  downvotes: number;
  upvotes: number;
  threads: number;
}

export interface CommentItem {
  createdDate: string;
  downvotes: number;
  id: string;
  message: string;
  postId: string;
  published: boolean;
  totalReplies: number;
  updatedDate: string;
  upvotes: number;
  user: {
    avgRating: null;
    firstName: string;
    id: string;
    isNickname: boolean;
    lastName: string;
    nickname: string;
    picture: string;
    reviews: string[];
    role: string;
    totalReviews: number;
    verifiedAsHost: boolean;
    favTeam: string;
    bio: string;
  };
  userId: string;
}