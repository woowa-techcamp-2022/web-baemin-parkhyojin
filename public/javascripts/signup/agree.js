document.querySelector('form').addEventListener('click', (e) => {
    const {name, checked, type, classList} = e.target;
    if(name==="all-agree"){
        checkAll(checked);
    }
    if(name!=="all-agree" && type==="checkbox"){
        updateCheckbox(name, checked);
        updateAllChecked();
    }
    if(name==="all-agree" || classList.contains('agree-required')){
        updateNextEnabled();
    }
})

const checkAll = (checked) => {
    [...document.querySelectorAll('input[type="checkbox"]')].forEach(($el) => {
        $el.checked = checked;
        updateCheckbox($el.name, checked);
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

const updateCheckbox = (name, checked) => {
    if(checked) document.querySelector(`label[for="${name}"] span.checkmark`).classList.add('checked');
    else document.querySelector(`label[for="${name}"] span.checkmark`).classList.remove('checked')
}