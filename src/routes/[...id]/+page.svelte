<script>
	export let data;
	console.log(data);

	let innerHeight, innerWidth;

	let index = 0;
	let showStory = false;

	function back() {
		index = Math.max(index - 1, 0);
		window.scrollTo(0, 0);
	}
	function next() {
		index = Math.min(index + 1, data.slides.length - 1);
		window.scrollTo(0, 0);
	}
	function show() {
		showStory = !showStory;
	}
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta property="og:title" content="MOODL - {data.title}" />
	<meta property="og:image" content={data.image} />
	<meta name="description" content={data.keyPoint} />
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

{#if innerHeight < innerWidth}
	<img src={data.image} alt={data.title} class="fullCenterW " srcset="" />
{:else}
	<img src={data.image} alt={data.title} class="fullCenterH " srcset="" />
{/if}
<div class="w-full bg-black text-white font-bold pl-[20px] fixed top-0"><a href="/">MOODL</a></div>

{#if !showStory}
	<div class="story mx-auto max-w-[90%] w-[900px] my-[100px] ">
		<div
			class="text-[50px] leading-[57px] font-bold text-left mb-[20px] bg-white px-[10px] border-[5px] border-black"
		>
			{data.title}
		</div>
		<div class="text-[30px] font-bold mb-[20px] bg-white px-[10px] border-[5px] border-black w-min">
			Key&nbsp;Points
		</div>
		<div class="mb-[20px] bg-white px-[10px] border-[5px] border-black">
			{data.keyPoint}
		</div>
		<div
			class="mx-auto cursor-pointer mt-[200px] text-[30px] font-bold mb-[20px] bg-white px-[10px] border-[5px] border-black w-min"
			on:click={show}
		>
			READ
		</div>
	</div>
{/if}

{#if showStory}
	<div class="story mx-auto max-w-[90%] w-[900px]">
		<div class="">
			<div
				class="mt-[30vh] text-[30px] font-bold mb-[20px] bg-white px-[10px] border-[5px] border-black w-min"
			>
				The&nbsp;Story
			</div>
			<div class="bg-white px-[10px] border-[5px] border-black mb-[200px]">
				{@html data.slides[index]}
			</div>
		</div>
		<div class="fixed bottom-[30px] left-[50%] translate-x-[-50%]">
			<div class="flex justify-center mt-[30px]">
				<div
					class="mx-[20px] p-[10px] px-[20px] bg-white border-[5px] border-black w-min"
					on:click={back}
				>
					BACK
				</div>
				<div class="mx-[20px] p-[10px] px-[20px] bg-white border-[5px] border-black w-min">
					{index + 1}/{data.slides.length}
				</div>
				<div
					class="mx-[20px] p-[10px] px-[20px] bg-white border-[5px] border-black w-min"
					on:click={next}
				>
					NEXT
				</div>
			</div>
		</div>
	</div>
{/if}
