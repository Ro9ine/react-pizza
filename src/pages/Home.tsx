import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';

import { list } from '../components/Sort/Sort';

import Card from '../components/Card/Card';
import Category from '../components/Category/Category';
import Sort from '../components/Sort/Sort';
import CardSkeleton from '../components/Card/CardSkeletonBlock';
import Pagination from '../components/Pagination';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const foundSort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          searchValue: searchValue,
          categoryId: Number(params.categoryId) || 0,
          currentPage: Number(params.currentPage) || 1,
          sort: foundSort || list[0],
        }),
      );

      isSearch.current = true;
    }
  }, []);

  const fetchPizza = async () => {
    const sortProperty = sort?.sortProperty || 'rating';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        currentPage,
        categoryId,
        sortProperty,
      }),
    );

    // const res = await axios.get(`https://69bd240a2bc2a25b22ad7544.mockapi.io/items?page=${currentPage}&limit=4&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortProperty}&order=desc`);

    // setItems(res.data);
    // setstatus(false);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizza();
    }

    isSearch.current = false;
  }, [categoryId, currentPage, sort, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sort]);
  const skeletons = [...new Array(8)].map((_, index) => <CardSkeleton key={index} />);
  const pizzas = items
    .filter((obj: any) => {
      if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => (
      <Card
        id={obj.id}
        key={obj.id}
        title={obj.name}
        price={obj.price}
        image={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));

  return (
    <div className="container">
      <div className="content__top">
        <Category value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div>
          <h2>'Произошла какая-то ошибка :(' </h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
