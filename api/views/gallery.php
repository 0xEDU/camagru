<section class="flex flex-col items-center">
    <section id="gallery-grid" class="p-4">
        <?php if (!empty($captures)): ?>
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <?php 
                    $counter = 0;
                    foreach ($captures as $capture): 
                ?>
                    <div class="overflow-hidden rounded-lg shadow-lg">
                        <img
                            src="<?= htmlspecialchars($capture['url'], ENT_QUOTES, 'UTF-8') ?>"
                            alt="Gallery Image"
                            class="w-full h-auto object-cover" />
                        <!-- Show interaction icons if user is logged -->
                        <?php if (isset($_SESSION['user'])) { ?>
                        <div class="text-center flex justify-around">
                            <div>
                                <i class="like-icon bi bi-heart text-red-500"></i>
                                <span class="text-sm text-gray-600"><?= $likes[$counter]['likes']; ?></span>
                            </div>
                            <i class="comments-icon bi bi-chat text-blue-500"></i>
                            <?php if ($_SESSION['user'] === $capture['username']) { ?>
                            <i class="delete-icon bi bi-trash3-fill text-red-700"></i>
                            <?php } ?>
                        </div>
                        <?php } ?>

                    <?php $counter++; ?>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p class="text-center text-gray-500">No images found in the gallery.</p>
        <?php endif; ?>
    </section>
    <article id="gallery-loading" role="status" class="pb-4">
        <svg aria-hidden="true" class="inline w-8 h-8 text-[#9f9cdc] animate-spin dark:text-[#9f9cdc] fill-[#FFEBCC] dark:fill-[#FFEBCC" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
    </article>
</section>

<div id="modal-backdrop" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <!-- Modal Content -->
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <!-- Modal Header -->
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Comments</h3>
                <button id="close-modal" class="text-gray-500 hover:text-gray-700">
                    ✕
                </button>
            </div>

            <!-- Modal Body -->
            <div id="comments-body" class="mb-4">
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-between items-center">
                <input id="comment-input" type="text" class="w-full mr-1 p-2 border rounded-md" placeholder="Add a comment..." />
                <button id="add-comment-button" class="px-4 py-2 bg-color-secondary text-black rounded-lg">Add</button>
            </div>

            <!-- Alerts -->
            <div id="modal-alert" class="mt-4 text-red-500"></div>
        </div>
    </div>