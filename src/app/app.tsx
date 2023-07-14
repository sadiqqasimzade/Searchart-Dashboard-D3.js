// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppContext, AppContextProvider } from 'src/contexts/appContext';
import Filters from '../components/filters';
export function App() {
  return (
    <AppContextProvider>
      <div className='grid justify-items-center bg-gray-900 min-h-screen'>
        <div className='p-5 w-10/12 text-white rounded-xl'>
          <p className="text-center font-bold text-3xl">Country Comparison</p>
          <Filters />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
