<h1>Web-API для игры GPS-прятки</h1>

<h3>Установка и запуск</h4>

```
yarn --ignore-engines
yarn --ignore-engines start
```

<h3>Спецификация</h4>

<h4>POST /api/create-game</h3>

<strong>Отправка настроек игры и получение игрового 
идентификатора</strong>

Данные для POST запроса:

```
{
  "disclosure_position_timeout": 1000,
  "victim_count": 3,
  "predator_id": 1
}
```

Ответ:

```
{
  "game_id": 123
}
```

<h4>POST /api/register-vistim</h3>

<strong>Регистрация жертв</strong>

Данные для POST запроса:

```
{
  "game_id": 123,
  "vistim_id": 3
}
```

Ответ:

```
{
  "response": "ok", // todo: or error
}
```

<h4>POST /api/start-game</h3>

<strong>Отправка флага старта игры (от интерфейса хищника), если хищник 
не зарегистрирован - ошибка</strong>

Данные для POST запроса:

```
{
  "game_id": 123,
  "predator_id": 1 // для проверки подлинности
}
```

Ответ:

```
{
  "game_status": "start"
}
```

<h4>POST /api/send-positions-and-fetch</h3>

<strong>Отправка GEO позиций и получение данных игры (всех позиций
игроков)</strong>

Данные для POST запроса:

```
{
  "game_id": 123,
  "player_id": 2,
  "current_coordinates": {
    "longitude": 23.234234,
    "latitude": 53.234234,
  }
}
```

Ответ:

```
{
  "game_status": "start", // start|stop
  "predator_id": 23123, // player_id хищника
  "player_coordinates": [
    { 
      "player_id": 2,
      "longitude": 23.234234,
      "latitude": 53.234234
    },
    { 
      "player_id": 1,
      "longitude": 23.24000,
      "latitude": 52.234
    }
  ]
}
```

<h4>POST /api/catch-vistim</h3>

<strong>Отправка идентификатора пойманной жертвы (для дальнешего обрубания 
результатов в `/api/send-positions-and-fetch` (при выполнении данного запроса
указанный vistim_id - не фигурирует в массиве player_coordinates)</strong>

Данные для POST запроса:

```
{
  "game_id": 123,
  "vistim_id": 1
}
```

Ответ:

```
{
  "response": "ok"
}
```

<h4>POST /api/stop-game</h3>

<strong>Отправка флага остановки игры (от интерфейса хищника)</strong>

Данные для POST запроса:

```
{
  "game_id": 123,
  "predator_id": 1 // для проверки подлинности
}
```

Ответ:

```
{
  "game_status": "stop"
}
```
