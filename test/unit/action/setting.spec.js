import { Store } from '../../../src/store';
import SettingAction from '../../../src/action/setting';
import WalletAction from '../../../src/action/wallet';
import AppStorage from '../../../src/action/app-storage';

describe('Action Setting Unit Test', () => {
  let store;
  let wallet;
  let db;
  let setting;

  beforeEach(() => {
    store = new Store();
    wallet = sinon.createStubInstance(WalletAction);
    db = sinon.createStubInstance(AppStorage);
    setting = new SettingAction(store, wallet, db);
  });

  describe('setBitcoinUnit()', () => {
    it('should set a valid unit and save settings', () => {
      setting.setBitcoinUnit({ unit: 'sat' });
      expect(store.settings.unit, 'to equal', 'sat');
      expect(db.save, 'was called once');
    });

    it('should throw error on invalid unit type', () => {
      expect(
        setting.setBitcoinUnit.bind(null, { unit: 'invalid' }),
        'to throw',
        /Invalid/
      );
    });
  });

  describe('setFiatCurrency()', () => {
    it('should set a valid fiat currency and save settings', () => {
      setting.setFiatCurrency({ fiat: 'eur' });
      expect(store.settings.fiat, 'to equal', 'eur');
      expect(wallet.getExchangeRate, 'was called once');
      expect(db.save, 'was called once');
    });

    it('should throw error on invalid fiat type', () => {
      expect(
        setting.setFiatCurrency.bind(null, { fiat: 'invalid' }),
        'to throw',
        /Invalid/
      );
    });
  });
});
