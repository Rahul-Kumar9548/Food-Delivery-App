import axios from './axios';

const fetchUser = async () => {
    try {
        const { data } = await axios.get('profile/get-user')
        
        return data.user;
    } catch (error) {
        console.log(error.response);
        return error
    }
}

export default fetchUser;