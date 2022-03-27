import deepmerge from './deepmerge';

describe('deepmerge', () => {
  it('should not be subject to prototype pollution', () => {
    deepmerge(
      {},
      JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'),
      {
        clone: false,
      }
    );

    expect({}).not.toHaveProperty('isAdmin');
  });

  it('should not merge HTML elements', () => {
    const element = document.createElement('div');
    const element2 = document.createElement('div');

    const result = deepmerge({ element }, { element: element2 });

    expect(result.element).toEqual(element2);
  });

  it('should reset source when target is undefined', () => {
    const result = deepmerge(
      {
        '&.disabled': {
          color: 'red',
        },
      },
      {
        '&.disabled': undefined,
      }
    );
    expect(result).toEqual({
      '&.disabled': undefined,
    });
  });

  it('should merge keys that do not exist in source', () => {
    const result = deepmerge(
      { foo: { baz: 'test' } },
      { foo: { bar: 'test' }, bar: 'test' }
    );
    expect(result).toEqual({
      foo: { baz: 'test', bar: 'test' },
      bar: 'test',
    });
  });
});
