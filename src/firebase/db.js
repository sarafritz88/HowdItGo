import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, company ) =>
    db.ref(`users/${id}`).set({
        username,
        email,
        company,
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');