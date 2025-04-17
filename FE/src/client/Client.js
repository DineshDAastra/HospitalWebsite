import axios from 'axios';

// const client = async (url, method, body) => {
//   try {
//     const config = {
//       url: `${import.meta.env.VITE_BASE_API_URL}/${url}`,
//       method: method,
//       headers: {
//         accept: '*/*',
//         'content-type':
//           body instanceof FormData ? 'multipart/form-data' : 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('authToken')}`
//       },
//       data: body
//     };

//     const response = await axios(config);

//     return {
//       data: response.data,
//       statusCode: response.data.statusCode,
//       message: response.data.message
//     };
//   } catch (error) {
//     console.error('API call failed:', error.message);
//     return {
//       message: error.response?.data?.message,
//       statusCode: error.response?.status || 500
//     };
//   }
// };
const client = async (url, method, body) => {
  try {
    const config = {
      url: `${import.meta.env.VITE_BASE_API_URL}/${url}`,
      method: method,
      headers: {
        accept: '*/*',
        'content-type':
          body instanceof FormData ? 'multipart/form-data' : 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      data: body
    };

    const response = await axios(config);

    return {
      success: response.data?.statusCode === 200, 
      data: response.data,
      statusCode: response.data.statusCode,
      message: response.data.message
    };
  } catch (error) {
    console.error('API call failed:', error.message);
    return {
      success: false, 
      message: error.response?.data?.message,
      statusCode: error.response?.status || 500
    };
  }
};

export default client;
