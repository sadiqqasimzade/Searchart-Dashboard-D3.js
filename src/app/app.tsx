// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ChartGrid from 'src/components/chartGrid';
import { Provider } from 'react-redux';
import store from 'src/store/reducers/rootReducer';
export function App() {
  return (
    <Provider store={store}>
      <div className='bg-gray-100 min-h-screen'>
        <div className='py-3 px-10 text-black rounded-xl'>
          <ChartGrid />
        </div>
      </div>
    </Provider>
  );
}

export default App;
