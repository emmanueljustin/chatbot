import Message from "@/interfaces/message";
import { useEffect, useState } from "react";

interface Props {
  convHistory: Message[];
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
      if (latestMessage.from === 'bot') {
        const extracted = extractCode(latestMessage.message);
        setExtractedCode(extracted);
      }
    }
  }, [props.convHistory]);

  return extractedCode;
}

export default useCodeExtractor;