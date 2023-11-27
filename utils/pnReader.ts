import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// 电话号码读取类
abstract class PhoneNumberReader {
    // 原始读取数据
    protected rawData: string;

    // 电话号码列表
    protected pnList: string[];

    // 获取原始读取数据
    abstract getRawData(): string;

    // 获取电话号码列表
    abstract getPhoneNumberList(): string[];
}

// 从环境变量中读取电话号码
export class envPhoneNumberReader extends PhoneNumberReader {

    getRawData() {
        this.rawData = process.env.PHONE_NUMBER_LIST as string;
        return this.rawData;
    }

    getPhoneNumberList(): string[] {
        this.pnList = this.getRawData()?.split(",");
        return this.pnList;
    }
}

// 从CSV文件中读取电话号码
export class csvPhoneNumberReader extends PhoneNumberReader {

    private csvFile: string;

    constructor(csvFile: string) {
        super();
        // 获取CSV文件名
        this.csvFile = csvFile;
    }

    getRawData() {
        this.rawData = fs.readFileSync(path.join(__dirname, this.csvFile), {encoding: "utf-8"});
        return this.rawData;
    }

    getPhoneNumberList(): string[] {
        const tmpList = parse(this.getRawData(), {
            columns: true,
            skip_empty_lines: true
        });
        this.pnList = tmpList.reduce((arr, obj) => {
            arr.push(obj.pn);
            return arr;
        }, new Array<string>);
        return this.pnList;
    }
}
