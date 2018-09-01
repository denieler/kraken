const getList = state => state.list

export const getIsLoading = state => getList(state).isLoading
export const getFiles = state => getList(state).files
