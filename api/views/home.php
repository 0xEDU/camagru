<section class="flex-grow w-full m-2">
	<div id="image-carousel" class="h-32 w-full bg-[#F9F9F9] flex opacity-70 rounded m-2"></div>
	<div id="drop-area" class="relative m-3 flex flex-col items-center justify-center">
		<video id="user-camera" class="w-9/12 rounded-xl shadow" playsinline autoplay muted></video>
		<div class="absolute inset-0 flex items-end justify-center">
			<button id="camera-button" class="w-16 h-16 mb-2 rounded-full bg-color-tertiary">
			</button>
		</div>
	</div>
</section>
<aside class="bg-color-primary text-color-primary flex-shrink-0 w-1/3">
	<section id="last-taken-pics-gallery" class="h-full w-full p-6">
		<div class="w-full flex">
			<img id="gallery-image" class="w-full h-[18vh] p-2 object-scale-down" src="./assets/orange-cat.png" alt="">
			<img id="gallery-image" class="w-full h-[18vh] p-2 object-scale-down" src="./assets/orange-cat.png" alt="">
		</div>
		<div class="w-full flex">
			<img id="gallery-image" class="w-full h-[18vh] p-2 object-scale-down" src="./assets/orange-cat.png" alt="">
			<div class="w-full h-[18vh] p-2"></div>
		</div>
	</section>
</aside>