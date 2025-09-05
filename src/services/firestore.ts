
'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import type { Award, Event, ContactMessage } from '@/lib/types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


export async function getAwards(): Promise<Award[]> {
  const awardsCol = collection(db, 'awards');
  const q = query(awardsCol, orderBy('year', 'desc'));
  const awardsSnapshot = await getDocs(q);
  const awardsList = awardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Award));
  return awardsList;
}

export async function getPastEvents(): Promise<Event[]> {
  const eventsCol = collection(db, 'events');
  const q = query(eventsCol, orderBy('date', 'desc'));
  const eventsSnapshot = await getDocs(q);
  const eventList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  return eventList;
}

export async function saveContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<string> {
    const messagesCol = collection(db, 'contactMessages');
    const docRef = await addDoc(messagesCol, {
        ...message,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}
