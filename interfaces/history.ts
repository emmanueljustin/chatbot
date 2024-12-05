import MessageHistory from "./message-history";

export default interface History {
  from?: string;
  uid: string;
  chatTitle: string;
  history: MessageHistory[]
}