export default interface MessageHistory {
  role: string;
  parts: Parts[];
}

interface Parts {
  text: string;
}