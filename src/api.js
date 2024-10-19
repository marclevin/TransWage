const fetchAPI = async (url, method="GET", data=null) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null
  }).then(async (response) => {
    if (method === "DELETE") return;
    if (!response.ok) {
      let errorBody = await response.json();
      return Promise.reject(errorBody.detail || errorBody || "An unknown error occurred");
    }
    return response.json();
  });
};

export { fetchAPI };