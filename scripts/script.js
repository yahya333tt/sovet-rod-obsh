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

    const projectBody = document.querySelector('.project-body');
    if (projectBody) {
         projectBody.addEventListener('wheel', function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      projectBody.scrollLeft += e.deltaY;
    }
  }, { passive: false });
}


document.addEventListener('DOMContentLoaded', () => {
    const projectBody = document.querySelector('.project-body');
    if (projectBody) {
        projectBody.addEventListener('wheel', (event) => {
            event.preventDefault();
            projectBody.scrollLeft += event.deltaY * 3;
        });
    }
});
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

    


});

function toggleText(textElement) {
    const isExpanded = textElement.classList.contains('expanded');
    if (isExpanded) {
        textElement.classList.remove('expanded');
        textElement.textContent = textElement.textContent.substring(0, 100) + '...';
    } else {
        textElement.classList.add('expanded');
        textElement.textContent = textElement.getAttribute('data-full-text');
    }
}

// Удалён дублирующийся обработчик без проверки на существование .project-body


// Удалена альтернативная загрузка хедера через абсолютный путь,
// чтобы избежать гонок и проблем с путями на разных страницах

  function initHeaderSearch() {
    var searchBtn = document.getElementById('search-button');
    var navBtns = document.getElementById('nav-buttons');
    var searchInput = document.getElementById('search-input-container');
    var closeBtn = document.getElementById('close-search');
    var headerSecond = document.querySelector('.header-second');
  
    if (searchBtn && navBtns && searchInput && headerSecond) {
      searchBtn.addEventListener('click', function() {
        navBtns.style.display = 'none';
        searchBtn.style.display = 'none';
        searchInput.style.display = 'flex';
        searchInput.querySelector('input').focus();
        headerSecond.classList.add('align-left');
      });
    }
    if (closeBtn && navBtns && searchBtn && searchInput && headerSecond) {
      closeBtn.addEventListener('click', function() {
        navBtns.style.display = '';
        searchBtn.style.display = '';
        searchInput.style.display = 'none';
        searchInput.querySelector('input').value = '';
        headerSecond.classList.remove('align-left');
      });
    }
  }


function includeHTML(id, url, callback) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
        if (typeof callback === 'function') callback();
      });
}

includeHTML('header', '../page/header.html', initHeaderSearch);
includeHTML('footer', '../page/footer.html');



