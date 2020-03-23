<?php

$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];

// Load Composer's autoloader
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->CharSet = "utf-8";
    $mail->SMTPDebug = 0;                             // Enable verbose debug output
    $mail->isSMTP();                                  // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';             // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                         // Enable SMTP authentication
    $mail->Username   = 'web.start.isaev@gmail.com';  // SMTP username
    $mail->Password   = 'Daha1010';                   // SMTP password
    $mail->SMTPSecure = 'ssl';                        // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;                          // TCP port to connect to

    //Recipients
    $mail->setFrom('web.start.isaev@gmail.com', 'Исаева Дарья');
    $mail->addAddress('sr_relikt@mail.ru');           // Add a recipient

    // Content
    $mail->isHTML(true);                              // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта web.start@isaev.store';
    $mail->Body    = "Имя пользователя: ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail}";

    $mail->send();
    header('Location: thanks.html');
} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}