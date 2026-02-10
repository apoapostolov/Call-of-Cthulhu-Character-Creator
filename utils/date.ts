export const getYearFromDecade = (decade: string): number => {
  if (!decade) return 2023;
  const yearMap: Record<string, number> = {
    '2020s': 2023,
    '2010s': 2015,
    '2000s': 2005,
    '1990s': 1995,
    '1980s': 1985,
    '1970s': 1975,
    '1960s': 1965,
    '1950s': 1955,
    '1920s': 1925,
    '1920s-pulp': 1925,
    '1890s': 1895,
    '1880s': 1885,
    '1000s': 1000,
  };
  return yearMap[decade] || 2023;
};

