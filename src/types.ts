interface Result {
  uid: string;
  thumbnail: string;
  readyToStream: boolean;
  meta: {
    name: string;
  };
  status: {
    state: 'ready' | 'inprogress' | 'error' | 'live-inprogress';
  };
  duration: number;
  input: {
    width: number;
    height: number;
  };
  created: string;
}

export interface ClodFLareResponse {
  result: Result[];
  success: boolean;
  errors: any[];
  messages: any[];
}

export interface User {
  isLoggedIn: boolean;
}
