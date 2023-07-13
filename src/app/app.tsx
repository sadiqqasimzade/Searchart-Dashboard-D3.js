// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import Filters from '../components/filters';
export function App() {
  return (
    <div className='grid justify-items-center bg-gray-900 min-h-screen'>
      <div className='p-5 w-10/12  text-white rounded-xl'>
        <Filters />
      </div>
    </div>
  );
}

export default App;
