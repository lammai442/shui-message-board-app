import { useAuthStore } from '../../stores/useAuthStore';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
	// Hämtar hem state för om det finns någon inloggad user
	const user = useAuthStore((state) => state.user);

	if (!user) {
		return <Navigate to='/auth' replace />;
	}

	return children;
}

export default ProtectedRoute;
