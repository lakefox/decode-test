
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const data = await fetch(`http://localhost:3000/cache/${encodeURIComponent(params.query)}`).then((res) => res.json());
    return data;
}