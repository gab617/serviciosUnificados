function searchHeroDetail(data, id) {
  const heroDetail = data.find((hero) => hero.id == id);
  return heroDetail;
}

module.exports = { searchHeroDetail };
