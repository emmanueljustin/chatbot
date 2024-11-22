import MessageHistory from "@/interfaces/message-history";
import { useEffect, useState } from "react";

interface Props {
  convHistory: MessageHistory[];
}

const extractCode = (extract: string): string[] => {
  const regex = /```(.*?)```/gs;
  const matches: string[] = [];
  let match;

  while ((match = regex.exec(extract)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
};

const useCodeExtractor = (props: Props) => {
  const [extractedCode, setExtractedCode] = useState<string[]>([]);

  useEffect(() => {
    if (props.convHistory.length > 0) {
      const latestMessage = props.convHistory[props.convHistory.length - 1];
      if (latestMessage.role === 'model') {
        const extracted = extractCode(latestMessage.parts[0].text);
        setExtractedCode(extracted);
      }
    }
  }, [props.convHistory]);

  return extractedCode;
}

export default useCodeExtractor;