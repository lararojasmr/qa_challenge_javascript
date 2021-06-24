class IconUrlExtractor {

    static run(data) {
        if (IconUrlExtractor.ALLOW_EMPTY_URL || (typeof data.Icon.URL === "string" && data.Icon.URL.trim().length > 0)) {
            const url = new URL(data.FirstURL);

            return `${url.protocol}//${url.host}${data.Icon.URL}`;
        }
        return null;
    }

    static getName() {
        return 'iconUrl';
    }
}
IconUrlExtractor.ALLOW_EMPTY_URL = false;

module.exports = IconUrlExtractor;