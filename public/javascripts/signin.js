document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
    const formValid = isFormValid();
    const $emailInputErrorText = document.querySelector(`.text-input-wrapper[data-name="email"] .error-text`);
    const $passwordInputErrorText = document.querySelector(`.text-input-wrapper[data-name="password"] .error-text`);
    
    if(formValid) {
        $emailInputErrorText.classList.remove('error');
        $passwordInputErrorText.classList.remove('error');
        return;
    }
    
    e.preventDefault();
    const $emailInput = document.querySelector('input[name="email"]');
    const $passwordInput = document.querySelector('input[name="password"]');
    if(!$emailInput.value) $emailInputErrorText.classList.add('error');
    if(!$passwordInput.value) $passwordInputErrorText.classList.add('error');
})

const isFormValid = () => {
    const result = [...document.querySelectorAll('.text-input-wrapper input')].reduce((acc, $el) => {
        return $el.value? acc: false;
    }, true);
    return result;
}
