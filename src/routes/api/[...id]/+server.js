import { genReport } from "./genReport";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    return new Response(JSON.stringify(await genReport(`${url.pathname.slice(5)}`)));
}