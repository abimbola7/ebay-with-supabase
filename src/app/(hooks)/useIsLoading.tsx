const useIsLoading = () => {
  const eDonLoad = (bool : boolean) => {
    localStorage.setItem('isLoading', bool.toString())
    window.dispatchEvent(new Event("storage"))
  }

  return {
    eDonLoad
  }
}


export default useIsLoading;