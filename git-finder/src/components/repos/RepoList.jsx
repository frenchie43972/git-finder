import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

// RepoList essentially serves as a container for RepoItem and uses the
// 'repos' prop as an array. The reason it serves as a container is 
// because it does not have any state or event handlers.
function RepoList({repos}) {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Latest Repositories
        </h2>
        {/* the repos array is being mapped over and for each item in
        the array, a new RepoItem is rendered. The key prop is set to
        the repo id and the repo prop is set to the repo object. */}
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoList;
