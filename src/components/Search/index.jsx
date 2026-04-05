import React from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

function Search() {
  const { setSearchValue } = React.useContext(SearchContext);
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef();

  const testDobounce = React.useCallback();

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={onChangeValue}
      className={styles.root}
      placeholder="Поиск пиццы ..."
    />
  );
}

export default Search;
