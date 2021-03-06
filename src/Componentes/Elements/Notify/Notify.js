import { Notification } from 'rsuite';

export const Notify = (funcName,titulo,descripcion) => {
    Notification[funcName]({
        
        title: <span style={{fontFamily: 'Arial', fontSize:18, fontWeight:'bold'}}>{titulo}</span>,
        description: <span style={{fontFamily: 'Arial', fontSize:15}}>{descripcion}</span>,
    });
}
