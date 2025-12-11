import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`,
    formData
  );

  return data?.data?.display_url;
};

// save or update in db
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post("http://localhost:3000/user", userData);

  return data;
};
