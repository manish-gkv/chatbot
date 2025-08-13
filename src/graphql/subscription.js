import { gql } from "@apollo/client";
export const CHAT_LIST = gql`
  subscription Chats {
    chats(order_by: { created_at: desc }) {
      id
      name
      created_at
    }
  }
`;

export const MESSAGES = gql`
  subscription Messages($chat_id: uuid!) {
    messages(where: { chat_id: { _eq: $chat_id } }, order_by: { created_at: asc }) {
      id
      content
      created_at
      role
    }
  }
`;