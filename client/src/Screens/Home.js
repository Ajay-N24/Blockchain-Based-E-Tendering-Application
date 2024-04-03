import '../App.css';
import Sidebar from '../Components/Sidebar.jsx';
import Hero from './Hero.jsx';
import Navbar from '../Screens/Navbar.jsx';
function Home() {
    return (
        <div className=' min-h-screen w-full'>
            <Navbar />
            <Hero />
            {/* <Sidebar /> */}
        </div>
    );
}
export default Home;