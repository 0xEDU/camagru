<ul class="comments-list">
    <?php foreach ($comments as $comment): ?>
        <li class="border-b-2 border-state-400 p-4">
            <h3 class="font-bold"><?php echo $comment['username']; ?></h3>
            <p><?php echo $comment['comment']; ?></p>
        </li>
    <?php endforeach; ?>
</ul>