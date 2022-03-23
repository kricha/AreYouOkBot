import md5 from 'md5';
import moment from 'moment';
import {LANG_EN, LANG_UA} from './constants';
import {InlineKeyboardButton} from 'node-telegram-bot-api';

export const hash = (content: string) => md5((Buffer.from(md5(`${content}russianwarshipIDInaHUI`))).toString('base64'));
export const range = (start: number, end: number) => Array(end - start + 1).fill(1).map((_, idx) => (start + idx));
export const tzMinutes = range(-12, 14).map(el => el * 60);
export const buildTzKeyboardArray = () => new Promise<InlineKeyboardButton[][]>(resolve => {
    const tzKeyboard = [];
    const TzRange = range(-12, 14);
    let row = 0;
    for (const idx in TzRange) {
        if (tzKeyboard[row] === undefined) {
            tzKeyboard[row] = [];
        }
        const tzDate = moment().utcOffset(TzRange[idx]);
        // console.log(tzDate)
        tzKeyboard[row].push({
            text: tzDate.format('HH:mm MM.DD'),
            callback_data: `TZ_${tzDate.utcOffset()}`
        });
        row = (parseInt(idx) + 1) % 3 === 0 ? row + 1 : row;
    }
    resolve(tzKeyboard);
});
export const getLangKeyboard = () => {
    return [
        [
            {
                text: 'українська 🇺🇦',
                callback_data: LANG_UA
            },
            {
                text: 'english 🇬🇧',
                callback_data: LANG_EN
            }
        ]
    ];
};
