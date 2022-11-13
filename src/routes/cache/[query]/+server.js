import { cache } from "../../../lib/cache";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    console.log(url.pathname.slice(7));
    if (url.pathname.indexOf("favicon") != -1 || url.pathname.indexOf("robots.txt") != -1) {
        return new Response("error");

    }
    let res = new Response(await cache(`http://localhost:3000/api/${url.pathname.slice(7).toLowerCase()}`, "json"));
    res.headers.append('Access-Control-Allow-Origin', "*")
    return res;
}