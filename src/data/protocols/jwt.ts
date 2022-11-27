export interface IJwt {
  sign(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
