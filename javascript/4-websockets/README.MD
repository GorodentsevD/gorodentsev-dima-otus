# About

Location-based app с использованием Web Sockets

# Description

Цель:

Работа с технологией Web Sockets. Освоение Web Sockets API через выполнение практических задач.

Option 1: Location-based app с использованием Web Sockets

Создать приложение отображающее маршрут пользователя на карте. https://www.infoworld.com/article/2612668/use-mongodb-to-make-your-app-location-aware.html

Создать небольшой WebSocket Server на Node.js (Либо на https://www.npmjs.com/package/ws либо с использованием https://www.npmjs.com/package/socket.io). Примечание: Socket.io отличается наличием fallbacks на случай если Web Sockets не работают на данном устройстве
На FE создать index.html c основным скриптом и подключить к Web Socket Server.
Используя карту Leaflet, https://leafletjs.com/, отобразите местонахождение пользователя
Поменяйте местонахождение пару-тройку раз. Изменения отправляйте на Web Socket Server и сохраните в DB (вместо DB можно использовать geojson файл) с интервалом в 1 мин или чуть более.
После этого убедитесь что web sockets server правильно записало данные в файл. Создайте тропинку маршрута на карте.


Критерии оценки:
Приложения имплементируют MVP задания, в обоих случаях должны и спользоваться Web Sockets и отдельно созданный Front end script

# How to

npm start