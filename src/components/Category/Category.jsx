function Category({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Category;
