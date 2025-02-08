<?php

class SettingsController
{
    public function handleGetRequest()
    {
        $htmlContent = $this->loadView('settings');
        header ('Content-Type: application/json');
        echo json_encode(['data' => $htmlContent]);
    }

    private function loadView($view, $data = [])
    {
        extract($data);
        ob_start();
        include __DIR__ . '/../views/' . $view . '.php';
        return ob_get_clean();
    }

}