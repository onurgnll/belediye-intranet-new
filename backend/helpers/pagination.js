const pagination = ({data,count, per_page,page}) => {
    const total_page = Math.ceil(count / per_page);
    const total_perpage = per_page;
    const current_page = parseInt(page);
    const previous_page = current_page == 1 ? null : current_page - 1;
    const next_page = current_page == total_page ? null : current_page + 1;

    const result = {
        result: data,
        pagination: {
            total_records: count,
            total_perpage: total_perpage,
            total_page: total_page,
            current_page,
            next_page,
            previous_page
        }
    };
    return result;
}

module.exports = {pagination};
