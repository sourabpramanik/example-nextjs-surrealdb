import { User } from "../schema";

const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/api/user'

export const getUserById = async (id: string) => {
    const res: {
        success: boolean;
        data?: User;
    } = await (
        await fetch(endpoint + "/" + id)
    ).json();

    return res;
};