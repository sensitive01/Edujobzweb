import { projectServices } from "../axios/axiosInstance";

export const registerEmployee = async (employeeData) => {
  try {
    const response = await projectServices.post('/signup', employeeData);
    return response;
  } catch (err) {
    throw err;
  }
};

export const registerSchool = async (employeeData) => {
  try {
    const response = await projectServices.post('/employer/signup', employeeData);
    return response;
  } catch (err) {
    throw err;
  }
};

export const loginEmployee = async (loginData) => {
  try {
    const response = await projectServices.post('/login', loginData);
    return response.data; 
  } catch (err) {
    throw err;
  }
};

export const loginSchool = async (loginData) => {
  try {
    const response = await projectServices.post('/employer/login', loginData);
    return response.data; 
  } catch (err) {
    throw err;
  }
};

export const getEmployeeDetails = async (employeeId, token) => {
  try {
    const response = await projectServices.get(`/fetchemployee/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employee details:', error);
    throw error;
  }
};

export const updateEmployeeProfile = async (id, data, token) => {
  try {
    const response = await projectServices.put(`/updateprofile/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update employee profile');
  }
};

export const uploadEmployeeFile = async (id, formData, fileType, token) => {
  try {
    const response = await projectServices.put(`/uploadfile/${id}?fileType=${fileType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload employee file');
  }
};



export const getEmployeerDetails = async (employeerId, token) => {
  try {
    const response = await projectServices.get(`/employer/fetchemployer/${employeerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employee details:', error);
    throw error;
  }
};

export const updateEmployerDetails = async (id, data, token) => {
  try {
    const response = await projectServices.put(`/employer/updateemployer/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update employer details');
  }
};

export const uploadProfilePicture  = async (id, formData, token) => {
  try {
    const response = await projectServices.put(`/employer/uploadprofilepic/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update employer details');
  }
};

export const postJob = async (jobData) => {
  try {
    const response = await projectServices.post('/employer/postjob', jobData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || 'Failed to post job';
  }
};