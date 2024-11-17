class Response {
    constructor(success, data = null, message = '') {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}

module.exports = Response;