// components/Layout.js
import { useRouter } from 'next/router';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;

  // List of paths where the navbar and footer should not be displayed
  const noNavbarFooterPaths = ['/', '/signup', '/terms', '/thank-you'];

  const showNavbarAndFooter = !noNavbarFooterPaths.includes(path);

  return (
    <div>
      {showNavbarAndFooter && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
