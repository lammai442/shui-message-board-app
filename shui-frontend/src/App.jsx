import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ShowMsg from './components/ShowMsg/ShowMsg';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MessagePage from './pages/MessagePage/MessagePage';
import ShuiMessagePage from './pages/ShuiMessagePage/ShuiMessagePage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/auth' element={<AuthPage />} />
				{/* ProtectedRoute skyddar så att ifall man inte är inloggad så kommer man navigeras till AuthPage */}
				<Route element={<ProtectedRoute />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/messages' element={<MessagePage />} />
					<Route path='/shuimessage' element={<ShuiMessagePage />} />
				</Route>
			</Routes>
			<ShowMsg />
		</BrowserRouter>
	);
}

export default App;
