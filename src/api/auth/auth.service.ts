import { authApi } from "../auth-fetcher";
import { api } from "../fetcher";
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
    return authApi.post<SignUpResponse>(`/sign-up`, body);
  }
  signIn(body: SignInRequest) {
    return authApi.post<SignInResponse>(`/sign-in`, body);
  }
  refreshToken(body: RefreshTokenRequest) {
    return api.post<RefreshTokenResponse>(`${PATH}/refresh-token`, body);
  }
  kakaoSignIn(body: OAuthSignInRequest) {
    return authApi.post<OAuthSignInResponse>(`/kakao`, body);
  }
  signOut() {
    return authApi.post("/sign-out", undefined);
  }
}

export const authService = new AuthService();
