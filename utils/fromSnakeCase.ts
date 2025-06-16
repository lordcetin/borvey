export const fromSnakeCase = (str: string): string => {
  // Önekleri temizle
  const cleaned = str.replace(/^(basic|standart|premium)-/, "");

  // "-" ile ayrılmış kelimeleri boşlukla birleştir
  const words = cleaned.split("-").map(word => word.toLowerCase());

  // İlk harfi büyük yap, geri kalanı küçük tut
  if (words.length === 0) return "";

  const [first, ...rest] = words;
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" ");
};