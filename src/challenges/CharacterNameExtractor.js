class CharacterNameExtractor {

    static run(data) {
        const name = data.Result.match(/<a.*>(.*)<\/a>/i)[1];
        return  name.replace(/\(.*\)/i, '').trim();
    }

    static getName() {
        return 'characterName';
    }
}

module.exports = CharacterNameExtractor;