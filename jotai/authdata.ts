import { atom, useAtomValue, useSetAtom } from "jotai";

type User = {
    id: string;
    email: string;
    name: string;
}

const userAtom = atom<User | null>(null);

export const useSetUserAtom = () => {
    const setUser = useSetAtom(userAtom);
    return setUser;
}

export const useUserAtom = () => {
    const user = useAtomValue(userAtom);
    return user;
}

export default userAtom;
