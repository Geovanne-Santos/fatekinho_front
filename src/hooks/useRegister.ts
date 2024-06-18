import { useMutation } from "@tanstack/react-query"
import { register } from "../api/services/register"

export const useRegister = () => {
    return useMutation({mutationFn: register});
}