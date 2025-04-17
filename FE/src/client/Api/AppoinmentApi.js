import client from '../Client';
const addAppointment = async appointmentData => {
    try {
      const response = await client('Appointment/Create', 'POST', appointmentData);
      return response;
    } catch (error) {
      console.error('Error Fetching Appointment: ', error);
      return {
        statusCode: 500,
        message: 'Server error. Please try again later.'
      };
    }
  };
  const getAllAppointment = async () => {
    try {
      const response = await client('Appointment/GetAll', 'GET');
      return response.data;
    } catch (error) {
      console.error('Error Fetching Appointment:', error);
      return [];
    }
  };
  const updateAppointment = async (appointmentData) => {
    try {
        const response = await client('Appointment/UpdateRequest', 'POST', appointmentData);
        return response;
    } catch (error) {
        console.error('Error Updating Appointment:', error);
        return {
            statusCode: 500,
            message: 'Server error. Please try again later.'
        };
    }
};
const addReview = async ReviewData => {
  try {
    const response = await client('Review/Create', 'POST', ReviewData);
    return response;
  } catch (error) {
    console.error('Error Fetching Review: ', error);
    return {
      statusCode: 500,
      message: 'Server error. Please try again later.'
    };
  }
};
const getAllReview = async () => {
  try {
    const response = await client('Review/GetAllReview', 'GET');
    return response.data;
  } catch (error) {
    console.error('Error Fetching Review:', error);
    return [];
  }
};
const userLogin = async payload => {
  try {
    const response = await client('Login/login', 'POST', payload);

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
  export { addAppointment,getAllAppointment,updateAppointment,userLogin,getAllReview,addReview};