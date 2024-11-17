
import './App.css'
import logo from "./assets/200180283.png"
import { AssignmentInd, Campaign, Lan, Logout, MeetingRoom, Person, Phone, Poll } from '@mui/icons-material'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Announcements from './pages/Announcements/Announcements'
import Anketler from './pages/Anketler/Anketler'
import Mudurlukler from './pages/Mudurlukler/Mudurlukler'
import Girisler from './pages/Girisler/Girisler'
import Telephones from './pages/Telephones/Telephones'
import Personeller from './pages/Personeller/Personeller'
import Anket from './pages/Anketler/Anket'
import { useDispatch, useSelector } from 'react-redux'
import LoginPage from './pages/Login/LoginPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Clients from './pages/Clients/Clients'
import Adminler from './pages/AdminPage/Adminler'
import NoPermissionPage from './pages/NoPermissionPage'
import { setLoggedAdmin, setLoggedStatus } from './redux/features/authSlice'
function App() {

  const { logged, loggedUser, loggedAdmin } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <>
      {
        logged ?
          <div style={{ height: "100vh" }} className='row m-0'>
            <div className='col-3 border-end d-flex flex-column align-items-center p-2'>
              <img onClick={() => { window.location.href = 'https://atakum.bel.tr/' }} style={{ width: "65%", cursor: "pointer" }} src={logo} alt="" />
              <div className='w-60 d-flex flex-column align-items-center'>

                {
                  loggedAdmin.allowAdmins != 0 &&
                  <Link to={"/adminler"} className='buttonmainpage'>
                    <div className='iconmainpagebutton'>

                      <Person></Person>
                    </div>
                    <span className='mx-2'>
                      Adminler
                    </span>
                  </Link>
                }
                {
                  loggedAdmin.allowDuyuru != 0 &&

                  <Link to={"/duyuru"} className='buttonmainpage'>
                    <div className='iconmainpagebutton'>

                      <Campaign></Campaign>
                    </div>
                    <span className='mx-2'>
                      Duyurular
                    </span>
                  </Link>
                }
                {
                  loggedAdmin.allowPhones != 0 &&

                  <Link to={"/numaralar"} className='buttonmainpage'>
                    <div className='iconmainpagebutton'>

                      <Phone></Phone>
                    </div>
                    <span className='mx-2'>
                      Dahili Numaralar
                    </span>
                  </Link>


                }
                {
                  loggedAdmin.allowIPS != 0 &&

                  <Link to={"/ipler"} className='buttonmainpage'>
                    <div className='iconmainpagebutton'>

                      <Lan></Lan>
                    </div>
                    <span className='mx-2'>
                      IP'ler
                    </span>
                  </Link>
                }
                {
                  loggedAdmin.allowPersonel != 0 &&
                  <Link to={"/personeller"} className='buttonmainpage'>
                    <div className='iconmainpagebutton'>

                      <Person></Person>
                    </div>
                    <span className='mx-2'>
                      Personeller
                    </span>
                  </Link>
                }
                {
                  loggedAdmin.allowAnket != 0 &&
                  <Link to={"/anketler"} className='buttonmainpage'>
                    <div className='iconmainpagebutton'>

                      <Poll></Poll>
                    </div>
                    <span className='mx-2'>
                      Anketler
                    </span>
                  </Link>
                }
                {
                  loggedAdmin.allowMudurlukler != 0 &&
                  <Link to={"/mudurlukler"} className='buttonmainpage'>
                    <div className='iconmainpagebutton'>

                      <AssignmentInd></AssignmentInd>
                    </div>
                    <span className='mx-2'>
                      Müdürlükler
                    </span>
                  </Link>
                }

                <button onClick={() => { localStorage.clear(); dispatch(setLoggedStatus(false)) ; dispatch(setLoggedAdmin(null)) }} className='buttonmainpage'>

                  <div className='iconmainpagebutton33'>

                    <Logout></Logout>
                  </div>
                  <span className='mx-2'>
                    Çıkış Yap
                  </span>
                </button>
                {/* <Link to={"/giriscikislar"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <MeetingRoom></MeetingRoom>
                  </div>
                  <span className='mx-2'>
                    Giriş Çıkış
                  </span>
                </Link> */}

              </div>
            </div>
            <div className='col-9 overflow-auto'>

              <Routes>


                <Route path="/duyuru" element={loggedAdmin.allowDuyuru ? <Announcements /> : <NoPermissionPage />} />
                <Route path="/numaralar" element={loggedAdmin.allowPhones ? <Telephones /> : <NoPermissionPage />} />
                <Route path="/personeller" element={loggedAdmin.allowPersonel ? <Personeller /> : <NoPermissionPage />} />
                <Route path="/anketler" element={loggedAdmin.allowAnket ? <Anketler /> : <NoPermissionPage />} />
                <Route path="/mudurlukler" element={loggedAdmin.allowMudurlukler ? <Mudurlukler /> : <NoPermissionPage />} />
                <Route path="/ipler" element={loggedAdmin.allowIPS ? <Clients /> : <NoPermissionPage />} />
                <Route path="/anket/:id" element={loggedAdmin.allowAnket ? <Anket /> : <NoPermissionPage />} />
                <Route path="/adminler" element={loggedAdmin.allowAdmins ? <Adminler /> : <NoPermissionPage />} />

              </Routes>
            </div>

          </div>
          :
          <div>
            <LoginPage />
          </div>



      }
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
