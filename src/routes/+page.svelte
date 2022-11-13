<script>
	let search = '';
</script>

<svelte:head>
	<title>DECODE</title>
</svelte:head>

<div class="text-white w-full">
	<div class="ml-[20px] mt-[20px] text-[60px] font-bold bg-white text-black w-min px-[20px]">
		DECODE
	</div>
	<div class="w-[700px] max-w-[90%] m-auto mt-[100px]">
		<div class="pink font-bold text-[50px]">Learn Anything</div>
		<div class="mb-[20px] bg-white px-[10px] border-black font-bold text-black text-[50px]">
			<input
				type="text"
				placeholder="Search"
				class="w-full border-b-[2px] border-black mb-[5px]"
				bind:value={search}
			/>
		</div>
	</div>
	<a href="/{search}">
		<div
			class="text-black mx-auto cursor-pointer mt-[200px] text-[30px] font-bold mb-[20px] bg-white px-[10px] border-black w-min"
		>
			EXPLORE
		</div>
	</a>
</div>
