
'use server';

import { db } from '@/lib/firebase/config';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import type { Award, Event, ContactMessage } from '@/lib/types';

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
