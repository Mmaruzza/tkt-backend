const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fetchSinToken = (url, data, method = "GET") => {
  if (method === "GET") {
    if (data === undefined) {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
    } else {
      url = `${url}?` + new URLSearchParams(data);
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
    }
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConToken = (url, data, method = "GET") => {
  let token = localStorage.getItem("token") || "";

  if (method === "GET") {
    if (data === undefined) {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        },
      });
    } else {
      url = `${url}?` + new URLSearchParams(data);
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        },
      });
    }
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchSinTokenForm = (url, form) => {

  return fetch(url, {
    method: 'POST',
    headers: {
      "type": "formData"
    },
    body: form,
  });
};

module.exports = {
  fetchSinToken,
  fetchConToken,
  fetchSinTokenForm
};
