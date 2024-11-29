import MessageHistory from "@/interfaces/message-history";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

interface Props {
  collectionName: string;
  docId: string;
  history: MessageHistory[];
}

const useFirebaseUpdateDocs = ({ collectionName, docId, history }: Props) => {
  
  const [message, setMessage] = useState<string>('');

  const updateDocument = async () => {
    try {
      const documentRef = doc(db, collectionName, docId);

      await updateDoc(documentRef, {
        history: history,
      });

      console.log('Document successfully updated!');
      setMessage('Document successfully updated!');
    } catch (err) {
      console.error(err);
      setMessage('Error in updating document!');
    }
  }

  return { updateDocument, message }
}

export default useFirebaseUpdateDocs