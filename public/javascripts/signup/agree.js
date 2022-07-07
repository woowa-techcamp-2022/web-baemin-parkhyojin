
const checkAll = (checked) => {
    [...document.querySelectorAll('input[type="checkbox"]')].forEach(($el) => {
        $el.checked = checked
    })
}
