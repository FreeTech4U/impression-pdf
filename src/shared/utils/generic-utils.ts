export const getCurrentFormattedDate = ():string=> {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // AA (les deux derniers chiffres de l'année)
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // MM (mois, avec 0 devant si nécessaire)
  const day = now.getDate().toString().padStart(2, '0'); // JJ (jour, avec 0 devant si nécessaire)
  const hours = now.getHours().toString().padStart(2, '0'); // HH (heures, avec 0 devant si nécessaire)
  const minutes = now.getMinutes().toString().padStart(2, '0'); // MM (minutes, avec 0 devant si nécessaire)
  const seconds = now.getSeconds().toString().padStart(2, '0'); // SS (secondes, avec 0 devant si nécessaire)

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
