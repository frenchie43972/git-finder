import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

// UserSearch component allows users to search Github by entering a
// Search query
function UserSearch() {
  // Creates the state 'text' and assigns and empty string
  const [text, setText] = useState('');

  // We use the useContect hook to access users, searchUsers, clearUsers
  // from GithubContext and setAlert from AlertContext
  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  // This function is called whenever types in the search field and will
  // update the 'text' state with the current value
  const handleChange = (event) => setText(event.target.value);

  // handleSubmit is called when the user submits the form. It will prevent
  // the default form submission behavior. If the text is empty, the setAlert
  // function will pop the error message created else it updates the search text
  // state and empties the input field
  const handleSubmit = (event) => {
    event.preventDefault();

    if (text === '') {
      setAlert('Search cannot be blank.', 'error');
    } else {
      searchUsers(text);
      setText('');
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="from-control">
            <div className="relative">
              <input className="w-full pr-40 bg-gray-200 input input-lg text-black"
                type="text"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                Go!
              </button>
            </div>
          </div>
        </form> 
      </div>
      {/* If the users prop is greater than 0 the "Clear" button appears and when clicked
      it will use clearUsers to reset the page/search */}
      {users.length > 0 && (
        <div>
          
          <button onClick={clearUsers} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
