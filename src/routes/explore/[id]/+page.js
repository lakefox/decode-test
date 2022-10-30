/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const rss = await fetch(`/api/rss/${params.id}`).then((res) => res.json());
    return { items: rss };
}