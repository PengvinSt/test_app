import axios, { AxiosError, HttpStatusCode } from 'axios';


export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos/1',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// api.interceptors.request.use(async (config) => {
//   const session = await getSession();
//   if (session && session.user) {
//     config.headers.Authorization = `Bearer ${session.user.accessToken}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (config) => config,
//   async (error: AxiosError) => {
//     if (error.response?.status !== HttpStatusCode.Unauthorized) {
//       throw error;
//     }
   
//   }
// );
