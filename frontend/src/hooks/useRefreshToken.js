import axios from '../axios/axiosInstances'
import useGlobalContext from '../hooks/useGlobalContext'

const useRefreshToken = () => {
    const {refreshAccessToken} = useGlobalContext()

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        refreshAccessToken(response.data.accesToken)
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
