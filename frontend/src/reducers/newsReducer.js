const newsReducer = (state,action) => {
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

  if(action.type === 'RESET'){
    return action.payload
  }
  if(action.type === 'SET_NEWS'){
    return {news:action.payload,
            loading:false,
            error:'',
            success:true}
  }
  if(action.type === 'LIKE_COMMENT_NEWS'){
    const tempNews = state.news
      .map((article)=>{
      return article._id===action.payload._id ? action.payload : article
    })
    return {...state,
            news:tempNews,
            loading:false,
            error:'',
            success:true}
  }

}

export default newsReducer
