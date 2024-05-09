export interface AuthInputTyping {
  email: string;
  password: string;
  confirm_password?: string;
}

export interface ChangePasswordInputTyping {
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface UserItem{
  id: string
  firstName: string
  lastName: string
  nickname: string | null
  email: string
  phone: string
  isActive: boolean
  verifiedAsHost: boolean
  isSuspended: boolean
  role: string[]
  picture: string
  address: string
  state:string
  country: string
  facebookUrl: string
  twitterUrl: string
  linkedinUrl: string
  instagramUrl: string
  governmentID: string
  bio: string
  dob: string
  roomPicture: string
  createdDate: string
}