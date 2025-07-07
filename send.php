<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = strip_tags(trim($_POST["name"]));
    $phone   = strip_tags(trim($_POST["phone"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    if ( empty($name) || empty($phone) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message) ) {
        http_response_code(400);
        echo "Заповніть всі поля правильно.";
        exit;
    }

    // 1. Надіслати на пошту
    $to = "reutenkokar@gmail.com";  // Ваша email-адреса
    $subject = "Нове повідомлення з контактної форми";
    $email_content = "Ім'я: $name\nТелефон: $phone\nEmail: $email\nПовідомлення:\n$message\n";
    $headers = "From: $email";

    mail($to, $subject, $email_content, $headers);

    // 2. Відправити повідомлення в Telegram
    $telegram_token = "7730046936:AAFbnjP1zFRSV_ia4yOJeHjJgEuTN35HLbQ";
    $chat_id = "-1002834833671"; // ID каналу чи чату (можна отримати через @userinfobot)

    $text = urlencode("Нове повідомлення з сайту:\nІм'я: $name\nТелефон: $phone\nEmail: $email\nПовідомлення: $message");

    $url = "https://api.telegram.org/bot$telegram_token/sendMessage?chat_id=$chat_id&text=$text";

    file_get_contents($url);

    // Повернутися на сторінку успішної відправки (можна змінити)
    header("Location: index.html");
    exit;
} else {
    http_response_code(403);
    echo "Помилка при відправці форми.";
}
?>
