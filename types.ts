
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Chapter {
  id: number;
  title: string;
  sections: string[];
}
