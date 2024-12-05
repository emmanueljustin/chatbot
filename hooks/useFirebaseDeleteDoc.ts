import { useState } from "react";
import { db } from "../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { EventStatus } from "@/enums/status";
 
interface Props {
  collectionName: string;
  docId: string;
}

const useFirebaseDeleteDoc = ({ collectionName, docId }: Props) => {

  const [status, setStatus] = useState<EventStatus>(EventStatus.initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteDocument = async () => {
    setStatus(EventStatus.loading);
    setError(null);
    setSuccess(false);

    try {
      const documentRef = doc(db, collectionName, docId);

      await deleteDoc(documentRef);

      setSuccess(true);
      setStatus(EventStatus.success);
      console.log('Document successfully deleted!');
    } catch (err) {
      setError('Error deleting document: ' + (err instanceof Error ? err.message : err));
      setStatus(EventStatus.failed);
      console.error('Error deleting document: ', err);
    }
  };
  
  return { deleteDocument, status, success, error };
}
 
export default useFirebaseDeleteDoc