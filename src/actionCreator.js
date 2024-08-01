import { HTTP } from "./Http.service";

export const getDetails = (params)=> {
    try {
      const url = `get-data`
      return new Promise((resolve, reject) => {
        HTTP('post', url, params)
          .then((result) => {
            resolve(result?.data)
          })
          .catch((error) => {
            reject(error);
          });
      })
    } catch (error) {
      console.log(error)
    }
  }

  export const approveFile = (params)=> {
    try {
      const url = `data_update`
      return new Promise((resolve, reject) => {
        HTTP('post', url, params)
          .then((result) => {
            resolve(result?.data)
          })
          .catch((error) => {
            reject(error);
          });
      })
    } catch (error) {
      console.log(error)
    }
  }