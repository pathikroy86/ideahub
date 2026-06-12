export const getClientToken = async () => {
    const res = await fetch("/api/auth/token", {
        credentials: "include",
    });

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    return data?.token;
};

export const getClientAuthHeaders = async () => {
    const token = await getClientToken();

    if (!token) {
        return {};
    }

    return {
        authorization: `Bearer ${token}`,
    };
};
