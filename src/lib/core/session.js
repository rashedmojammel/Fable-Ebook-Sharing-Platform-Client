import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })
    // console.log("User session:", session);

    return session?.user || null;
}
export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })
    return session?.session?.token || null;
     
    // const token = await auth.api.getToken({
    //     headers: await headers() // some endpoints might require headers
    // })
    // return token?.token || null;

}

export const requireRole = async (role) => {
    const user = await getUserSession();
    // console.log("User role:", user?.role);

    if(user?.userRole !== role){
        return redirect("/unauthorized");
    }
}
