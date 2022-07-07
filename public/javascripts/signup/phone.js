const addDashToPhoneNum = (value) => {
    const numString = value.replace(/[^0-9]/g, "");
    const result = numString.split("").reduce((acc, curr) => {
        if(acc.length===3 || acc.length===8) return acc + "-" + curr;
        return acc + curr;
    }, "").slice(0, 13)
    value = result;
}

const isPhoneNumValid = (value) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(value)
}

