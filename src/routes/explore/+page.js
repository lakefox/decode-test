/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const rss = await fetch('/api/rss').then((res) => res.json());
    return { items: rss };
}