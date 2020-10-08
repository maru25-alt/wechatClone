import  {auth, db, storage, timestamp} from '../firebase';
import  firebase from 'firebase/firebase'
import {localStorageVariables} from '../localStorege';
import { v4 as uuidv4 } from 'uuid';
import router from '../../router/index'

const contacts = {
    state: {
        userDetails: null,
        currentUserDetails: null
    },
    mutations: {
        setUserDetails(state , payload){
            state.userDetails = payload
        },
        setCurrentUserDetails(state , payload){
            state.currentUserDetails = payload
        } 

    },
    getters:{
        getUserDetails(state){
            return state.userDetails
        },
        getCurrentUserDetails(state){
            return state.currentUserDetails
        }
    },
    actions:{
        getDetailsUser({commit}, payload){
           db.collection('users').doc(payload).get().then(doc => {
               const data = doc.data();
               commit('setUserDetails', data)
           })
           .catch(err =>{
               console.log(err)
           })
        },
        getCurrentDetailsUser({commit}, payload){
            db.collection('users').doc(payload).get().then(doc => {
                const data = doc.data();
                commit('setCurrentUserDetails', data)
            })
            .catch(err =>{
                console.log(err)
            })
         }

    }

}

export default contacts