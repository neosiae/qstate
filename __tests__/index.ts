/**
 * @jest-environment jsdom
 */

import { save, trackForm } from '../src/index';

let testContext = {
  href: '',
};

const setupMock = () => {
  Object.defineProperty(window.history, 'replaceState', {
    writable: true,
    value: jest.fn().mockImplementation((stateObject, unused, url) => {
      const hasQP = testContext.href.includes('?');

      if (hasQP) {
        testContext.href = `${testContext.href}&${url.slice(2)}`;
      } else {
        testContext.href = url;
      }
    }),
  });
};

describe('qState', () => {
  beforeEach(() => {
    setupMock();
  });

  afterEach(() => {
    testContext = { href: '' };
  });

  it('saves state in query string', () => {
    const qp = { key: 'name', value: 'John' };

    save(qp);

    expect(window.history.replaceState).toHaveBeenCalled();
    expect(testContext.href).toBe('/?name=John');
  });

  it('tracks form and saves state in query string', () => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');

    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('value', 'John');
    ageInput.setAttribute('name', 'age');
    ageInput.setAttribute('value', '29');

    form.appendChild(nameInput);
    form.appendChild(ageInput);

    document.body.appendChild(form);

    trackForm(document.querySelector('form') as HTMLElement);

    const inputs = document.querySelectorAll('input');

    inputs[0].focus();
    inputs[1].focus();

    expect(testContext.href).toBe('/?name=John');

    inputs[0].focus();

    expect(testContext.href).toBe('/?name=John&age=29');
  });

  it('throws an error when passed null or undefined', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => save(null)).toThrowError(
      'QueryParametar should not be empty. Please pass a valid object.',
    );
  });

  it('throws an error when passed invalid reference', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => trackForm(null)).toThrowError(
      'Reference is not defined. Please pass a valid reference.',
    );
  });
});
