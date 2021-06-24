const Runner = require('./Runner');
const IconUrlExtractor = require('./challenges/IconUrlExtractor');
const CharacterNameExtractor = require('./challenges/CharacterNameExtractor');
const MinAbstratLengthValidator = require('./challenges/MinAbstratLengthValidator');

const r = new Runner('https://api.duckduckgo.com/?q=simpsons%20characters&format=json&pretty=1');

r.execute(function (data) {
    return new Promise((resolve, reject) => {
        const results = {};
        if (Array.isArray(data.RelatedTopics)) {
            data.RelatedTopics.forEach(function (item) {

                // Icon URL Extractor:
                if (!results[IconUrlExtractor.getName()]) {
                    results[IconUrlExtractor.getName()] = [];
                }
                const iconUrl = IconUrlExtractor.run(item);
                if (iconUrl !== null) {
                    results[IconUrlExtractor.getName()].push(IconUrlExtractor.run(item));
                }

                // Character Name Extractor:
                if (!results[CharacterNameExtractor.getName()]) {
                    results[CharacterNameExtractor.getName()] = [];
                }
                results[CharacterNameExtractor.getName()].push(CharacterNameExtractor.run(item));
            });
        } else {
            reject('The RelatedTopics properties is not present in response.');
        }

        // Property Validator
        results[MinAbstratLengthValidator.getName()] = MinAbstratLengthValidator.validate(data);

        resolve(results);
    });
}).then(result => {
    console.log('Icons Full URL:');
    console.log(result[IconUrlExtractor.getName()].join('\n'));
    console.log();
    console.log('Character Full Name List:');
    console.log(result[CharacterNameExtractor.getName()].join(','));
    console.log();
    console.log('Property Validator: "min_abstract_length":');
    console.log(result[MinAbstratLengthValidator.getName()]);
});