import instance from "../../core/Axios/Axios";

export const methodPostService = (url: string, params: unknown) => {
  return instance
    .post(url, params)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
};

export const methodGetService = (url: string) => {
  return instance
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
};

export const methodPutService = (url: string) => {
  return instance
    .put(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
};

export const methodDeleteService = (url: string) => {
  return instance
    .delete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
};
