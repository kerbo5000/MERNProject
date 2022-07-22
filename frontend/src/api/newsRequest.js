const getNews = async (axiosPrivate,numPage,search,liked) => {
  const {inputRadio:filter,inputText:input} = search
  const response = await axiosPrivate.get(`/news?skip=${numPage*5}&limit=5&${filter}=${input}&likes=${liked}`)
  return response.data
}

const likeNews = async (axiosPrivate,id,type) => {
  const response = await axiosPrivate.put(`/news/${id}/likes/${type}`)
  return response.data
}

const commentNews = async (axiosPrivate,id,body) => {
  const response = await axiosPrivate.post(`/news/${id}/comments`,JSON.stringify({body}))
  return response.data
}

const searchNews = async (axiosPrivate,data) => {
  const response = await axiosPrivate.get(`/news?${data.inputRadio}=${data.inputText}`)
  return response.data
}

const likedNews = async (axiosPrivate,id) => {
  const response = await axiosPrivate.get(`/users/${id}/likes`)
  return response.data
}

const newsRequest = {
  getNews,
  likeNews,
  commentNews,
  searchNews,
  likedNews
}

export default newsRequest
