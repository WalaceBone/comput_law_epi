export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface BritishTerritoryResponse {
  territory: string[];
}

export interface AvailableRulesResponse {
  rules: string[];
}

export interface MessageReply {
  message: string;
}
