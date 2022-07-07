const addDashToPhoneNum = (value) => {
    const numString = value.replace(/[^0-9]/g, "");
    const result = numString.split("").reduce((acc, curr) => {
        if(acc.length===3 || acc.length===8) return acc + "-" + curr;
        return acc + curr;
    }, "").slice(0, 13)
    value = result;
}
