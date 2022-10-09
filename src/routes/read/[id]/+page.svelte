<script>
	import Readability from '@mozilla/readability';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { bind, text } from 'svelte/internal';
	import { removeStopwords } from '../../../../node_modules/stopword/dist/stopword.esm.min.mjs';
	let article = { title: '', content: '' };
	let coverImage = '';
	let innerHeight, innerWidth;
	let content = [''];
	let newContent = [''];
	let index = 0;
	let showStory = false;
	let sum = 'Loading Summary';
	onMount(() => {
		fetch(`/api/smmry?${encodeURIComponent($page.params.id)}`)
			.then((r) => r.text())
			.then((r) => {
				sum = r;
				let sw = removeStopwords(r.split(' '));
				fetch(`https://cors.lowsh.workers.dev?${$page.params.id}`)
					.then((res) => res.text())
					.then((res) => {
						let dp = new DOMParser();
						let doc = dp.parseFromString(res, 'text/html');
						coverImage = doc.head.querySelector('meta[property="og:image"]').content;
						article = new Readability.Readability(doc).parse();
						let parsed = dp.parseFromString(article.content, 'text/html');
						content = [...parsed.querySelectorAll('p')];
						content = content.filter((a) => {
							return (
								a.innerHTML.trim() != '' &&
								a.innerHTML.toLowerCase().indexOf('read also') == -1 &&
								a.innerHTML.toLowerCase().indexOf('img') == -1
							);
						});
						content = content.map((e) => {
							for (let i = 0; i < sw.length; i++) {
								const word = sw[i];
								e.innerHTML = e.innerHTML.replaceAll(
									` ${word} `,
									`<b class="text-blue-400"> ${word} </b>`
								);
							}
							return e;
						});
						let cntLn = 0;
						for (let i = 0; i < content.length; i++) {
							cntLn += content[i].innerText.length;
						}
						cntLn = cntLn / content.length;

						for (let i = 0; i < content.length; i++) {
							if (content[i].innerText.length < cntLn) {
								newContent[newContent.length - 1] += content[i].innerHTML;
							} else {
								newContent.push(content[i].innerHTML);
							}
						}
						if (newContent[0] == '') {
							newContent = newContent.slice(1);
						}
					});
			});
	});
	function back() {
		index = Math.max(index - 1, 0);
	}
	function next() {
		index = Math.min(index + 1, newContent.length - 1);
	}
	function show() {
		showStory = !showStory;
	}
</script>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

{#if innerHeight < innerWidth}
	<img src={coverImage} alt={article.title} class="fullCenterW" srcset="" />
{:else}
	<img src={coverImage} alt={article.title} class="fullCenterH" srcset="" />
{/if}

{#if !showStory}
	<div class="story mx-auto max-w-[90%] w-[900px] my-[100px] ">
		<div
			class="text-[50px] leading-[57px] font-bold text-left mb-[20px] bg-white px-[10px] border-[5px] border-black"
		>
			{article.title}
		</div>
		<div class="text-[30px] font-bold mb-[20px] bg-white px-[10px] border-[5px] border-black w-min">
			Key&nbsp;Points
		</div>
		<div class="mb-[20px] bg-white px-[10px] border-[5px] border-black">
			{sum}
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
			<div class="bg-white px-[10px] border-[5px] border-black">
				{@html newContent[index]}
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
					{index + 1}/{newContent.length}
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
