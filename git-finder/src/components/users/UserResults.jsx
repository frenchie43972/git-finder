import { useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

// UserResults renders a list of users based off of data passed to it
// from the GithubContext context.
// The useContext hook accesses users and loading props and the data
// therein from the context 

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  // If the page is not waiting to load it will execute the results else
  // you will see the Spinner component
  if(!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {/* The map method is used to produce a list users and for each
        user in users a new UserItem component is generated with a key 
        prop set to the user id and the user prop set to user */}
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner/>;
  }
}

export default UserResults;
