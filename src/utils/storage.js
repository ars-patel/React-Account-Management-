// src/utils/storage.js
export const saveUser = (data) => {
  try {
    localStorage.setItem("react_user", JSON.stringify(data));
  } catch (err) {
    console.error("saveUser error:", err);
  }
};

export const getUser = () => {
  try {
    const data = localStorage.getItem("react_user");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("getUser error:", err);
    return null;
  }
};

export const removeUser = () => {
  try {
    localStorage.removeItem("react_user");
  } catch (err) {
    console.error("removeUser error:", err);
  }
};