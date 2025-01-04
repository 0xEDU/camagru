<section class="pt-4">
    <?php if (!empty($captures)): ?>
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <?php
                $counter = 0;
                foreach ($captures as $capture):
            ?>
                <div class="overflow-hidden rounded-lg shadow-lg">
                    <img
                        src="<?= htmlspecialchars($capture, ENT_QUOTES, 'UTF-8') ?>"
                        alt="Gallery Image"
                        class="w-full h-auto object-cover" />
                </div>
                <!-- Show the number of likes -->
                <div class="text-center">
                    <span class="text-sm text-gray-600">Likes: <?= $likes[$counter]['likes'] ?></span>
                </div>
                <?php $counter++; ?>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>