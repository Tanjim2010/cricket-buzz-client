import Navbar from './Navbar/Navbar';
import Banner from './Banner/Banner';
import AvailablePlayer from './AvailablePlayer/AvailablePlayer';
import Footer from './Footer/Footer';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <AvailablePlayer></AvailablePlayer>
            <Footer></Footer>
        </div>
    );
};

export default Home;