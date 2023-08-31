// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ChartGrid from '../components/chartGrid';
import { Provider } from 'react-redux';
import store from '../store/reducers/rootReducer';
export function App() {
  return (
    <Provider store={store}>
      <div className='bg-gray-100 min-h-screen globalbg dark:bg-darkbg'>
        <div className='py-3 px-10 dark:text-white rounded-xl z-10 relative'>
          <ChartGrid />
        </div>
      </div>
    </Provider>
  );
}

export default App;
