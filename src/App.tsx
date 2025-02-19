import {useState} from 'react'
import SearchForm from './components/form/search-form';
import UserProfile from './components/user/user-profile';

// npm install vitest --save-dev
const App = () => {

  const [userName,setUserName] = useState('mohamedelsayed002')

  return (
    <main className='mx-auto max-w-6xl px-8 py-20'>
      <SearchForm username={userName} setUserName={setUserName} />
      <UserProfile userName={userName} />
    </main>
  );
};
export default App;
