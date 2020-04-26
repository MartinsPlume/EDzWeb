import authHeader from '../authorization/AuthHeader'

export const fetchingService = {
    fetchExercises
};

async function fetchExercises(){

    

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(getExercises, requestOptions)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
}

export const getExercises = 'https://localhost:5001/api/Exercises'