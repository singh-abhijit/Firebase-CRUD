import { db } from "../firebase-config";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const legCollectionRef = collection(db, "legs");

class LegDataService {
  addLegs = (newLeg) => {
    return addDoc(legCollectionRef, newLeg);
  };

  updateLeg = (id, updatedLeg) => {
    const legDoc = doc(db, "legs", id);
    return updateDoc(legDoc, updatedLeg);
  };

  deleteLeg = (id) => {
    const legDoc = doc(db, "legs", id);
    return deleteDoc(legDoc);
  };

  getAllLegs = async () => {
    const response = await getDocs(legCollectionRef);
    return response.docs.map((doc) => ({ ...doc.data(), firebaseId: doc.id }));
  };
}

export default new LegDataService();
