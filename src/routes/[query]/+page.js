
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const data = await fetch(`/cache/${encodeURIComponent(params.query)}`).then((res) => res.json());
    return data;
}