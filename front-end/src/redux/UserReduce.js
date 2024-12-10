const userData = JSON.parse(localStorage.getItem("userData")) || null

export const userReducer = (state=userData,action) => {
    switch(action.type){
        case "SET_USER_DATA":
            state = action.userData;
            localStorage.setItem("userData",JSON.stringify(action.userData))
            return state;
            
        default:
            return state;
    }
}