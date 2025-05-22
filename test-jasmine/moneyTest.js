import { formatCurrency } from "../scripts/utils/money.js";

describe('Test suite: formatCurrency', () =>  {
    it('Convert cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Rounds up to nearest cents', () => {
        expect(formatCurrency(200.5)).toEqual('2.01');
        expect(formatCurrency(200.4)).toEqual('2.00');
    });
});