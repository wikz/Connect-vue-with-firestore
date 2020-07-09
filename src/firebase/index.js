import firebase from 'firebase/app'
import 'firebase/firestore'
import config from './config';

const db = firebase.initializeApp({ projectId: config.projectId }).firestore();

export default db; 