import { toast } from "react-toastify";

export async function reqister(inputs) {
  toast.info("Please wait...", {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  try {
    const response = await fetch("https://backend-e-commerce-558w5gv0q-joelbobai.vercel.app/api/v1/user/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Equivalent to axios withCredentials: true
      body: JSON.stringify(inputs),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      toast.error(errorData, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(errorData);
    }
  } catch (err) {
    toast.error(err.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(err.message);
  }
}

export async function login(inputs) {
  try {
    const response = await fetch("https://backend-e-commerce-558w5gv0q-joelbobai.vercel.app/api/v1/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Equivalent to axios withCredentials: true
      body: JSON.stringify(inputs),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      toast.error(errorData, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(errorData);
    }
  } catch (err) {
    toast.error(err.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(err.message);
  }
}
