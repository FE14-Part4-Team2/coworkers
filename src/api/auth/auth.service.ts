import { api } from "../api";
import {
  OAuthSignInRequest,
  OAuthSignInResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "./auth.schema";

const PATH = "/auth";

class AuthService {
  signUp(body: SignUpRequest) {
    return api.post<SignUpResponse>(`${PATH}/signUp`, body);
  }
  signIn(body: SignInRequest) {
    return api.post<SignInResponse>(`${PATH}/signIn`, body);
  }
  refreshToken(body: RefreshTokenRequest) {
    return api.post<RefreshTokenResponse>(`${PATH}/refresh-token`, body);
  }
  kakaoSignIn(body: OAuthSignInRequest) {
    return api.post<OAuthSignInResponse>(`${PATH}/signIn/KAKAO`, body);
  }
}

export const authService = new AuthService();
