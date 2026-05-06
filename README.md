# Geolocation Timeline

[![Build Status](https://github.com/Pavel19740404/ahj-geo-timeline/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pavel19740404/ahj-geo-timeline/actions/workflows/deploy.yml)

🔗 **[GitHub Pages — Live Demo](https://Pavel19740404.github.io/ahj-geo-timeline/)**

Текстовый таймлайн с геолокацией. Задача 1 к занятию "Geolocation, Notification, Media".

## Функциональность

- Ввод текста в поле внизу + Enter → добавляет запись в таймлайн
- Автоматически запрашивает координаты через Geolocation API
- Если геолокация недоступна → модальное окно с ручным вводом координат
- Поддерживаемые форматы: `51.50851, -0.12572` / `51.50851,-0.12572` / `[51.50851, -0.12572]`
- Записи отображаются сверху вниз (последняя — наверху)

## Запуск

```bash
npm install
npm start     # дев-сервер
npm test      # тесты
npm run build # сборка
```
