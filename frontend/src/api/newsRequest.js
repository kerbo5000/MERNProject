const getNews = async (axiosPrivate) => {
  const response = await axiosPrivate.get('/news')
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

const newsRequest = {
  getNews,
  likeNews,
  commentNews,
  searchNews
}

export default newsRequest
