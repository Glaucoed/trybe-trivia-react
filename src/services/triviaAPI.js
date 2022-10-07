const getTriviaAPI = async () => {
  const triviaAPI = 'https://opentdb.com/api_token.php?command=request';
  const api = await fetch(triviaAPI);
  const json = await api.json();
  return json;
};

export default getTriviaAPI;
