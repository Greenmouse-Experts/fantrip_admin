
export const getBearerToken = () => {
    const token = sessionStorage.getItem('fantrip_admin_token')
    return `Bearer ${token}`
}
export const getToken = () => {
    const token = sessionStorage.getItem('fantrip_admin_token')
    return token
}
