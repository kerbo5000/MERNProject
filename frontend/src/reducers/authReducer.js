const authReducer = (state,action) => {
  if(action.type === 'REGISTER'){
    return {...state,
            loading:false,
            success:true,
            error:''}
  }
  if (action.type === 'LOGIN'){
    return {loading:false,
            user:action.payload.user,
            accessToken:action.payload.accessToken,
            roles:action.payload.roles,
            success:true,
            error:'',
            id:action.payload.id
          }
  }
  if(action.type === 'ERROR'){
    return {...state,
            loading:false,
            success:false,
            error:action.payload}
  }
  if(action.type === 'LOADING'){
    return {...state,
            loading:true}
  }
  if(action.type === 'REFRESH_ACCESS_TOKEN'){
    return {...state,
            accesToken:action.payload}
  }
  if(action.type === 'RESET'){
    return action.payload
  }
}

export default authReducer
