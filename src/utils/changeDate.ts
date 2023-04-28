const changeDate = (date: any) => {
    let dates = new Date(date)
    let day = dates.getDate()
    let month = dates.toLocaleString('default', { month: 'long' });
    let year = dates.getFullYear();

    return day + " " + month + " " + year

}

export default changeDate;