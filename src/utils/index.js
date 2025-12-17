import axios from "axios";

export const imageUpload = async (imageData) => {
  // loading true
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`,
    formData
  );
// false
  return data?.data?.display_url;
};

// save or update in db
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_api_URL}/user`,
    userData
  );

  return data;
};
