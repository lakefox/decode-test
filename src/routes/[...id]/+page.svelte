<script>
	export let data;
	console.log(data);

	let innerHeight, innerWidth;

	let index = 0;
	let showStory = false;

	// sort by best keysentance
	let summaries = data.summaries.sort((a, b) => {
		return a.index - b.index;
	});
	console.log(summaries);

	function back() {
		index = Math.max(index - 1, 0);
	}
	function next() {
		index = Math.min(index + 1, data.slides.length - 1);
	}
	function show() {
		showStory = !showStory;
	}
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta property="og:title" content="DECODE - {data.title}" />
	<meta property="og:image" content={data.image} />
	<meta name="description" content={data.keyPoint} />
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth on:scroll={scroll} />

{#if innerHeight < innerWidth}
	<img src={data.image} alt={data.title} class="fullCenterW " srcset="" />
{:else}
	<img src={data.image} alt={data.title} class="fullCenterH " srcset="" />
{/if}
<div class="w-full bg-black text-white font-bold pl-[20px] fixed top-0 flex">
	<a href="/explore" class="mr-[10px]">DECODE</a>
	<div class="marquee w-full"><p>{data.title}</p></div>
</div>

{#if !showStory}
	<div class="story mx-auto max-w-[90%] w-[900px] my-[100px] ">
		<div
			class="text-[50px] leading-[57px] font-bold text-left mb-[20px] bg-black text-white p-[10px] px-[10px] "
		>
			{data.title}
		</div>
		<div
			class="text-[30px] font-bold mb-[20px] bg-white px-[10px]  w-min bg-black text-white p-[10px]"
		>
			Key&nbsp;Points
		</div>
		<div class="mb-[20px] bg-white px-[10px] bg-black text-white p-[10px]">
			{data.keyPoint}
		</div>
		<div
			class="mx-auto cursor-pointer mt-[200px] text-[30px] font-bold mb-[20px] bg-white px-[10px]  w-min bg-black text-white p-[10px]"
			on:click={show}
		>
			READ
		</div>
	</div>
{/if}

{#if showStory}
	<div id="storyCont">
		{#each data.slides as slide, i}
			<div class="story mx-auto max-w-[90%] w-[900px]">
				<div class="mt-[30vh]">
					{#each summaries as summary}
						{#if summary.index == i && summary.text.length < slide.length / 2}
							<div
								class="text-[30px] font-bold mb-[20px] bg-white px-[10px]  w-full bg-black text-white p-[10px]"
							>
								"{summary.text}"
							</div>
						{/if}
					{/each}
					<div class="bg-white px-[10px]  mb-[200px] bg-black text-white p-[10px]">
						{@html slide}
					</div>
				</div>
				<!-- <div class="fixed bottom-[30px] left-[50%] translate-x-[-50%]">
			<div class="flex justify-center mt-[30px]">
				<div class="mx-[20px] p-[10px] px-[20px] bg-black text-white  w-min" on:click={back}>
					BACK
				</div>
				<div class="mx-[20px] p-[10px] px-[20px] bg-black text-white  w-min">
					{index + 1}/{data.slides.length}
				</div>
				<div class="mx-[20px] p-[10px] px-[20px] bg-black text-white  w-min" on:click={next}>
					NEXT
				</div>
			</div>
		</div> -->
			</div>
		{/each}
	</div>
{/if}
