import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

populateText();

function onInput(event) {
    const { name, value } = event.target;
    const formData = JSON.parse(localStorage.getItem("feedback-form-state")) || {};
    formData[name] = value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};

function populateText() {
    const getMessage = localStorage.getItem("feedback-form-state");

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
    event.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
};