import React from 'react';
import './dashbord.css'
import icon from './images/exit.png'
import max from './images/max.png'
import exitt from './images/exitt.png'
import key from './images/key.png'
import product from './images/produc.png'
import order from './images/order.png'
import setting from './images/setting.png'
import acsiya from './images/acsiya.png'
import user from './images/user.png'
import set from './images/set.png'

import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(true)
    let navigate = useNavigate();
    return (
        <>
            <img onClick={() => setOpen(!open)} style={{cursor: 'pointer', position: 'absolute', top: '20px'}} src={set}
                 alt=""/>
            <div className={open ? "main" : "domain"}>
                <div className='dashboard' style={{marginTop: '40px'}}><img src={max} alt="" style={{
                    marginLeft: '10px',
                    marginRight: '10px'
                }}/>Dashboard
                </div>
                <div className='dashboard'><img src={order} alt="" style={{
                    marginLeft: '10px',
                    marginRight: '10px'
                }}/><Link to="/order">Buyurtma</Link>
                </div>
                <div className='dashboard'><img src={setting} alt="" style={{
                    marginLeft: '10px',
                    marginRight: '10px'
                }}/><Link to="/category">Category</Link>
                </div>
                <div className='dashboard'><img src={product} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <Link to="/product">Mahsulotlar</Link>
                </div>
                {/*<div className='dashboard'><img src={max} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>Maxsulotlar*/}
                {/*    tipi*/}
                {/*</div>*/}
                {/*<div className='dashboard'><img src={acsiya} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>Aksiya*/}
                {/*</div>*/}
                {/*<div className='dashboard'><img src={max} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>Reklama*/}
                {/*</div>*/}
                <div className='dashboard'><img src={user} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <Link to="/user">Foydalanuvchilar</Link>
                </div>
                {/*<div className='dashboard'><img src={max} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>Profilni*/}
                {/*    tahrirlash*/}
                {/*</div>*/}
                {/*<div className='dashboard'><img src={exitt} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>Chiqish*/}
                {/*</div>*/}
            </div>
        </>
    )
}
export default Navbar;