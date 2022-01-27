import axios from 'axios';
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from './action';

export function fetchData() {
    return (dispatch) => {
        dispatch(fetchDataRequest());
        axios
            .get(
                'https://api.publicapis.org/entries',
            )
            .then((response) => {
                dispatch(fetchDataSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchDataError(error));
            });
    };
}
