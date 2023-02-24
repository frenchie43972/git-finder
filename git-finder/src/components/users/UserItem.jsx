import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

// The UserItem component take sin a a single argument which is a
// destrctured object (user) that has two properties (login, avatar_url)
// The two properties will be called in the img JSX and Link component
// and will render to the browser.
// This is a presentational component because it does not contain any state
// or handle any events. It only renders a list of user items.
function UserItem({user: {login, avatar_url}}) {
  return (
    <div className='card shadow-md compact side bg-neutral-300'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img src={avatar_url} alt='Profile' />
            </div>
          </div>
        </div>
        <div>
          <h2 className='card-title'>{login}</h2>
          <Link
            className='text-base-content text-opacity-60'
            to={`/user/${login}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem;
