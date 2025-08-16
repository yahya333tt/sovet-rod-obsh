function isMobileOrTablet() {
    return window.innerWidth <= 1024;
}

const phoneElement = document.querySelector('.phone');
const notification = document.getElementById('copyNotification');

phoneElement.addEventListener('click', function() {
    if (!isMobileOrTablet()) {
        // Десктоп: копируем номер в буфер обмена и показываем уведомление
        const phone = this.getAttribute('data-phone');
        
        // Сбрасываем состояние уведомления перед копированием
        notification.classList.remove('show', 'hide');
        notification.style.display = 'none';

        navigator.clipboard.writeText(phone).then(() => {
            // Показываем уведомление после успешного копирования
            notification.style.display = 'block';
            notification.classList.add('show');
            // Запускаем анимацию исчезновения через 4 секунды
            setTimeout(() => {
                notification.classList.remove('show');
                notification.classList.add('hide');
                // После анимации полностью скрываем
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 300); // Длительность анимации
            }, 4000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            // В случае ошибки можно показать уведомление об ошибке, если нужно
        });
    } else {
        // Мобильный/планшет: открываем приложение для звонка
        window.location.href = 'tel:+89166939530';
    }
});