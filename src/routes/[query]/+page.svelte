<script>
	import { css } from '@emotion/css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { say } from '../../lib/say';
	export let data;
	console.log(data);
	let preview = data.interlaced.slice(0, 3);
	Math.random = RNG(
		parseInt(
			$page.params.query
				.split('')
				.map((e) => {
					return e.charCodeAt();
				})
				.join('')
		)
	);
	function color() {
		let c = [163, 55, Math.floor(Math.random() * 108) + 55].sort(() =>
			Math.random() > 0.5 ? 1 : -1
		);
		return rgbToHex(...c);
	}
	function rgbToHex(r, g, b) {
		return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
	}
	function RNG(seed) {
		var m = 2 ** 35 - 31;
		var a = 185852;
		var s = seed % m;
		return function () {
			return (s = (s * a) % m) / m;
		};
	}
	let bgColorHex = color();
	let bgColor = css`
		background: ${bgColorHex};
	`;

	let playState = true;
	function play() {
		playState = !playState;
	}
	let hidden = false;

	function hideSwitch() {
		hidden = !hidden;
	}
</script>

<svelte:head>
	<title>{$page.params.query} - DECODE</title>
</svelte:head>

{#if !hidden}
	<div class="mt-[-12px] {bgColor}">
		<div class="text-white w-[700px] min-h-[100vh] max-w-[90%] m-auto mb-[70px]">
			<div class="w-[20px] mx-auto mt-[12px] mb-[-30px] cursor-pointer" on:click={hideSwitch}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#eee"
					><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
					/></svg
				>
			</div>
			<div class=" mt-[30px] md:mt-[50px]">
				<div class="pink font-bold text-[50px] capitalize">{$page.params.query}</div>
			</div>
			<div class="text-right">
				{data.readingTime.text}
			</div>
			<div class="text-justify font-bold mx-auto text-[20px] mt-[10px] md:p-[20px]">
				{#each preview as inter}
					<div class="mb-[25px]">
						{inter.text}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<div class="fixed bottom-0 h-[70px] w-full shadow-upper {bgColor}">
	<div class="w-[20px] mx-auto mt-[5px] mb-[-22px] cursor-pointer" on:click={hideSwitch}>
		{#if hidden}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#eee"
				><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
					d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
				/></svg
			>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={bgColorHex}
				><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
					d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
				/></svg
			>
		{/if}
	</div>
	<div class="w-[700px] max-w-[90%] m-auto flex items-center">
		<div class="w-[25px] h-[25px] mt-[17px] cursor-pointer" on:click={play}>
			{#if playState}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#fff"
					><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
					/></svg
				>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#fff"
					><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
					/></svg
				>
			{/if}
		</div>
		<div class="w-full ml-[10px] mt-[26px] bg-slate-400 rounded-[5px]">
			<div class="bg-white rounded-[5px] w-[80%] h-[16px]" />
		</div>
	</div>
</div>
