<section class="flex-grow w-full m-2">
	<div id="image-carousel" class="h-32 w-full bg-[#F9F9F9] flex opacity-70 rounded m-2"></div>
	<div id="drop-area" class="relative m-3 flex flex-col items-center justify-center">
		<video id="user-camera" class="w-9/12 rounded-xl shadow" playsinline autoplay muted></video>
		<div class="absolute inset-0 flex items-end justify-center">
			<button id="camera-button-snap" class="w-16 h-16 mb-2 rounded-full bg-green-500">
			</button>
			<button id="camera-button-save" class="w-16 h-16 mb-2 rounded-full bg-color-tertiary" style="display: none;">
			</button>
			<button id="camera-button-retry" class="w-16 h-16 mb-2 rounded-full bg-red-500" style="display: none;">
			</button>
			<button id="camera-button-refresh" class="w-16 h-16 mb-2 rounded-full bg-orange-500">
			</button>
		</div>
	</div>
</section>
<aside class="bg-color-primary text-color-primary flex-shrink-0 w-1/3">
	<section id="last-taken-pics-gallery" class="h-full w-full p-6">
	</section>
</aside>