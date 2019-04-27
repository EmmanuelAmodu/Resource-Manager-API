export  function GenOrderid(pre: string) {
    const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    month_str = month > 10 ? month : "0" + month,
    day = date.getDate(),
    day_str = day > 10 ? day : "0" + day,
    secs = (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds();
    return  pre + "-" + year + "" + month_str + "" + day_str  + "-" + secs;
}