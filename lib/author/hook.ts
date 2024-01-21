import useSWR from "swr";
import { getUserById } from "./handler";

export const useAuthor = (id: string) => {
    return useSWR(`/api/user/${id}`, async () => await getUserById(
        id
    ));
};