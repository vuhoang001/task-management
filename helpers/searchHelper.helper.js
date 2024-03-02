module.exports = (query) => {
    let objectSearch = {
        keyword: "",
        regex: ""
    }

    if (query.keyword) {
        objectSearch.keyword = query.keyword

        objectSearch.regex = new RegExp(objectSearch.keyword, 'i')

    }

    return objectSearch
}