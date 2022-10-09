import { error } from '@sveltejs/kit';
import { summarizeFromUrl } from "./summary.js";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    console.log(url);
    let smmry = await summarizeFromUrl(decodeURIComponent(url.href.slice(url.href.indexOf("?") + 1)));
    return new Response(smmry.split("\n").slice(1).join("\n"))
}