export interface AuthorizationJwt {
  id: string;
  username: string;
  email: string;
  group: string;
  branch_id: string;
  company_id: string;
  key_token: string;
  iat: number;
  exp: number;
}
