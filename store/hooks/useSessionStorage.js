const useSessionStorage = () => {
    
  const getItem = key => {
    return sessionStorage.getItem(key);
  };

  const setItem = (key, value) => {
    sessionStorage.setItem(key, value);
  };

  const removeItem = key => {
    sessionStorage.removeItem(key);
  };

  const clear = () => {
    sessionStorage.clear();
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
};

export default useSessionStorage;
