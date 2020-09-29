class ResultModel {
    constructor(msg, data) {
        this.msg = msg;
        this.data = data;
    }
}

class SuccessModel extends ResultModel {
    constructor(msg, data) {
        super(msg, data);
        this.code = 1;
    }
}

class ErrorModel extends ResultModel {
    constructor(msg, data) {
        super(msg, data);
        this.code = 0;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel,
};
