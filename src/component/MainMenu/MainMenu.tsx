import {useEffect, useState} from 'react'
import './MainMenu.css'
import imageEmptyActivity from '../../assets/activityEmpty.png'
import axios from 'axios'
import {FaTrashAlt} from "react-icons/fa"


const MainMenu = () => {
    const [data, setData] = useState([])
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
                                            <p>test</p>
                                            <FaTrashAlt style={{color: '#888888', cursor: 'pointer'}}/>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                }
                
            </div>
        </div>
    )
}

export default MainMenu