import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const testDobounce = React.useCallback();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      console.log(str);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={onChangeInput}
      className={styles.root}
      placeholder="Поиск пиццы ..."
    />
  );
}

export default Search;
