export type Sender = 'user' | 'bot';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isSearching?: boolean;
  searchStatus?: string;
  citations?: string[];
  source?: 'kb' | 'atlas-connect';
}

export interface BotResponse {
  text: string;
  citations: string[];
}
