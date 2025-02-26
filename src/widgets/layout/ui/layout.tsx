import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../entities/session/model/auth-store';
import ThemeToggle from '../../../shared/ui/theme-toggle/theme-toggle';
import styles from './layout.module.css';
import '../../../shared/styles/variables.css';

export const Layout = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>📝</span>
            Todo List
          </Link>
          
          <div className={styles.nav}>
            <ThemeToggle />
            
            <div className={styles.navItem}>
              {isAuthenticated ? (
                <div className={styles.userInfo}>
                  <span className={styles.username}>{user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className={`${styles.button} ${styles.dangerButton}`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className={styles.nav}>
                  <Link
                    to="/login"
                    className={`${styles.button} ${styles.ghostButton} ${styles.navItem}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`${styles.button} ${styles.primaryButton} ${styles.navItem}`}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}; 