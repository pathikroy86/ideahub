import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getServerToken = async () => {
    const tokenData = await auth.api.getToken({
        headers: await headers(),
    });

    return tokenData?.token;
};

export const getAuthHeaders = async () => {
    const token = await getServerToken();

    if (!token) {
        return {};
    }

    return {
        authorization: `Bearer ${token}`,
    };
};
