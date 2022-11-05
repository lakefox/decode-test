import { article } from "../../../lib/article";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    console.log(url.pathname.slice(5));
    return new Response(JSON.stringify(await article(decodeURIComponent(url.pathname.slice(5)))));
}