import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation CreateChat ($name: String!) {
    insert_chats_one(object: {
      name: $name
    }) {
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation send_message($chat_id: uuid!, $content: String!, $role: String!, $accessToken: String!) {
    send_message(chat_id: $chat_id, content: $content, role: $role, accessToken: $accessToken) {
      id
    }
  }
`;