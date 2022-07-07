
const checkAll = (checked) => {
    [...document.querySelectorAll('input[type="checkbox"]')].forEach(($el) => {
        $el.checked = checked
    })
}

const updateAllChecked = () => {
    const allChecked = [...document.querySelectorAll('input[type="checkbox"]')].reduce((acc, $el) => {
        if($el.id==="all-agree" || $el.checked) return acc;
        return false;
    }, true);
    document.querySelector('#all-agree').checked = allChecked;
}
