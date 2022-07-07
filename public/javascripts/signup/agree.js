
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

const updateNextEnabled = () => {
    const allChecked = [...document.querySelectorAll('input.agree-required')].reduce((acc, el) => {
        return el.checked? acc: false;
    }, true);
    const $nextAnchor = document.querySelector('a.next');
    if(allChecked) $nextAnchor.classList.remove('disabled')
    else $nextAnchor.classList.add('disabled')
}