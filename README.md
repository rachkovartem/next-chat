# Онлайн чат

## Next.js приложение для онлайн переписки

### Intro

Фронтенд часть веб приложения для онлайн переписки с будущими наметками полноценной социальной сети. Есть функционал запросов на добавления в друзья, индивидуальные и групповые чаты, изменение автаров пользователей, аутентификация через куки (но так как heroku не поддерживает их, заменил на ls). Локализация на русский и английский. Стили оформлены с помощтью MUI. Работает с собственным [Api](https://github.com/rachkovartem/nest.js-chat-server).
Крутится на [heroku](https://nextchat-app.herokuapp.com/), можно потестить с учеткой test@test пароль test. Ну или создать свою и добавить кого нибудь в друзья.

### Технологии и API

* JavaScript
* Nest.js
* JWT-аутентификация
* локализация с i18n
* деплой на [heroku](https://nextchat-app.herokuapp.com/)
* [бэк](https://github.com/rachkovartem/nest.js-chat-server) также полностью собственной разработки

### Функционал

* авторизация
* загрузка автатра
* переписка с пользователями
* групповые чаты
* уведомления при нахождении на страницах, отличной от окна чата
* заявки на добавления в друзья
* локализация на 2 языка
* адаптировано для любых разрешений

### Планы по доработке

* уведомления о сообщениях через service worker (уже в процессе реализации)
* оформление: доработать стили, так как дизайн оформлял на ходу, без макета
* расширить функционал до приближенного к соц. сети (полноценные профили пользователей, лента с постами и т.д.)
