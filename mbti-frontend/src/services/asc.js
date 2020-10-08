/*eslint-disable no-async-promise-executor */
// const url = process.env.VUE_APP_SERVER;
const url = "https://1ea616f0a98f.ngrok.io/c2g-consulting/us-central1/mbti/api";

const Fetcher = async (entity, serviceUrl, method, data = null) => {
  let request;
  if (data) {
    request = await fetch(
      `${url}/${entity}${serviceUrl}`,
      {
        method,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  } else {
    request = await fetch(
      `${url}/${entity}${serviceUrl}`, 
      {
        method, 
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
  }

  return request
    .json()
    .then((rs) => rs)
    .then((res) => res)
    .then((rs) => rs)
    .catch((err) => {
      throw new Error(err);
    });
};

const FetchWrapper = async (fetchCall) =>
  navigator.onLine
    ? await Promise.race([
        fetchCall,
        new Promise((resolve, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 50000)
        ),
      ])
        .then((resp) => resp)
        .catch((err) => {
          if (
            err.message === "Timeout" ||
            err.message === "Network request failed" ||
            err.message === "Failed to fetch"
          ) {
            err.message = "Failed to make request - Please try again later";
            throw err; //TODO: optimize app by handling this exceptions
          } else {
            throw err; // rethrow other unexpected errors
          }
        })
    : await new Promise((resolve, reject) =>
        reject(new Error("You are offline - check your internet connection"))
      );

class asc {
  constructor(entity) {
    this.entity = entity;
  }
  postCalls(serviceUrl, data) {
    return FetchWrapper(Fetcher(this.entity, serviceUrl, "POST", data));
  }

  putCall(serviceUrl, data) {
    return FetchWrapper(Fetcher(this.entity, serviceUrl, "PUT", data));
  }

  getCalls(getUrl) {
    return FetchWrapper(Fetcher(this.entity, getUrl, "GET"));
  }
}

export default asc;
