# Orama Drive SDK

## Быстрый старт

Добавьте скрипт SDK на вашу страницу:

```html
<script src="https://cdn.jsdelivr.net/npm/orama-drive-sdk@latest/sdk.js" defer></script>
```

## Инициализация виджета

Вызовите инициализацию SDK с вашими параметрами:

```js
MyEmbed.init({
  apiKey: "PROJECT_API_KEY_123", // Ваш API-ключ - required
  user: {
    externalId: "user-5678", // Внешний ID пользователя - required
    name: "John Doe",        // Имя пользователя - optional
    email: "john@example.com" // Email пользователя - optional
  },
  onReady: function (accessToken) {
		console.log("Widget is ready. Access Token:", accessToken); // optional
		// Здесь вы можете использовать accessToken для дальнейших запросов к API
	}
});
```

## Параметры
- `apiKey` — ваш API-ключ проекта (обязательный)
- `user` — объект пользователя (обязательные поля: `externalId`)
- `onReady` — функция, вызывается при готовности виджета, возвращает accessToken

---

Подробности смотрите в документации или обращайтесь в поддержку.