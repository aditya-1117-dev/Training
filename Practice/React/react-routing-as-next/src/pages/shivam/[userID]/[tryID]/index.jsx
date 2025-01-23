import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { ...userID } = useParams();
    console.log(userID);
    return (
        <>
            <h1>User ID: {...userID.userID}</h1>
            <h1>tryID ID: {...userID.tryID}</h1>
        </>
    );
};

export default UserPage;
