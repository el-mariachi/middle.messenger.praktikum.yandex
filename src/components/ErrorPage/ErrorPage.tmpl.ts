export const errorPage = `<main class="Page Page_type_not-found">
    <h5 class="OutlineHeader">myMessenger</h5>
    <div class="PageNotFound">
        <p class="PageNotFound-ErrNo">{{ errorCode }}</p>
        <h1 class="PageNotFound-ErrDesc">{{ errorMessage }}</h1>
        <a class="Link PageLink PageLink_to_login" href="/src/pages/chat_list/chat_list.handlebars">Назад к чатам</a>
    </div>
</main>`;