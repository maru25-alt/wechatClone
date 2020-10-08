import Vue from 'vue';
import Vuex from 'vuex';
import {auth, db, storage, timestamp} from './firebase';
import firebase from './firebase'
import {localStorageVariables} from './localStorege';
import { v4 as uuidv4 } from 'uuid';
import router from '../router/index'
import {chats} from './modules/Chats';
import contacts from './modules/Contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    progress: false,
    notifications: [],
    defaultPhotoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsE7TXbRi1_Fl7bI1sgNvh357qgcrdnRlLJTZUAD10BQ&usqp=CAU&ec=45707743',
  },
  mutations: {
    setLoading(state, payload){
       state.loading = payload
    },
    setUser(state , payload){
        state.user = payload
    },
    setNotifications(state , payload){
      state.notifications.push(payload)
    },
    setRemoveNotifications(state){
      state.notifications = []
    },
    setProgress(state, payload){
      state.progress = payload
    },
    setUpdateProfile(state , payload){
        state.user.photoUrl = payload
    },
  },
  getters: {
     getLoading(state){
       return state.loading
     },
     getNotifications(state){
       return state.notifications
     },
     getDefaultPhotoUrl(state){
       return  state.defaultPhotoUrl;
     },
     getProgress(state){
       return state.progress;
     }
  },
  actions: {
      SignupUserwithGoogle({commit}){
          commit('setLoading', true);
          commit('setRemoveNotifications')
          var provider = new firebase.auth.GoogleAuthProvider();
          auth.signInWithPopup(provider).then((res) => {
               var user = res.user;
               db.collection('users').doc(user.uid).set({
                id: user.uid,
                wechatId: user.uid,
                username: user.displayName,
                photoUrl: user.photoURL,
                email: user.email,
                telephone: user.phoneNumber,
                createdAt: timestamp(),
                firstName: '',
                lastName: '',
                region: '',
               }).then( (doc) => {
                   commit('setUser' , {
                    id: user.uid,
                    wechatId: user.uid,
                    username: user.displayName,
                    photoUrl: user.photoURL,
                    email: user.email,
                   });
                   commit('setLoading', false);
                   localStorage.setItem(localStorageVariables.userUID, user.uid);
                   localStorage.setItem(localStorageVariables.userWechatID, user.uid);
                   localStorage.setItem(localStorageVariables.userEmail, user.email);
                   localStorage.setItem(localStorageVariables.userPhotoUrl, user.photoURL);  
                   localStorage.setItem(localStorageVariables.username, user.displayName); 
                  
                   localStorage.setItem(localStorageVariables.userDocID, user.uid);
                   router.push('/');  
               })
          }).catch((err) => {
            commit('setLoading', false);
              commit('setNotifications' , {
                type: "error",
                id: uuidv4(),
                message: err.message
              })
          })

      },
      SignUpWithEmail({commit}, payload){
        commit('setLoading', true);
        commit(' setRemoveNotifications')
         auth.createUserWithEmailAndPassword(payload.email, payload.password).then(res => {
          var user = res.user;
            db.collection('users').doc(user.uid).set({
              id: user.uid,
              wechatId: user.uid,
              username: payload.username,
              photoUrl: null,
              email: payload.email,
              telephone: '',
              createdAt: timestamp(),
              firstName: '',
              lastName: '',
              region: '',
           }).then( (doc) => {
               commit('setUser' ,{
                id: user.uid,
                wechatId: user.uid,
                username: payload.username,
                photoUrl: null,
                email: payload.email,
               });
               commit('setLoading', false);
               localStorage.setItem(localStorageVariables.userUID, user.uid);
               localStorage.setItem(localStorageVariables.userWechatID, user.uid);
               localStorage.setItem(localStorageVariables.userEmail, payload.email);
               localStorage.setItem(localStorageVariables.userPhotoUrl, user.null);  
               localStorage.setItem(localStorageVariables.username, payload.username); 
               localStorage.setItem(localStorageVariables.userDocID, user.uid);
               router.push('/');  
           })
         })
         .catch(err =>{
          commit('setLoading', false);
          commit('setNotifications' , {
            type: "error",
            id: uuidv4(),
            message: err.message
          })

         })
      },
      SignInWithGoogle({commit}){
        commit('setRemoveNotifications')
        commit('setLoading', true);
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(res => {
          console.log(res)
           var user = res.user;
           db.collection('users')
           .doc(user.uid)
           //.where('id', '==', user.uid)
           .get()
           .then((snap) => {
                const data = snap.data();
                console.log(data)
                const newUser = {
                  id: user.uid,
                  wechatId: data.wechatId,
                  username: data.displayName,
                  photoUrl: data.photoURL,
                  email: data.email,
                 };
                 commit('setUser', newUser);
                 commit('setLoading', false);
                 localStorage.setItem(localStorageVariables.userUID, user.uid);
                 localStorage.setItem(localStorageVariables.userWechatID, data.wechatId);
                 localStorage.setItem(localStorageVariables.userEmail, data.email);
                 localStorage.setItem(localStorageVariables.userPhotoUrl, data.photoUrl);  
                 localStorage.setItem(localStorageVariables.username, data.username); 
                 localStorage.setItem(localStorageVariables.userDocID, user.uid);
                 router.push('/');   
              
           })
        }).catch(err =>{
          commit('setLoading', false);
          commit('setNotifications' , {
            type: "error",
            id: uuidv4(),
            message: err.message
          })

         })
      },
     SignInwithEmail({commit}, payload){
        commit('setLoading', true);
        commit(' setRemoveNotifications');
        auth.signInWithEmailAndPassword(payload.email, payload.password).then( (res) => {
           var user =  res.user;
           console.log(user.uid)
           db.collection('users')
           .doc(user.uid)
           //.where("id" , "==", user.uid)
           .get()
           .then(snap => {
                const data = snap.data();
                console.log(doc)
                const newUser = {
                  id: user.uid,
                  wechatId: data.wechatId,
                  username: data.displayName,
                  photoUrl: data.photoURL,
                  email: data.email,
                 };
                 commit('setUser', newUser);
                 commit('setLoading', false);
                 localStorage.setItem(localStorageVariables.userUID, data.id);
                 localStorage.setItem(localStorageVariables.userWechatID, data.wechatId);
                 localStorage.setItem(localStorageVariables.userEmail, data.email);
                 localStorage.setItem(localStorageVariables.userPhotoUrl, data.photoURL);  
                 localStorage.setItem(localStorageVariables.username, data.username); 
                 localStorage.setItem(localStorageVariables.userDocID, doc.id);
                 router.push('/');  
           })
           .catch(err =>{
            commit('setLoading', false);
            commit('setNotifications' , {
              type: "error",
              id: uuidv4(),
              message: err.message
            })
  
           })
        }) 
        .catch(err =>{
           commit('setLoading', false);
           commit('setNotifications' , {
            type: "error",
            id: uuidv4(),
            message: err.message
          })

         })
      },
      SignOut({commit}){
        auth.signOut().then(() => {
          localStorage.clear();
          commit('setUser', null);
          router.push('/account');
        })
      },
      autoSignin({commit}){
       const userUID =  localStorage.getItem(localStorageVariables.userUID);
       const userWechatId =   localStorage.getItem(localStorageVariables.userWechatID);
       const email =  localStorage.getItem(localStorageVariables.userEmail);
       const photoUrl =   localStorage.getItem(localStorageVariables.userPhotoUrl);  
       const username =  localStorage.getItem(localStorageVariables.username); 
       const docId =  localStorage.getItem(localStorageVariables.userDocID);
       const newUser = {
        id: userUID,
        wechatId:userWechatId,
        username: username,
        photoUrl:photoUrl,
        email: email,
        docId: docId
       };
       commit('setUser', newUser);
      },

      uploadProfileUrl({commit}, payload){
         const uploadTask = storage.ref(`/users/${payload.name}`);
         uploadTask.put(payload).on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress)
             commit('setProgress', true)
         }, err => {
           console.log(err.message)
         }, async() => {
           const url =  await uploadTask.getDownloadURL();
           const docId = localStorage.getItem(localStorageVariables.userUID);
           const currentUser =  auth.currentUser;
           if(currentUser){
             currentUser.updateProfile({
               photoURL: url
             })
             db.collection("users").doc(docId).update({
              photoUrl : url
            });
            localStorage.setItem(localStorageVariables.userPhotoUrl, url)
            commit('setProgress', false);
            commit('setUpdateProfile', url) 
           }
          
         })
      },
      updateUserData({commit}, payload){
        console.log('loading')
        commit('setProgress', true);
        const docId = localStorage.getItem(localStorageVariables.userUID)
        const currentUser =  auth.currentUser;
        if(currentUser){
          currentUser.updateProfile({
            displayName: payload.username
          })
        }
        db.collection("users").doc(docId).update({
           username: payload.username,
           wechatId: payload.wechatId,
           username: payload.username,
           email: payload.email,
           firstName: payload.firstName,
           lastName: payload.lastName,
           region: payload.region,
        }).then(res => {
          localStorage.setItem(localStorageVariables.userWechatID, payload.wechatId);
          localStorage.setItem(localStorageVariables.userEmail, payload.email);
          localStorage.setItem(localStorageVariables.username, payload.username); 
          commit('setProgress', false);
          commit('setNotifications' , {
            type: "success",
            id: uuidv4(),
            message: "Successfully Updated"
          })
        }).catch(err => {
          console.log(err)
          commit('setNotifications' , {
            type: "error",
            id: uuidv4(),
            message: "Failed to update"
          })
          commit('setProgress', false);
        });
      }
     
  },
  modules: {
    chats,
    contacts
  }
})
