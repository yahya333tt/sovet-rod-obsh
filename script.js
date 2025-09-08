document.addEventListener('DOMContentLoaded', () => {
    // --- Карусель ---
    // Получение всех слайдов карусели
    const slides = document.querySelectorAll('.carousel-slide');
    // Получение контейнера для точек навигации
    const dotsContainer = document.querySelector('.dots-container');
    // Получение кнопок "назад" и "вперёд"
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    // Индекс текущего слайда
    let currentIndex = 0;

    // Создание точек для навигации по слайдам
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Получение всех точек навигации
    const dots = document.querySelectorAll('.dot');

    // Функция перехода к указанному слайду
    function goToSlide(index) {
        currentIndex = index;
        document.querySelector('.carousel-slides').style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    // Функция обновления активной точки навигации
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Обработчик клика по кнопке "назад"
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    });

    // Обработчик клика по кнопке "вперёд"
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    });

    // --- Прокрутка к началу страницы при клике на кнопку .up ---
    const upButton = document.querySelector('.up');
    if (upButton) {
        upButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Обработка клика по номеру телефона ---
    // Получение элемента с номером телефона
    const phoneElement = document.querySelector('.phone');
    // Получение элемента уведомления о копировании
    const notification = document.getElementById('copyNotification');

    // Функция проверки, является ли устройство мобильным или планшетом
    function isMobileOrTablet() {
        return window.innerWidth <= 1024;
    }

    // Обработчик клика по номеру телефона
    if (phoneElement) {
        phoneElement.addEventListener('click', function() {
            if (!isMobileOrTablet()) {
                // Копирование номера телефона на десктопе
                const phone = this.getAttribute('data-phone');
                notification.classList.remove('show', 'hide');
                notification.style.display = 'none';

                navigator.clipboard.writeText(phone).then(() => {
                    notification.style.display = 'block';
                    notification.classList.add('show');
                    setTimeout(() => {
                        notification.classList.remove('show');
                        notification.classList.add('hide');
                        setTimeout(() => {
                            notification.style.display = 'none';
                        }, 300);
                    }, 4000);
                }).catch(err => {
                    console.error('Ошибка копирования: ', err);
                });
            } else {
                // Переход к звонку на мобильных устройствах
                window.location.href = 'tel:+89166939530';
            }
        });
    }

    // --- Изменение размеров блоков ---
    // Получение всех элементов с классом .bloc
    const blocs = document.querySelectorAll('.bloc');
    
    // Установка размеров блоков в соответствии с изображениями
    blocs.forEach(bloc => {
        const img = bloc.querySelector('img');
        if (img) {
            img.onload = () => {
                const computedStyle = window.getComputedStyle(img);
                const actualWidth = parseFloat(computedStyle.width);
                const actualHeight = parseFloat(computedStyle.height);
                
                bloc.style.width = actualWidth + 'px';
                bloc.style.height = actualHeight + 'px';
            };
            if (img.complete) img.onload();
        }
    });

    // --- Переключение текста в элементах p2 ---
    // Получение всех элементов p2 в блоках .Bloc-b
    const p2Elements = document.querySelectorAll('.Bloc-b .p2');
    // Обработчик клика для разворачивания/сворачивания текста
    p2Elements.forEach(p2 => {
        p2.addEventListener('click', () => {
            p2.classList.toggle('expanded');
        });
    });

    // --- Горизонтальная прокрутка для блока .KAR-NOV ---
    // Получение элемента .KAR-NOV
    const karNov = document.querySelector('.KAR-NOV');
    if (karNov) {
        // Обработчик события прокрутки колёсиком мыши
        karNov.addEventListener('wheel', function(e) {
            e.preventDefault();
            karNov.scrollLeft += e.deltaY;
        });
    }

    // --- Функция пересчёта размеров блоков ---
    function recalculateBlocSizes() {
        blocs.forEach(bloc => {
            const img = bloc.querySelector('img');
            if (img) {
                const computedStyle = window.getComputedStyle(img);
                const actualWidth = parseFloat(computedStyle.width);
                const actualHeight = parseFloat(computedStyle.height);
                
                bloc.style.width = actualWidth + 'px';
                bloc.style.height = actualHeight + 'px';
            }
        });
    }

    // Пересчёт размеров блоков при изменении размера окна
    window.addEventListener('resize', recalculateBlocSizes);
});