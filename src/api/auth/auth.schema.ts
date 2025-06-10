import { UserType } from "../user/user.schema";

export type SignUserType = {
  accessToken: string;
  refreshToken: string;
  user: UserType;
};

export type SignUpRequest = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export type SignUpResponse = SignUserType;

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = SignUserType;

export type RefreshTokenRequest = { refreshToken: string };

export type RefreshTokenResponse = { accessToken: string };

export type OAuthSignInRequest = {
  state: string;
  redirectUri: string;
  token: string;
};

export type OAuthSignInResponse = SignUserType;

export type Message = { message: string };
