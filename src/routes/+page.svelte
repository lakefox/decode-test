<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let rssItems = data.items.slice(0, 50);
</script>

<svelte:head>
	<title>MOODL.XYZ</title>
</svelte:head>

<div class="">
	<div class="flex flex-row flex-wrap justify-center">
		{#each rssItems as item}
			{#if item['media:content'] || item.enclosure}
				<a href="/{encodeURIComponent(item.link)}">
					<div class="relative w-[100vw]">
						<div class="w-[100vw]">
							{#if item['media:content']}
								<img
									class="w-[100vw]"
									src={item['media:content'].$.url}
									alt={(item['media:content']['media:descritpion'] || [{ _: '' }])[0]._}
								/>
							{:else if item.enclosure}
								<img class="w-[100vw]" src={item.enclosure.url} alt={item['content:encoded']} />
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
