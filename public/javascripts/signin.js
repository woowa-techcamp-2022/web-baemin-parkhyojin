const isFormValid = () => {
    const result = [...document.querySelectorAll('.text-input-wrapper input')].reduce((acc, $el) => {
        return $el.value? acc: false;
    }, true);
    return result;
}
