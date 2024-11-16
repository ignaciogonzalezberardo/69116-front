import axios from "axios";
import { useUser } from "../../context/UserContex";
import { useEffect } from "react";
import Swal from "sweetalert2";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

const useApi = () => {
    const { token, logout } = useUser()

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(config => {
                if(token) {
                    config.headers.Authorization = token;
                }
                return config;
        })

        const responseInterceptor = api.interceptors.response.use(
            response => response,
            error => {
                console.log(error);
                // Desloguearlo si el error en la respuesta fue un status 401
                if(error.response.status === 401) {
                    // Mostrar un mensaje al usuario
                    Swal.fire({
                        title: "Error",
                        text: "Sesión vencida o inválida",
                        icon: "error",
                        timer: 1500
                    }).then(() => {
                        logout()
                    })
                }
            }
        )

        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [token])

    return api;
}

export default useApi
