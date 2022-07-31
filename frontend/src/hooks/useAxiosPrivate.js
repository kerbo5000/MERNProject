import { axiosPrivate } from "../axios/axiosInstances";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useGlobalContext from "./useGlobalContext";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const {authState} = useGlobalContext()
    console.count('axiosPrivate')
    console.trace()
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${authState?.accessToken}`;
                }
                console.log('h1')
                console.log(config._retry)
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
              return response},
            async (error) => {
                console.log('h2')
                const prevRequest = error.config;
                console.log(prevRequest)
                console.log(prevRequest._retry)
                if (error?.response?.status === 403 && !prevRequest._retry) {
                    console.log('h3')
                    console.log(prevRequest._retry)
                    prevRequest._retry = true;
                    console.log(prevRequest._retry)
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [authState, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;
