function useCheckJWT(){
    const getTokenFromCookies = () => {
        const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'))
    }
}