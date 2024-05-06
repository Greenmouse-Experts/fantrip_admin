export const getBearerToken = () => {
    const token = sessionStorage.getItem('fantrip_token')
    return `Bearer ${token}`
}
export const getToken = () => {
    const token = sessionStorage.getItem('fantrip_token')
    return token
}