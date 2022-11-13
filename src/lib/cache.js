import { existsSync, writeFile, readFile } from "node:fs";
import { join } from "path";

export function cache(url, type) {
    return new Promise(async (resolve, reject) => {
        let filePath = join(process.cwd(), `./cache/${encodeURIComponent(url).replace(/\./g, "")}`);
        if (existsSync(filePath)) {
            readFile(filePath, "utf8", (err, data) => {
                resolve(data);
            })
        } else {
            let f = await fetch(url);
            let data;
            if (type == "text") {
                data = await f.text();
            } else if (type == "json") {
                data = JSON.stringify(await f.json());
            }
            writeFile(filePath, data.toString(), (err) => {
                resolve(data);
            })
        }
    })
}