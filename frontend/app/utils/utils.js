export const formatarDataHora = (date) => {
  const result = new Date(date.toNumber() * 1000);
  return result.toLocaleString();
};

export const formatTimestampDataHora = (timestamp) => {
  const data = new Date(timestamp * 1000);
  return data.toLocaleString();
};
