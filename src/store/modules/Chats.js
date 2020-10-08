import Vue from 'vue';
import Vuex from 'vuex';
import  {auth, db, storage, timestamp} from '../firebase';
import  firebase from 'firebase/firebase'
import {localStorageVariables} from '../localStorege';
import { v4 as uuidv4 } from 'uuid';
import router from '../../router/index'


const  chats = {
    state: {
        chats: [],
        messages: [],
        chatUser: {},
        loading: false
    },
    mutations: {
        setLoading(state, payload){
         state.loading = payload
        },
        setUsers(state, payload){
            state.chats =  payload
        },
        setChatuser(state , payload){
            state.chatUser = payload
        },
        setMessages(state, payload){
           // console.log('new messages')
            state.messages = payload
        }
    },
    getters: {
        getChats(state ){
            return state.chats
        },
        getChatUser(state ){
            return state.chatUser
        },
        getMessages(state){
            return state.messages
        }
    },
    actions: {
        getUsers({commit}){
            commit('setLoading', true);
            const currentUserDoc = localStorage.getItem(localStorageVariables.userUID);
            db.collection('users')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snap => {
                var users = [];
               snap.forEach(doc => {
                    db.collection('users')
                    .doc(currentUserDoc)
                    .collection('chats')
                    .doc(doc.id)
                    .collection('messages')
                    .limit(1)
                    .orderBy('createdAt', 'desc')
                    .get()
                    .then(snap => {
                    var lastMessage = {}
                      snap.forEach(doc => {
                           //console.log(doc.data())
                            lastMessage  = doc.data();
                       });
                       users.push({id: doc.id,lastMessage, ...doc.data()})
                    })
                  // users.push({id: doc.id, ...doc.data()})
               })
               commit('setUsers', users)
            })
          
        },
       async getChatMessages({commit}, payload){
            const currentUserDoc = localStorage.getItem(localStorageVariables.userUID);
            console.log('messages collectes')
                db.collection('users')
                .doc(currentUserDoc)
                .collection('chats')
                .doc(payload)
                .collection('messages')
                .orderBy('createdAt', 'asc')
                .onSnapshot(snap => {
                   let messages = [];
                   snap.forEach(doc => {
                       messages.push({
                           ...doc.data(), id: doc.id
                       })
                   })
                   console.log(messages)
                   commit('setMessages' , messages)
                })

        },
     getCurrentChatUser({commit, state, dispatch}, payload){
            // const currentUserDoc = localStorage.getItem(localStorageVariables.userUID);
              const chatUser = state.chats.filter(chat => chat.id === payload);
              commit('setChatuser', chatUser);
              dispatch('getChatMessages', payload)
             
        },
       async sendMessage({commit}, payload){
            const currentUserDoc = localStorage.getItem(localStorageVariables.userUID);
            
            // let document = await db.collection('users')
            // .doc(currentUserDoc)
            // .collection('chats')
            // .doc(payload.docId)
            // .get();

            if(currentUserDoc === payload){
                console.log('me current')
                db.collection('users')
                    .doc(currentUserDoc)
                    .collection('chats')
                    .doc(payload.docId)
                    .collection('messages')
                    .add({
                        message: payload.message,
                        createdAt: timestamp(),
                        sender: true
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else{
                console.log('not current')
                db.collection('users')
                    .doc(currentUserDoc)
                    .collection('chats')
                    .doc(payload.docId)
                    .collection('messages')
                    .add({
                        message: payload.message,
                        createdAt: timestamp(),
                        sender: true
                    }).then(() =>{
                        db.collection('users')
                        .doc(payload.docId)
                        .collection('chats')
                        .doc(currentUserDoc)
                        .collection('messages')
                        .add({
                                message: payload.message,
                                createdAt: timestamp(),
                                sender: false  
                        })
                    }).catch(err => {
                        console.log(err)
                    })

            }

                
            

            
        }
    }
}



export {chats}