import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    emailInput: document.querySelector('[name="email"]'),
    messageInput: document.querySelector('[name="message"]'),
}

const FEEDBACK_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

populateText();

function onInput(event) {
    const { name, value } = event.target;
    const formData = JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || {};
    formData[name] = value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
};

function populateText() {
    const getMessage = localStorage.getItem(FEEDBACK_KEY);

    if (getMessage) {
        const getObject = JSON.parse(getMessage);
        if (getObject) {
            Object.keys(getObject).forEach((key) => {
                refs.form.elements[key].value = getObject[key];
            });
        }
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(refs.form);
    formData.forEach((value, key) => {
        console.log(key, value);
    });

    if (refs.emailInput.value  === ''|| refs.messageInput.value === '') {
    return alert ('Заполните все поля');
    };

    event.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_KEY);
};