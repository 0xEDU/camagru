<section class="p-4">
    <?php if (!empty($captures)): ?>
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <?php foreach ($captures as $capture): ?>
                <div class="overflow-hidden rounded-lg shadow-lg">
                    <img 
                        src="<?= htmlspecialchars($capture, ENT_QUOTES, 'UTF-8') ?>" 
                        alt="Gallery Image" 
                        class="w-full h-auto object-cover" 
                    />
                </div>
            <?php endforeach; ?>
        </div>
    <?php else: ?>
        <p class="text-center text-gray-500">No images found in the gallery.</p>
    <?php endif; ?>
</section>