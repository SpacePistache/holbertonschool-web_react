import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('getCurrentYear', () => {
  test('returns the current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear());
  });
});

describe('getFooterCopy', () => {
  test('returns Holberton School when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('returns Holberton School main dashboard when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });
});

describe('getLatestNotification', () => {
  test('returns the urgent requirement string', () => {
    expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
