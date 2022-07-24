const getNews = async (axiosPrivate,numPage,search,liked) => {
  const {inputRadio:filter,inputText:input} = search
  const response = await axiosPrivate.get(`/news?skip=${numPage*5}&limit=5&${filter}=${input}&likes=${liked}`)
  return response.data
}
const getNewsByEmployee = async (axiosPrivate,numPage,search,username) => {
  const {inputRadio:filter,inputText:input} = search
  const response = await axiosPrivate.get(`/news?skip=${numPage*5}&limit=5&${filter}=${input}&username=${username}`)
  console.log(response.data)
  return response.data
}
const getNewsById = async (axiosPrivate,id) => {
  const response = await axiosPrivate.get(`/news/${id}`)
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


const newsRequest = {
  getNews,
  likeNews,
  commentNews,
  getNewsById,
  getNewsByEmployee
}

export default newsRequest
