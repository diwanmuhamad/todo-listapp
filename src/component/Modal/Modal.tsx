import './Modal.css'
import redSign from '../../assets/redModalSign.png'

interface modalProps {
    isActivity: Boolean,
    title: String,
    isOpen: Boolean,
    id: number,
    changeIsOpen: Function,
    deleteFunc: Function,

}

const Modal = (props: modalProps) => {
    const close = () => {
       props.changeIsOpen()
    }
    return (
        <div 
            className='modals'
           style={props.isOpen? {display: 'block'} : {display: 'none'}}
        >
            <div className='modalSecCon'>
                <div>
                    <img src={redSign}></img>
                </div>
                {
                    props.isActivity?
                    <p className='titleModal'>Apakah anda yakin menghapus activity <span className='titleItem'>"{props.title}"?</span></p>
                    :
                    <p className='titleModal'>Apakah anda yakin menghapus List item <span className='titleItem'>"{props.title}"?</span></p>
                }
                <div className='btnModalCon'>
                    <button onClick={close} className="btnBatalModal" type="button">Batal</button>
                    <button onClick={() => {props.deleteFunc(props.id); close()}} className="btnDeleteModal" type="button">Hapus</button>
                </div>
            </div>
        </div>
    )
}

export default Modal