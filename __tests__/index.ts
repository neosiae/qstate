/**
 * @jest-environment jsdom
 */

import { save, trackForm, getQState } from '../src/index';

let testContext = {
  href: '',
};

const setupMock = () => {
  Object.defineProperty(window.history, 'replaceState', {
    writable: true,
    value: jest.fn().mockImplementation((stateObject, unused, url) => {
      const hasQP = testContext.href.includes('?');
      const isReadyToDelete = testContext.href.includes('delete');

      if (hasQP) {
        if (isReadyToDelete) {
          testContext.href = url.slice(0, url.indexOf('&') + 1);
          return;
        }

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
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('saves state in query string', () => {
    const qp = { key: 'name', value: 'John' };

    save(qp);

    expect(window.history.replaceState).toHaveBeenCalled();
    expect(testContext.href).toBe('/?name=John');
  });

  it('gets state from query string', () => {
    const qp = { key: 'name', value: 'John' };

    save(qp);

    expect(getQState(testContext.href.slice(2))).toEqual({ name: 'John' });
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

  it("doesn't track elements that are excluded", () => {
    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');

    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('value', 'foo@bar.com');
    passwordInput.setAttribute('name', 'password');
    passwordInput.setAttribute('value', '123456');

    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    document.body.appendChild(form);

    trackForm(document.querySelector('form') as HTMLElement, {
      exclude: ['password'],
    });

    const inputs = document.querySelectorAll('input');

    inputs[0].focus();
    inputs[1].focus();

    expect(decodeURIComponent(testContext.href)).toBe('/?email=foo@bar.com');

    inputs[0].focus();

    expect(decodeURIComponent(testContext.href)).toBe('/?email=foo@bar.com');
  });

  it('clears the state in query string', () => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');

    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('value', 'John');
    ageInput.setAttribute('name', 'delete');
    ageInput.setAttribute('value', 'true');

    form.appendChild(nameInput);
    form.appendChild(ageInput);

    document.body.appendChild(form);

    const [_, clear] = trackForm(document.querySelector('form') as HTMLElement);

    const inputs = document.querySelectorAll('input');

    inputs[0].focus();
    inputs[1].focus();

    expect(testContext.href).toBe('/?name=John');

    inputs[0].focus();

    expect(testContext.href).toBe('/?name=John&delete=true');

    clear();

    expect(testContext.href).toBe('');
  });

  it("doesn't clear state that is already in query", () => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');

    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('value', 'John');
    ageInput.setAttribute('name', 'delete');
    ageInput.setAttribute('value', 'true');

    form.appendChild(nameInput);
    form.appendChild(ageInput);

    document.body.appendChild(form);

    const [_, clear] = trackForm(document.querySelector('form') as HTMLElement);

    const inputs = document.querySelectorAll('input');

    inputs[0].focus();
    inputs[1].focus();

    expect(testContext.href).toBe('/?name=John');

    inputs[0].focus();

    expect(testContext.href).toBe('/?name=John&delete=true');

    save({ key: 'foo', value: 'bar' });

    clear();

    expect(testContext.href).toBe('/?');
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
