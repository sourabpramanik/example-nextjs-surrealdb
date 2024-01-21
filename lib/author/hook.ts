import useSWR from "swr";
import { getAuthorById } from "./handler";

export const useAuthor = (id: string) => {
    return useSWR(`/api/user/${id}`, async () => await getAuthorById(
        id
    ));
};