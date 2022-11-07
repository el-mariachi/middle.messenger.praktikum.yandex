# Messenger

## Учебный проект

### Алгоритм запуска проекта

- `npm install` уствновка зависимостей
- `npm run build` сборка проекта
- `npm start` запуск сервера для раздачи статики (после сборки)
- В браузере открыть `localhost:3000`

### Проект 1-го модуля курса Яндекс Мидл фронтенд разработчик. Статическая верстка.

[Макеты в Figma](https://www.figma.com/file/H1M5wxaCathUPea8BhefaD/Messenger-proto?node-id=0%3A1)

За основу взял макет Яндекс, кое-что изменено, все страницы отрисованы.

[Ссылка на деплой Netlify](https://luminous-douhua-0dab3c.netlify.app/)

- Страницы разбиты на компоненты, сделана декомпозиция блоков, использован паттерн «Медиатор» для связи компонентов и блоков, компоненты переиспользуются.
- Первичная валидация срабатывает на событие `blur` у инпута в соответствии с заданием.
- Формы после успешной валидации отправляют данные в консоль.
- Элементы `<label>` во всех формах скрыты. Их функциия ложится на атрибут `placeholder`. Но они отображаются при фокусе на `<input>`, или если в соотв. поле уже есть введенное значение, а значит, `placeholder` не отображается.
- Данные для отображения забиты в код. Потом будем получать их снаружи.
- Папки `src/pages/modal_*` временные — они нужны для отработки верстки модалок и будут удалены.

### Команды

- `npm run dev` запуск Parcel в режиме разработки
- `npm run build` сборка проекта
- `npm start` запуск сервера для раздачи статики (после сборки)
- `npm run start:local` запуск ts-исходника express-сервера

### Пропсы

- `settings.hasID: boolean` — нужен ли компоненту уникальный id
- `classList: string[]` — список классов для корневого тэга
- `attributes` — список атрибутов для корневого тэга
- `events` — обработчик или массив обработчиков событий для привязки к корневому элементу

### Дочерние компоненты

Вставляются в шаблон с помощью `{{{ <child-name> }}}`

### Заметки

- Корневой элемент компонента, его атрибуты и классы должны быть определены в конструкторе соответствующего ему класса (через пропсы, или явно); на него же навешиваются обработчики событий. Шаблон компонента содержит разметку для всех вложеных элементов, но не сам корневой элемент.

- Если дочерний компонент создается внутри родительского (предпочтительно в методе init()), а пропсы для дочернего компонента передаются родителю(!) снаружи (напр. `this.props.buttonText`), то родитель несет ответственность за обновление пропсов детей. Т.е. componentDidUpdate() родителя должен проверять изменение пропсов для детей и дергать, если надо, их setProps() явно.

- Пропс может быть экземпляром класса Block или одноуровневым массивом таких экземпляров. Других типов в массиве быть не должно.
