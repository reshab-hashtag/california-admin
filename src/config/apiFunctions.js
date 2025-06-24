
import apiClient from '../api/apiClient';


export const login = async (email, password) => {
  try {
    //console.log(apiClient);return false;
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Dashboard Data
export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create Blog
export const createBlog = async (blogData) => {
  try {
    const response = await apiClient.post("/blog/create", blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateBlog = async (id, blogData) => {
  //console.log("blogData",id) 
  try {
    const response = await apiClient.post(`/blog/update/${id}`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DeleteBlog = async (id) => {
  try {
    return await apiClient.delete(`/blog/${id}`);
  } catch (error) {
    throw error;
  }
};
export const ListBlog = async () => {
  try {
    const response = await apiClient.get('/blog/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetSingleBlog = async (id) => {
  try {
    const response = await apiClient.get(`/blog/blog-details/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addGallery = async (galleryData) => {
  try {
    const response = await apiClient.post('/gallery/add', galleryData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const listGallery = async () => {
  try {
    const response = await apiClient.get('/gallery/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteGallery = async (id) => {
  try {
    const response = await apiClient.delete(`/gallery/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const ListPages = async () => {
  try {
    const response = await apiClient.get('/page/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetPageData = async (pageslug) => {
  try {
    const response = await apiClient.get(`/page/${pageslug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updatePageData = async (pageslug, formData) => {
  try {
    const response = await apiClient.post(`/page/${pageslug}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const ListSeo = async () => {
  try {
    const response = await apiClient.get('/seo/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addSeoData = async (formData) => {
  try {
    const response = await apiClient.post(`/seo/add`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const seoPageDetails = async (id) => {
  try {
    const response = await apiClient.get(`/seo/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateSeoData = async (id, formData) => {
  try {
    const response = await apiClient.post(`/seo/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const ListFaq = async () => {
  try {
    const response = await apiClient.get(`/faq/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const addFaq = async (formData) => {
  try {
    const response = await apiClient.post(`/faq/`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateFaq = async (id, formData) => {
  try {
    const response = await apiClient.put(`/faq/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const FaqDetails = async (id) => {
  try {
    const response = await apiClient.get(`/faq/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteFaq = async (id) => {
  try {
    const response = await apiClient.delete(`/faq/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const getUserAndCompany = async () => {
  try {
    const res = await apiClient.get('/auth/company');
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUserAndCompany = async (payload) => {
  try {
    const res = await apiClient.put('/auth/update', payload);
    return res;
  } catch (error) {
    throw error;
  }
};
