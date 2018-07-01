<h1>Web-API для игры GPS-прятки</h1>

<h3>Установка и запуск</h4>

```
yarn --ignore-engines
yarn --ignore-engines start
```

<h3>Спецификация</h4>

<h4>GET /api/create-game</h3>

<strong>Отправка настроек игры и получение игрового 
идентификатора и дополнительных данных об игре</strong>

Данные для GET запроса:

```
{
  "disclosure_position_timeout": 1000,
  "victim_count": 3,
  "predator_id": 1,
  "speed_limit": 10,
  "start_longitude": "23.234234",
  "start_latitude": "53.234234"
  }
}
```

Ответ:

```
{
  "game_id": 123
}
```

Пример:

```
GET /api/create-game?disclosure_position_timeout=10&victim_count=1&predator_id=1&speed_limit=10&start_longitude=1&start_latitude=1

Ответ: 
{
  "__v":0,
  "disclosure_position_timeout":10,
  "victim_count":1,
  "predator_id":"1",
  "status":"stop",
  "_id":"5b13f4a32b97a50bf79f996a",
  "playerCoordinates":[],
  "activeVistims":[],
  "startPosition": {
    "longitude":"1",
    "latitude":"1",
    "_id":"5b26574605914e0c3c5e0c51"
  },
  "speedLimit":10
}
```

<h4>GET /api/register-vistim</h3>

<strong>Регистрация жертв</strong>

Данные для GET запроса:

```
{
  "game_id": 123,
  "vistim_id": 3
}
```

Ответ:

```
{
  "response": "ok", // or { "response": "err" }
}
```

Пример:

```
GET /api/register-vistim?game_id=5b13f4a32b97a50bf79f996a&vistim_id=3

Ответ: 
{"response":"ok"}
```


<h4>GET /api/start-game</h3>

<strong>Отправка флага старта игры</strong>

Данные для GET запроса:

```
{
  "game_id": "5b13f4a32b97a50bf79f996a",
}
```

Ответ:

```
{
  "status": "active" // or {"response":"err"}
}
```

Пример:

```
GET /api/start-game?game_id=5b13f4a32b97a50bf79f996a

Ответ: 
{"response":"ok"}
```

<h4>GET /api/stop-game</h3>

<strong>Отправка флага остановки игры</strong>

Данные для GET запроса:

```
{
  "game_id": "5b13f4a32b97a50bf79f996a",
}
```

Ответ:

```
{
  "game_status": "stop"
}
```

<h4>GET /api/send-positions</h3>

<strong>Отправка GEO позиций</strong>

Данные для GET запроса:

```
{
  "game_id": "5b13f4a32b97a50bf79f996a",
  "player_id": "1",
  "longitude": "23.234234",
  "latitude": "53.234234",
}
```

Ответ:

```
{
  "_id":"5b13f4a32b97a50bf79f996a", // game_id
  "disclosure_position_timeout":10,
  "victim_count": 1,
  "predator_id":"1",
  "status":"active",
  "__v":0,
  "playerCoordinates":[
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f6e22b97a50bf79f996b"}
  ],
  "startPosition": {
    "longitude":"1",
    "latitude":"1",
    "_id":"5b26574605914e0c3c5e0c51"
  },
  "speedLimit":10
}
```

Пример:

```
GET /api/send-positions?game_id=5b13f4a32b97a50bf79f996a&player_id=1&longitude=23.234234&latitude=53.234234

Ответ: 
{
  "response": "ok" // or {"response":"err"}
}
```

<h4>GET /api/get-game</h3>

<strong>Получение данных игры</strong>

Данные для GET запроса:

```
{
  "game_id": 1
}
```

Ответ:

```
{
  "response": "ok" // or {"response":"err"}
}
```


Пример:

```
GET /api/get-game?game_id=5b13f4a32b97a50bf79f996a&vistim_id=1

Ответ: 
{
  "_id":"5b13f4a32b97a50bf79f996a",
  "disclosure_position_timeout":10,
  "victim_count":1,
  "predator_id":"1",
  "status":"active",
  "__v":0,
  "speedLimit":10,
  "startPosition":{"longitude":"1","latitude":"1","_id":"5b26574605914e0c3c5e0c51"},
  "playerCoordinates":[
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f6e22b97a50bf79f996b"},
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f6e82b97a50bf79f996c"},
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f7d4943f440c884b7752"},
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f803e43f470c902715a7"},
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f84e39bdef0c9bccc305"},
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f85239bdef0c9bccc306"},
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f85439bdef0c9bccc307"},
    {"latitude":"53.234234","longitude":"23.234234","player_id":"1","_id":"5b13f85639bdef0c9bccc308"}
  ],
  "activeVistims":["3"]
}
```

<h4>GET /api/catch-vistim</h3>

<strong>Отправка идентификатора пойманной жертвы. При удалении жертвы переданный 
идентификатор удаляется из массива activeVistims</strong>

Данные для GET запроса:

```
{
  "vistim_id": 1
}
```

Ответ:

```
{
  "response": "ok" // or {"response":"err"}
}
```


Пример:

```
GET /api/catch-vistim?game_id=5b13f4a32b97a50bf79f996a&vistim_id=1

Ответ: 
{"response":"ok"}
