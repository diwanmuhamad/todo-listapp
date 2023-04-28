import {useEffect, useState} from 'react'
import './MainMenu.css'
import imageEmptyActivity from '../../assets/activityEmpty.png'
import greenSign from '../../assets/greenSign.png'
import axios from 'axios'
import {FaTrashAlt} from "react-icons/fa"
import changeDate from '../../utils/changeDate'
import {Modal} from '../../component'


const MainMenu = () => {
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [isActivity, setIsActivity] = useState(false)
    const [id, setId] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false)
    const [createActivityTrigger, setCreateActivityTrigger] = useState(false)
    const createActivity = () => {
        axios.post('https://todo.api.devcode.gethired.id/activity-groups',
        {
            "title": "New Activity",
            "email": "diwan@gg.com"
        }
        ,{
            headers: {
                Accept: 'application/json',
              },
        },
        
        ).then(res => {
            console.log(res.data)
            setCreateActivityTrigger((createActivityTrigger) => !createActivityTrigger)
        })
        .catch(err => console.log(err))
        
    }

    const deleteActivity = (id: any) => {
        axios.delete('https://todo.api.devcode.gethired.id/activity-groups/' + id,
        {
            headers: {
                Accept: 'application/json',
              },
        },
        
        ).then(res=> {
            setCreateActivityTrigger((createActivityTrigger) => !createActivityTrigger)
            setIsSuccess(true)
            
            setTimeout(()=> {
                setIsSuccess(false)
            }, 2000)
        })
        .catch(err=>console.log(err))

    }

    const openModalDelete = (title: any, id: any) => {
        setIsOpen(true)
        setIsActivity(true)
        setTitle(title)
        setId(id)
    }

    const closeIsOpen = () => {
        setIsOpen(false)
    }

    useEffect(()=> {
        axios.get(
            'https://todo.api.devcode.gethired.id/activity-groups', 
            {
                headers: {
                    Accept: 'application/json',
                  },
                params: {
                    email: 'diwan@gg.com'
                }
            }

        ).then((res) => {
            let data =res.data.data
            data.reverse()
            if (data.length < 5) {
                let app = document.getElementById('appTodo')
                if (app) {
                    app.style.height = '100vh'
                }
            }
            else {
                let app = document.getElementById('appTodo')
                if (app) {
                    app.style.height = '100%'
                }
            }
            setData(data); console.log(res.data.data)})
        .catch((err) => console.log(err))
    }, [createActivityTrigger])

    return (
        <div className='MainContainer'>
            <div className='MainSecondContainer'>
                <div className='titleButtonCon'>
                    <h1 className='titleActivity'>Activity</h1>
                    <button 
                    onClick={createActivity}
                    type='button' className='buttonAddActivity'>+ Tambah</button>   
                </div>
                {
                    data.length === 0?
                    <div className='imgActCon'>
                        <img src={imageEmptyActivity}></img>
                    </div>
                    :
                    <div className='activityCardCon'>
                        {
                            data.map((el: any) => {
                                return ( 
                                <div className='cardActivity'>
                                    <div className='cardActSecCon'>
                                        <h3>{el.title}</h3>
                                        <div className='footerCardAct'>
                                            <p>{changeDate(el.created_at)}</p>
                                            <FaTrashAlt 
                                            onClick={() => openModalDelete(el.title, el.id)}
                                            style={{color: '#888888', cursor: 'pointer'}}/>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                }
                
            </div>
            <Modal isActivity={isActivity} isOpen={isOpen} title={title} deleteFunc={deleteActivity} id={id} changeIsOpen={closeIsOpen}/>
            <div className='alerts'
                style={
                    isSuccess?
                    {display: 'block'}
                    :
                    {display: 'none'}
                }
            
            >
                <div className='alertsSec'>
                    <img src={greenSign}></img>
                    <p>Activity berhasil dihapus</p>
                </div>
            </div>
        </div>
    )
}

export default MainMenu