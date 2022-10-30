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
	<a href="/explore">
		<div class="text-[60px] font-bold bg-white w-min px-[20px] mb-[20px]">DECODE</div>
	</a>
	{#if showMenu || innerWidth > 1490}
		<div class="bg-white font-mono font-bold text-[20px] py-[5px]">
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">Popular</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">True Crime</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">Climate</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">Politics</div>
			<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">World</div>
			<a href="/explore/history">
				<div class="hover:bg-zinc-400 pl-[20px] my-[2px] cursor-pointer">History</div>
			</a>
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
		<div class="story2 mx-auto max-w-[90%] w-[900px]">
			<a href="/{encodeURIComponent(item.url)}">
				<div class="relative">
					<div class="w-[100%]">
						<img
							class="w-[900px] max-w-[100%] max-h-[500px]"
							loading="lazy"
							src={item.image}
							alt={item.title}
						/>
					</div>
					<div class="absolute top-0 z-[2]">
						<div
							class="text-[20px] leading-[22px] font-bold text-left mb-[20px] bg-white px-[10px] border-[5px] border-black m-[10px]"
						>
							{item.title}
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	body {
		overflow: hidden;
	}
</style>
