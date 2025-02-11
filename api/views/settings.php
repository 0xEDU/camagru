
<section class="font-mono flex flex-col items-center justify-center w-full">
    <div class="flex flex-col items-center">
        <span class="mt-2 w-full text-sm font-medium text-black text-left">Username</span>
        <div class="mb-2">
			<input type="text" id="update-username-input" class="p-2.5 rounded-lg" required />
            <button id="update-username-button" class="bg-color-secondary rounded-lg w-auto px-5 py-2.5">
                Update
            </button>
        </div>
        <span class="mt-2 w-full text-sm font-medium text-black text-left">Email</span>
        <div class="mb-2 grow">
			<input type="text" id="update-email-input" class="p-2.5 rounded-lg" required />
            <button id="update-email-button" class="bg-color-secondary rounded-lg w-auto px-5 py-2.5">
                Update
            </button>
        </div>
        <span class="mt-2 w-full text-sm font-medium text-black text-left">Password</span>
        <div class="mb-2 grow">
			<input type="password" id="update-password-input" class="p-2.5 rounded-lg" placeholder="Enter a new password" required />
            <button id="update-password-button" class="bg-color-secondary rounded-lg w-auto px-5 py-2.5">
                Update
            </button>
        </div>
        <label class="my-2 inline-flex items-center cursor-pointer w-full">
            <input id="email-checkbox" type="checkbox" value="" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-black">Receive email notifications</span>
        </label>
    </div>
</section>