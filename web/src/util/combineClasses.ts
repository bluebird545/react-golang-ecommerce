interface IBoolObj {
  [key: string]: boolean;
}

interface IDefaultObj {
  options: IBoolObj;
  default: string;
  use?: boolean;
}

interface IToggleClass {
  value: boolean;
  true: string;
  false: string;
}

type Classes = (string | IBoolObj | IToggleClass | IDefaultObj)[];

export function isToggleClass(c: string | IBoolObj | IToggleClass | IDefaultObj): c is IToggleClass {
  if (
    c &&
    typeof c !== 'string' &&
    c.hasOwnProperty('value') &&
    c.hasOwnProperty('true') &&
    c.hasOwnProperty('false')
  ) {
    return true;
  }
  return false;
}

export function isDefaultClass(c: string | IBoolObj | IToggleClass | IDefaultObj): c is IDefaultObj {
  if (c && typeof c !== 'string' && c.hasOwnProperty('options') && c.hasOwnProperty('default')) {
    return true;
  }
  return false;
}

export function isBoolClass(c: string | IBoolObj | IToggleClass | IDefaultObj): c is IBoolObj {
  if (c && typeof c === 'object') {
    if (isToggleClass(c) || isDefaultClass(c)) {
      return false;
    }

    for (const key in c) {
      if (typeof c[key] !== 'boolean') {
        return false;
      }
    }

    return true;
  }
  return false;
}

/**
 *  Combine array of strings or objects into a class string
 *
 * @example
 * // returns "test1 test2"
 * combineClasses('test1', 'test2')
 *
 * @example
 * // returns "test1 test3"
 * combineClasses('test1',{'test2': false}, {'test3': true})
 *
 * @example
 * // returns "test2 test3"
 * combineClasses({value: false, true: 'test1', false: 'test2'}, {'test3': true})
 */
export default function combineClasses(...classes: Classes): string {
  return classes
    .reduce((f, c) => {
      // String Type
      if (typeof c === 'string') {
        f.push(c);
      } else if (isToggleClass(c)) {
        f.push(c.value ? c.true : c.false);
      } else if (isDefaultClass(c)) {
        if (typeof c.use === 'boolean' && !c.use) {
          return f;
        }
        const classNames = Object.keys(c.options);

        let added = false;

        for (const i of classNames) {
          if (c.options[i]) {
            f.push(i);
            added = true;
            break;
          }
        }

        if (!added) {
          f.push(c.default);
        }
      } else if (isBoolClass(c)) {
        const out = Object.keys(c)
          .reduce((filtered, optionalClass) => {
            if (c[optionalClass]) {
              filtered.push(optionalClass.trim());
            }
            return filtered;
          }, [])
          .join(' ');

        if (out !== '') {
          f.push(out);
        }
      } else if (typeof c === 'undefined') {
        f.push('');
      } else {
        throw new Error('CombineClasses type is not supported. Check your arguments');
      }
      return f;
    }, [])
    .join(' ')
    .trim();
}
