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

export interface CommunityItem {
  activeId: string;
  name: string;
}

export interface PostTyping {
  id: string;
  message: string;
  file: string;
  isMuted: boolean;
  communityId: string;
  createdDate: string;
  updatedDate: string;
  user: {
    firstName: string;
    lastName: string;
    nickname: string;
    verifiedAsHost: boolean;
    role: string;
    picture: string;
    isNickname: boolean;
  };
  downvotes: number;
  upvotes: number;
  threads: number;
}