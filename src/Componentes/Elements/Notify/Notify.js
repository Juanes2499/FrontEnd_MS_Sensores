import { Notification } from 'rsuite';

export const Notify = (funcName,titulo,descripcion) => {
    Notification[funcName]({
        
        title: <span style={{fontFamily: 'Roboto', fontSize:18, fontWeight:'bold'}}>{titulo}</span>,
        description: <span style={{fontFamily: 'Roboto', fontSize:15}}>{descripcion}</span>,
    });
}
