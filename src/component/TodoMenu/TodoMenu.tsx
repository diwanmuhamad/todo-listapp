import {useState, useEffect} from 'react';
import './TodoMenu.css'
import {FaAngleLeft} from 'react-icons/fa'
import todoEmpty from '../../assets/todoEmpty.png'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import axios from 'axios'

interface TodoMenuProps {
    isOpenTodo: Boolean
    title: any
    id: number
    closeTodo: Function
}

const TodoMenu = (props: TodoMenuProps) => {
    const [todoData, setTodoData] = useState([])
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [NewTitle, setNewTitle] = useState(props.title)

    const updateTitle = (title: any) => {
        axios.patch(
            'https://todo.api.devcode.gethired.id/activity-groups/' + props.id,
            {
                "title": title
            },
            {
                headers: {
                    Accept: 'application/json',
                  },
            }

        )
    }

    useEffect(()=> {
        axios.get(
            'https://todo.api.devcode.gethired.id/todo-items', 
            {
                headers: {
                    Accept: 'application/json',
                  },
                params: {
                    activity_group_id: props.id
                }
            }

        ).then((res) => {
            let data =res.data.data
            // data.reverse()
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
            setTodoData(data); console.log(res.data.data)})
        .catch((err) => console.log(err))
    }, [])

    return (
        <div className='todoMainCon'
            style={
                props.isOpenTodo?
                {display: 'block'}
                :
                {display: 'none'}
            }
        >
            <div className='todoButtonCon'>
                <div className='titleTodo'>
                    <FaAngleLeft 
                    onClick={()=>props.closeTodo()}
                    
                    style={{fontSize: '36px', cursor: 'pointer'}}/>
                    {
                        isEditTitle?
                        <input 
                        onChange={(e)=>{setNewTitle(e.target.value); updateTitle(e.target.value)}}
                        type='text' autoFocus id='titleValue' value={NewTitle}></input>
                        :
                        <p>{NewTitle}</p>
                    }
                    <MdOutlineModeEditOutline 
                    onClick={() => setIsEditTitle((isEditTitle) => !isEditTitle)}
                    style={{fontSize: '30px', color: '#A4A4A4', cursor: 'pointer'}}/>
                </div>
                <div className='sortButtonCon'>
                    {
                        todoData.length == 0 && <div></div>
         

                    }
                    <button 
                    onClick={() => {}}
                    type='button' className='buttonAddTodo'>+ Tambah</button>   

                </div>
            </div>
            {
                    todoData.length === 0?
                    <div className='imgTodoCon'>
                        <img src={todoEmpty}></img>
                    </div>
                    :
                    <div className='todoListCon'>
                        {
                            todoData.map((el: any) => {
                                return ( 
                                <div className='todoList' key={el.id + el.title}>
                                    <div className='todoSecCon'>
                                       
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                }
        </div>
    )
}

export default TodoMenu