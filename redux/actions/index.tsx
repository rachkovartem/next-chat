export const setFilteredData = (value: {_id: any, text: string, ready: boolean}[]) => {
    return {
        type: 'SET_FILTERED_DATA',
        payload: value
    }
}