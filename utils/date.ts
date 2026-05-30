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
    '1810s': 1815,
    '1890s': 1895,
    '1880s': 1885,
    '1000s': 1000,
  };
  return yearMap[decade] || 2023;
};

export const getEraReferenceYear = (eraId: string | null | undefined, decade?: string | null): number => {
  const eraYearMap: Record<string, number> = {
    'classic-1920s': 1925,
    'regency': 1815,
    'campfire-tales': 1925,
    'pulp-1930s': 1935,
    'gaslight-1890s': 1895,
    'western-1880s': 1885,
    'dark-ages-1000s': 1000,
    'modern-2000s': 2023,
  };

  if (eraId && eraYearMap[eraId]) return eraYearMap[eraId];
  return getYearFromDecade(decade || '');
};
