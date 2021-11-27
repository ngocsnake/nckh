module.exports = function sortable(column, sort) {
    const sortType = column === sort.column ? sort.type : 'default';

    const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending'
    };


    const icon = icons[sortType];

    const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
    };


    const type = types[sortType];

    return `<a href="?_sort&column=${column}&type=${type}"><span class="${icon} ml-1"></span></a>`;
}