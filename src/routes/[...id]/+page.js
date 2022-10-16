/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const data = await fetch(`/api/${params.id}`).then((res) => res.json());
    return data;
}