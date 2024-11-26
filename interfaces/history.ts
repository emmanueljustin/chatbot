import MessageHistory from "./message-history";

export default interface History {
  uid: string;
  chatTitle: String;
  history: MessageHistory[]
}