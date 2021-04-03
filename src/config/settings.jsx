// export const URL = "https://projectssystems.herokuapp.com/api/";
export const URL = "http://localhost:9091/api/";


const token = localStorage.getItem("token");
export const HEADER = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
