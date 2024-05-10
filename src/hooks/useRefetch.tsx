import { useQueryClient } from "@tanstack/react-query";

export function useRefetch() {
    const queryClient = useQueryClient();
    const revalidateRoute = (route:string) => {
        queryClient.invalidateQueries({
            queryKey: [`${route}`],
          });
    }
  
    return {revalidateRoute};
  }