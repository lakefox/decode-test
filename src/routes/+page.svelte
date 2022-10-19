<script>
	let innerWidth, innerHeight;
	let srcs = ['/index/1.jpeg', '/index/2.jpeg', '/index/3.jpeg'];
	let img = srcs[0];
	let i = 0;
	setInterval(() => {
		i++;
		if (i > srcs.length - 1) {
			i = 0;
		}
		img = srcs[i];
	}, 10000);
</script>

<svelte:head>
	<title>DECODE</title>
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

{#if innerHeight < innerWidth}
	<img src={img} alt="placeholder img" class="fullCenterW " srcset="" />
{:else}
	<img src={img} alt="placeholder img" class="fullCenterH " srcset="" />
{/if}

<div class="text-white w-full">
	<div class="ml-[20px] mt-[20px] text-[60px] font-bold bg-white text-black w-min px-[20px]">
		DECODE
	</div>
	<div class="w-[700px] max-w-[90%] m-auto mt-[100px]">
		<div class="pink font-bold text-[50px]">News Decoded</div>
		<div
			class="mb-[20px] bg-white px-[10px] border-[5px] border-black font-bold text-black text-[50px]"
		>
			We break down any story on the web into a quick easy to read infographic using AI
		</div>
	</div>
	<a href="/explore">
		<div
			class="text-black mx-auto cursor-pointer mt-[200px] text-[30px] font-bold mb-[20px] bg-white px-[10px] border-[5px] border-black w-min"
		>
			EXPLORE
		</div>
	</a>
</div>
