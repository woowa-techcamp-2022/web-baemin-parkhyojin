const addDashToPhoneNum = (value) => {
    const numString = value.replace(/[^0-9]/g, "");
    const result = numString.split("").reduce((acc, curr) => {
        if(acc.length===3 || acc.length===8) return acc + "-" + curr;
        return acc + curr;
    }, "").slice(0, 13);
    return result;
}

const isPhoneNumValid = (value) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(value)
}

const updateCheckmark = (name, checked) => {
    const $checkMark = document.querySelector(`.text-input-wrapper[data-name="${name}"] span.checkmark`);
    if (checked) {
        $checkMark.classList.add('valid');
        return;
    }
    $checkMark.classList.remove('valid');
}

const enableCertNumButton = (enabled) => {
    const $certNumButton = document.querySelector('button.secondary-button');
    $certNumButton.disabled = !enabled;
}

const showCertNumUI = () => {
    document.querySelector('.text-input-wrapper[data-name="certNum"]').style.display="flex";
    document.querySelector('button.primary.text-button').style.display="block";
}

const setCertNum = ($input) => {
    const timerId = setTimeout(() => {
        $input.value = getCertNum(4);
        enableNext();
        clearTimeout(timerId);
    }, 2000);
}

const enableNext = () => {
    updateCheckmark('certNum', true);
    enableNextAnchor(true);
}

const initCertNum = ($input) => {
    $input.value = "";
    enableNextAnchor(false);
    updateCheckmark('certNum', false);
}

const updateCertNum = ($input) => {
    initCertNum($input);
    setCertNum($input);
}

