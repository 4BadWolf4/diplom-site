// scripts.js

const STORAGE_KEY_USER = 'akadem_user';

// Плавное появление страницы
window.addEventListener('load', function () {
    document.body.classList.add('page-loaded');
});

// Плавный уход страницы при переходе по ссылкам на другие страницы
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(link => {
        const url = link.getAttribute('href');
        if (url && !url.startsWith('#') && !url.startsWith('tel:') && !url.startsWith('mailto:')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = url;
                }, 800); // синхронизировано с transition в CSS
            });
        }
    });

    // Логика для index.html (форма заказа)
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            e.target.reset();
        });
    }

    // Логика личного кабинета (cabinet.html)
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const profileSection = document.getElementById('profileSection');
    const authSection = document.getElementById('authSection');
    const logoutBtn = document.getElementById('logoutBtn');

    // Если есть элементы кабинета — включаем соответствующую логику
    if (registerForm && loginForm && profileSection && authSection && logoutBtn) {
        // Проверка, залогинен ли пользователь
        const existingUser = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
        if (existingUser) {
            showProfile(existingUser);
        }

        // Регистрация
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const user = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                password: form.password.value
            };

            if (!user.name || !user.email || !user.password) {
                alert('Заполните все поля.');
                return;
            }

            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
            alert('Регистрация прошла успешно. Теперь вы авторизованы.');
            showProfile(user);
        });

        // Вход
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const email = form.email.value.trim();
            const password = form.password.value;

            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
            if (saved && saved.email === email && saved.password === password) {
                alert('Добро пожаловать, ' + saved.name + '!');
                showProfile(saved);
            } else {
                alert('Неверный email или пароль, либо пользователь не зарегистрирован.');
            }
        });

        // Выход
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem(STORAGE_KEY_USER);
            location.reload();
        });

        function showProfile(user) {
            authSection.style.display = 'none';
            profileSection.style.display = 'block';
            document.getElementById('profileName').textContent = user.name;
            document.getElementById('profileEmail').textContent = user.email;
        }
    }
});
