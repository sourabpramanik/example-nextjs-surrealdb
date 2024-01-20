import useSWR from "swr";
import { User } from "../schema";
import { getUserById } from "./handler";

export const useUser = (id: string) => {
    return useSWR(`/api/sticky`, async () => await getUserById(id));
};