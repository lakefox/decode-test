import { cache } from "../../../lib/cache";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    console.log(url.pathname.slice(7));
    if (url.pathname.indexOf("favicon") != -1 || url.pathname.indexOf("robots.txt") != -1) {
        return new Response("error");

    }
    return new Response(await cache(`http://localhost:5173/api/${url.pathname.slice(7).toLowerCase()}`, "json"));
}