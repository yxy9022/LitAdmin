/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data);}
