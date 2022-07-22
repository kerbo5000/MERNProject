const newsReducer = (state,action) => {
  if(action.type === 'ERROR'){
    return {...state,
            loading:false,
            error:action.payload}
  }
  if(action.type === 'LOADING'){
    return {...state,
            loading:true,
            error:''}
  }

  if(action.type === 'RESET'){
    return action.payload
  }
  if(action.type === 'SET_NEWS'){
    const {response,user} = action.payload
    const tempNews = response
        .map((article) => {
          if(article.likes.includes(user)){
            return {...article,liked:true}
          }else{
            return {...article,liked:false}
          }
        })
    return {...state,
            news:[...tempNews],
            loading:false,
          }
  }
  if(action.type === 'UPDATE_ARTICLE'){
    const {response,user} = action.payload
    const tempNews = state.news
      .map((article)=>{
      return article._id===response._id ? {...response,liked:response.likes.includes(user)} : article
    })
    return {news:tempNews,
            loading:false,
            error:'',
            success:true}
  }
  if(action.type === 'FILTER'){
    let tempNews
    const {inputRadio:filter,inputText:input} = action.payload
    switch(filter){
      case 'likes':
        tempNews = state.news
          .filter((article) => article.liked===true)
        break
      case 'username':
        tempNews = state.news
          .filter((article)=> article.username === input)
        break
      case 'title':
        tempNews = state.news
          .filter((article)=> article.title === input)
        break
    }
    return {news:tempNews,
            loading:false,
            error:'',
            success:true}
  }
  if(action.type === 'SORT'){
    let tempNews
    switch(action.payload.sort){
      case 'likes':
        tempNews = state.news
          .sort((a,b)=> b.likes.length - a.likes.length)
        break
    }
    return {news:tempNews,
            loading:false,
            error:'',
            success:true}
  }
  if(action.type === 'SCROLL_NEWS'){
    const {response,user} = action.payload
    const tempNews = response
        .map((article) => {
          if(article.likes.includes(user)){
            return {...article,liked:true}
          }else{
            return {...article,liked:false}
          }
        })
    const totalNews = [...state.news,...tempNews]
    return {news:totalNews,
            loading:false,
            nextPage:Boolean(response.length),
            error:''
          }
  }
}

export default newsReducer
