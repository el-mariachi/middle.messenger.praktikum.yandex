console.log('sign_up');

import './sign_up.scss'

// TODO удалить
// временная заглушка для отладки
window.logForm = (function() {
    return function logForm(form) {
        let out = {};
        for (let el of form.elements) {
            out[el.name] = el.value;
        }
        console.log(out);
    }
})();