export function prepareHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function isHebrew(text: string): boolean {
  const hebrewCharRegex = /[\u0590-\u05FF]/;
  const matches = text.match(hebrewCharRegex);
  return !!matches;
}
