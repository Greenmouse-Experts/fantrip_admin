import { getToken } from '../services/helpers';
import useAuthStore from '../store/userStore'

const useAuth = () => {
    const user = useAuthStore((state) => state.user)
    const saveUser = useAuthStore((state) => state.saveUser)
    const clearUser = useAuthStore((state) => state.clearUser);
    const token = getToken()
    const isLoggedIn = token !== null? true : false
    const userId = user.id
    const nameRow = user.name?.split(" ");
    const firstName = nameRow && nameRow[0]
    const lastName = nameRow && nameRow?.length > 1 && nameRow[1]
    const signOut = () => {
      localStorage.clear();
      sessionStorage.clear();
      clearUser();
    };
  return {
    user,
    userId,
    firstName,
    lastName,
    isLoggedIn,
    saveUser,
    signOut
  }
}

export default useAuth