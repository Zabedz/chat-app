export interface User {
  id: string;
  username: string;
}

export interface ChatRoom {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  chatRoomId: string;
}
