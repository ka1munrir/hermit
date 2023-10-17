import { Outlet } from 'react-router-dom';
import NavBar from '../navbar/NavBar';


export default function RootLayout() {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}