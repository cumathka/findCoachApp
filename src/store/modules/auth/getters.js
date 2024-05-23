export default {
    userId(state){
        return state.userId
    },
    token(state){
        return state.token
    },
    isAuthenticated(state){
        return !!state.token
    },
    userEmail(state) {
        return state.email;
    },
    didAutoLogout(state){
        return state.didAutoLogout
    }

};
