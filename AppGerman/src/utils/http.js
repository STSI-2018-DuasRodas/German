const axios = require('axios');

export const get = ({ url, headers = {} }) => axios.get(url, { headers: { 'authorization': localStorage.getItem('token')}});

export const remove = ({ url, headers = {} }) => axios.delete(url, { headers: { 'authorization': localStorage.getItem('token')}});

export const post = ({ url, body = {}, headers = {} }) => axios.post(url, body, { headers: { 'authorization': localStorage.getItem('token')}});

export const put = ({ url, body = {}, headers = {} }) => axios.put(url, body, { headers: { 'authorization': localStorage.getItem('token')}});

export const patch = ({ url, body = {}, headers = {} }) => axios.patch(url, body, { headers: { 'authorization': localStorage.getItem('token')}});