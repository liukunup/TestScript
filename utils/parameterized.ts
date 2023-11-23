import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class Parameterized {

    private csvfile: string;
    private records;

    constructor(csvfile: string) {
        this.csvfile = csvfile;

        this.records = parse(fs.readFileSync(path.join(__dirname, this.csvfile)), {
          columns: true,
          skip_empty_lines: true
        });
    }

    public getRecords() {
        return this.records;
    }
}
