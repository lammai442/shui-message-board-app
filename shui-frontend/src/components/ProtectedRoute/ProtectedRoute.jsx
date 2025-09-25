import { useAuthStore } from '../../stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
	// Hämtar hem state för om det finns någon inloggad user
	const user = useAuthStore((state) => state.user);

	if (!user) {
		return <Navigate to='/auth' replace />;
	}

	return <Outlet />;
}

export default ProtectedRoute;
