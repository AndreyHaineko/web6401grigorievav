document.addEventListener('DOMContentLoaded', async function () {
    const reviewsContainer = document.getElementById('reviewsContainer');

    if (reviewsContainer) {
        try {
            // Отправляем GET-запрос для получения отзывов
            const response = await fetch('http://localhost:3000/reviews', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Получаем данные из ответа
                const reviews = await response.json();

                // Проверяем, есть ли отзывы
                if (reviews.length > 0) {
                    // Рендерим отзывы в контейнер
                    reviewsContainer.innerHTML = reviews
                        .map(
                            (review) => `
                                <div class="review">
                                    <p><strong>${review.email}:</strong></p>
                                    <p>${review.text}</p>
                                </div>
                            `
                        )
                        .join('');
                } else {
                    reviewsContainer.innerHTML = '<p>No feedbacks yet. Be first!</p>';
                }
            } else {
                console.error('Error1:', response.statusText);
                reviewsContainer.innerHTML = '<p>Error.</p>';
            }
        } catch (error) {
            console.error('Error2:', error);
            reviewsContainer.innerHTML = '<p>Error.</p>';
        }
    } else {
        console.error("Error3.");
    }
});
