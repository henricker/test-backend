export type AuthOptions = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
  user: {
    email: string;
    username: string;
  };
};

export interface IAuthUseCase {
  execute(options: AuthOptions): Promise<AuthResult>;
}
