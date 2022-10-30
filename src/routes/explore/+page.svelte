<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let rssItems = data.items.slice(0, 50);
	let showMenu = false;
	let innerWidth;
</script>

<svelte:head>
	<title>DECODE</title>
</svelte:head>

<svelte:window bind:innerWidth on:scroll={scroll} />

<div class=" mt-[20px] fixed text-black w-min px-[20px] mb-[20px] z-10">
	<div class="text-[60px] font-bold bg-white w-min px-[20px] mb-[20px]">DECODE</div>
	{#if showMenu || innerWidth > 1490}
		<div class="bg-white font-mono font-bold text-[20px] py-[5px]">
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">Popular</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">True Crime</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">Climate</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">Politics</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">World</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">History</div>
		</div>
	{:else}
		<div
			class="bg-white font-mono font-bold text-[20px] py-[5px]"
			on:click={() => {
				showMenu = true;
			}}
		>
			<div class="pl-[20px] my-[2px] cursor-pointer w-min">MENU</div>
		</div>
	{/if}
</div>

<div
	id="storyCont"
	class="pt-[200px] overflow-hidden"
	on:click={() => {
		showMenu = false;
	}}
>
	{#each rssItems as item}
		{#if item['media:content'] || item.enclosure}
			<div class="story2 mx-auto max-w-[90%] w-[900px]">
				<a href="/{encodeURIComponent(item.link)}">
					<div class="relative">
						<div class="w-[100%]">
							{#if item['media:content']}
								<img
									class="w-[900px] max-w-[100%] max-h-[500px]"
									loading="lazy"
									src={item['media:content'].$.url}
									alt={(item['media:content']['media:descritpion'] || [{ _: '' }])[0]._}
								/>
							{:else if item.enclosure}
								<img
									class="w-[900px] max-w-[100%] max-h-[500px]"
									loading="lazy"
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
			</div>
		{/if}
	{/each}
</div>

<style>
	body {
		overflow: hidden;
	}
</style>
