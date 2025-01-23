import { useParams } from 'react-router-dom';

const User = () => {
    const { ...userID } = useParams();
    console.log(userID);
    return <h1>I'm a user with User ID: {...userID.userID}</h1>;
};

export default User;
