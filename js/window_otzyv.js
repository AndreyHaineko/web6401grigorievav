document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const form = document.getElementById('reviewForm');

    // Функция для открытия модального окна
    window.openModal = function () {
        if (modal) {
            modal.style.display = 'flex'; // Показываем модальное окно
        } else {
            console.error("Error.");
        }
    };

    // Функция для закрытия модального окна
    window.closeModal = function () {
        if (modal) {
            modal.style.display = 'none'; // Скрываем модальное окно
        } else {
            console.error("Error.");
        }
    };

    // Закрытие модального окна при клике вне его
    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Обработка отправки формы для сохранения отзыва через POST-запрос
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы

            // Получаем значения из полей формы
            const email = document.getElementById('email').value;
            const review = document.getElementById('review').value;

            if (email && review) {
                const reviewData = { email, review };

                try {
                    // Отправляем POST-запрос на сервер
                    const response = await fetch('http://localhost:3000/reviews', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reviewData),
                    });

                    if (response.ok) {
                        alert('Thanks!');
                        form.reset(); // Очищаем форму после отправки
                        closeModal(); // Закрываем модальное окно
                    } else {
                        alert('Error1.' + error.message);
                        console.error('Error1:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error2:', error.message);
                    alert('Error2.' + error.message);
                }
            } else {
                alert('Feel all fields.');
            }
        });
    } else {
        console.error("Error3.");
    }
});
