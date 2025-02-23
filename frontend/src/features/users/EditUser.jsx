import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from './usersApiSlice';
import EditUserForm from './EditUserForm';
import { PulseLoader } from 'react-spinners';

const EditUser = () => {
  const { id } = useParams();
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    }),
  });

  return user ? <EditUserForm user={user} /> : <PulseLoader color="#2E7D32" />;
};

export default EditUser;