class CharacterNameExtractor {

    static run(data) {
        return data.Result.match(/<a.*>(.*)<\/a>/i)[1];
    }

    static getName() {
        return 'characterName';
    }
}

module.exports = CharacterNameExtractor;