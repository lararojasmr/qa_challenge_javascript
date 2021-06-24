class MinAbstractLengthValidator {

    static validate(data) {
        return {
            isNull: data.meta.min_abstract_length === null,
            isNumber: data.meta.min_abstract_length === "number"
        };
    }

    static getName() {
        return 'MinAbstractLengthValidator';
    }
}

module.exports = MinAbstractLengthValidator;