<section class="font-mono flex flex-col items-center justify-center w-full">
	<form id="login-form" class="flex flex-col items-center">
		<div class="mb-5">
			<label for="login-username" class="block">Your username</label>
			<input type="text" id="login-username" class="p-2.5 rounded-lg" placeholder="user" required />
		</div>
		<div class="mb-5">
			<label for="login-password" class="block">Your password</label>
			<input type="password" id="login-password" class="p-2.5 rounded-lg" required />
		</div>
		<button type="submit" class="bg-color-secondary rounded-lg w-auto px-5 py-2.5">Submit</button>
	</form>
	<section id="form-message"></section>
</section>