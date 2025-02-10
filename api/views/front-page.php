<?php if (!isset($_SESSION['user'])) { ?>
    <section class="font-mono flex flex-col items-center justify-center w-full">
        <h1>Log in to access the application!</h1>
    </section>
<?php } else { ?>
    <div id="logged-in"></div>
<?php } ?>