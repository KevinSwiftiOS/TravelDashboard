var funcs = {
    PrefixInteger: function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    },

    getDay: function (date, subDay) {
        var newDate = date.setDate(date.getDate() - subDay);
        newDate = new Date(newDate);
        return newDate.getFullYear() + "-" + this.PrefixInteger(newDate.getMonth() + 1, 2) + "-" +
            this.PrefixInteger(newDate.getDate(), 2);
    },
}
export {
    funcs
}