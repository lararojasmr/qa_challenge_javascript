const https = require('https');

class Runner {
    constructor(url) {
        this.url = new URL(url);
    }

    execute(predicateFnc) {
        const target = this.url;
        return new Promise((resolve, reject) => {
            https.get(target, res => {
                let body = "";

                res.on("data", (chunk) => {
                    body += chunk;
                });

                res.on("end", () => {
                    try {
                        predicateFnc.apply(null, [JSON.parse(body)])
                            .then(resolve)
                            .catch(reject);
                    } catch (error) {
                        reject(error.message);
                    }
                });
            }).on('error', error => {
                reject(error);
            });
        });
    }
}

module.exports = Runner;