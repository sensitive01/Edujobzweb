import { projectServices } from "../axios/axiosInstance";

export const registerEmployee = async (employeeData) => {
  try {
    const response = await projectServices.post('/signup', employeeData);
    return response;
  } catch (err) {
    throw err;
  }
};

export const changeEmployerPassword = async (data) => {
  try {
    const token = localStorage.getItem('employerToken');
    const response = await projectServices.post(
      '/employer/employerchange-password',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
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

export const getAllEvents = async () => {
  try {
    const response = await projectServices.get('/employer/getallevents');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventDetails = async (eventId) => {
  try {
    const response = await projectServices.get(`/employer/details/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`/employer/updateevent/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};
export const registerForEvent = async (eventId, registrationData) => {
  try {
    const response = await projectServices.post(
      `/employer/events/${eventId}/registerevents`,
      registrationData, // Send as JSON
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};