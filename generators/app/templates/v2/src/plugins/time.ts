// @ts-ignore
import { isEmptyValue } from '/@plugins/utility';

//@ts-ignore
class Time implements Plugin.Time.Wrapper {
    _currentDate: Date = new Date();
    _timeValue: Date = this._currentDate;
    _isEmptyValue = false;
    _appendWeek = false;
    _appendFrom = false;
    _appendRecent = false;

    constructor(timeValue: string | number) {
        if (this.isEmptyValue(timeValue)) {
            return this;
        }
        this.unitType(timeValue);
        return this;
    }

    unitType(value: string | number): this {
        if (!value) {
            return this;
        }
        if (this.checkType(value) === 'timeString') {
            this._timeValue = new Date(value);
        }
        if (this.checkType(value) === 'timestamp') {
            this._timeValue = new Date(Number(value) * 1000);
        }
        return this;
    }

    checkType(value: string | number): Plugin.Time.ValueType | null {
        if (!value) {
            return null;
        }
        if (typeof value === 'number') {
            return 'timestamp';
        }
        if (/^\d+$/.test(value)) {
            return 'timestamp';
        } else {
            return 'timeString';
        }
        return null;
    }

    isEmptyValue(timeValue: string | number): boolean {
        this._isEmptyValue = isEmptyValue(timeValue);
        return this._isEmptyValue;
    }

    isTheSameYear(timeValue: Date): boolean {
        const currentYear = this._currentDate.getFullYear();
        const timeValueYear = timeValue.getFullYear();
        return currentYear === timeValueYear;
    }

    getRecentlyDayName(timeValue: Date = this._timeValue): string {
        const timeValueBeginTimestamp = new Date(timeValue).setHours(0, 0, 0, 0);
        const todayBeginTimestamp = this._currentDate.setHours(0, 0, 0, 0);
        const namePreset: Record<string | number, string> = {
            '-86400000': '昨天',
            0: '今天',
            86400000: '明天'
        };
        return ` ${namePreset[timeValueBeginTimestamp - todayBeginTimestamp] || '非近几日'}`;
    }

    getWeek(timeValue: Date): string {
        const presetWeekNames = ['日', '一', '二', '三', '四', '五', '六'];
        const week = timeValue.getDay();
        return ` 周${presetWeekNames[week]}`;
    }

    append(appendExtraFormat: 'week' | 'from' | 'recent' | ('week' | 'from' | 'recent')[]): this {
        if (Array.isArray(appendExtraFormat)) {
            appendExtraFormat.forEach((item) => {
                item === 'week' && (this._appendWeek = true);
                item === 'from' && (this._appendFrom = true);
                item === 'recent' && (this._appendRecent = true);
            });
        } else {
            appendExtraFormat === 'week' && (this._appendWeek = true);
            appendExtraFormat === 'from' && (this._appendFrom = true);
            appendExtraFormat === 'recent' && (this._appendRecent = true);
        }
        return this;
    }

    format(format: 'date' | 'datetime' | 'time' | 'full' | string) {
        if (this._isEmptyValue) {
            return '';
        }
        let template: string = format;
        if (['date', 'datetime', 'time', 'full'].includes(format)) {
            const isTheSameYear = this.isTheSameYear(this._timeValue);
            switch (format) {
                case 'date': {
                    template = isTheSameYear ? 'mm月dd日' : 'yyyy年mm月dd日';
                    break;
                }
                case 'datetime': {
                    template = isTheSameYear ? 'mm月dd日 hh:MM' : 'yyyy年mm月dd日 hh:MM';
                    break;
                }
                case 'time': {
                    template = 'hh:MM:ss';
                    break;
                }
            }
        }
        if (this._appendWeek) {
            template += this.getWeek(this._timeValue);
        }
        if (this._appendRecent) {
            template += this.getRecentlyDayName(this._timeValue);
        }
        if (this._appendFrom) {
            // @ts-ignore
            return uni.$u.timeFrom(this._timeValue.getTime(), template);
        }
        // @ts-ignore
        return uni.$u.timeFormat(this._timeValue, template);
    }
}

export default Time;
