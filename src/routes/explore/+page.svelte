<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let rssItems = data.items.slice(0, 10);
</script>

<svelte:head>
	<title>DECODE</title>
</svelte:head>
<div
	class="ml-[20px] mt-[20px] text-[60px] font-bold bg-white text-black w-min px-[20px] mb-[20px]"
>
	DECODE
</div>
<div class="w-full max-w-[900px] mx-auto">
	<div class="flex flex-row flex-wrap justify-center">
		{#each rssItems as item}
			{#if item['media:content'] || item.enclosure}
				<a href="/{encodeURIComponent(item.link)}">
					<div class="relative w-[100%]">
						<div class="w-[100%]">
							{#if item['media:content']}
								<img
									class="w-[900px] max-w-[100%]"
									src={item['media:content'].$.url}
									alt={(item['media:content']['media:descritpion'] || [{ _: '' }])[0]._}
								/>
							{:else if item.enclosure}
								<img
									class="w-[900px] max-w-[100%]"
									src={item.enclosure.url}
									alt={item['content:encoded']}
								/>
							{/if}
						</div>
						<div class="absolute top-0 z-[2]">
							<div
								class="text-[20px] leading-[22px] font-bold text-left mb-[20px] bg-white px-[10px] border-[5px] border-black m-[10px]"
							>
								{item.title}
							</div>
							<!-- {#if item.content}
						<p class="mb-6 text-gray-500">
							{@html item.content}
						</p>
					{/if} -->
						</div>
					</div>
				</a>
			{/if}
		{/each}
	</div>
</div>
