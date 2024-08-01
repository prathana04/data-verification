import axios from 'axios';

export function HTTP(method, uri, data, headers = null, fullUrl) {
    return new Promise((resolve, reject) => {
        let url;
        if (!uri && fullUrl) {
            url = fullUrl;
        } else {
            url = `${process.env.REACT_APP_API_URL || "http://192.168.1.49:5000/"}${uri}`.trim();
        }

        const query = {
            method: method,
            url: url
        }

        if (headers != null) {
            query.headers = headers;
        }
        if (method === 'post' || method === 'put' || method === 'delete'|| method === 'PATCH') {
            query.data = data;
        }
        axios(query).then(function(response) {
          resolve(response);
        })
        .catch((error) => {
            reject(error)
        })
    })
}