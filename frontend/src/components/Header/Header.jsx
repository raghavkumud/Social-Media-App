import './Header.css';
import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
} from '@mui/icons-material';
const Header = () => {
    const [tab, setTab] = useState(window.location.pathname);
    console.log(window.location.pathname);
    return (
        <div className="header">
        <Link to="/" onClick= {()=> setTab("/")}>
        {
            tab === '/' ? <Home style={{color: "#db7093"}}/> : <HomeOutlined/>
        }
        </Link>
        <Link to="/newpost" onClick= {()=> setTab('/newpost')}>
        {
            tab === '/newpost' ? <Add style={{color: "#db7093"}}/> : <AddOutlined/>
        }
        </Link>
        <Link to="/search" onClick = {() => setTab('/search')}>
        {
            tab === '/search' ? <Search style={{color: "#db7093"}}/> : <SearchOutlined/>
        }
        </Link>
        <Link to="/account" onClick={()=> setTab("/account")}>
        {
            tab === '/account' ? <AccountCircle style={{color: "#db7093"}}/> : <AccountCircleOutlined/>
        }
        </Link>
        </div>
    )
}
export default Header;