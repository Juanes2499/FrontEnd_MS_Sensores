import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Form, ButtonToolbar, Button, FormGroup, FormControl, Toggle, DatePicker } from 'rsuite';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './Filter.css';

const TypeField = ({dataEntryType, key, name, label, accepter, type, handlerValue, value, ...rest }) => {
    
  dataEntryType = dataEntryType.toLowerCase();
  
  if (dataEntryType === 'input'){
    return (
        <FormGroup key={key} >
            <p className='label-field'  key={key} >{label} </p>
            <FormControl 
                key={key}
                name={name} 
                accepter={accepter} 
                type={type} 
                onChange={handlerValue} 
                style={{width:350, height:35 ,fontFamily: 'Arial',  fontSize:15}} 
                value={value}
                {...rest}
            />
        </FormGroup>
    );
  }else if(dataEntryType === 'toggle'){
    return (
        <FormGroup key={key} >
            <div className='toggle-box'>
                <p className='label-field'  key={key} >{label}</p>
                <Toggle 
                    key={key}
                    size="lg" 
                    checkedChildren="true" 
                    unCheckedChildren="false"
                    defaultChecked={value}
                    onChange={handlerValue} 
                />
            </div>
        </FormGroup>
    );
  }else if(dataEntryType === 'datepicker'){
    return (
      <FormGroup key={key} >
          <p className='label-field'  key={key} >{label} </p>
          <DatePicker 
            key={key}
            style={{ width: 350, fontFamily: 'Arial',fontSize:15 }} 
            onChange={handlerValue} 
          />
      </FormGroup>
    );
  }else if(dataEntryType === 'timepicker'){
    return (
      <FormGroup key={key} >
          <p className='label-field'  key={key} >{label} </p>
          <DatePicker 
            key={key}
            format="HH:mm"
            ranges={[]}
            style={{ width: 350, fontFamily: 'Arial',fontSize:15 }} 
            onChange={handlerValue} 
          />
      </FormGroup>
    );
  }
}

const Filter = ({formFilter, configuration, actions}) => {

    return (
        <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<i className="fas fa-chevron-down" style={configuration.styleIconSummary}></i>}
                style={configuration.styleAccordionSummary}
              >
                <span style={configuration.styleLabelSummary}>Filtrar Información del usuario</span>
              </AccordionSummary>

              <AccordionDetails className='accordion-details'>
                <GridList cellHeight={configuration.cellHeight}  cols={configuration.cols}>
                  {
                    formFilter.map((item, index)=>{
                      return(
                        <GridListTile key={index} className='container-filter'>
                          <Form>
                            <TypeField 
                                key={index} 
                                dataEntryType={item.dataEntryType}
                                name={item.name} 
                                label={item.label} 
                                type={item.type} 
                                value={item.valueState}
                                handlerValue={item.hadlerValueState} 
                              />
                            </Form>
                            
                        </GridListTile>
                      )
                    })
                  }
                </GridList>
              </AccordionDetails>

              <AccordionActions>
                  {
                    actions.map((item, index) => {
                        return(
                            <Button key={index} onClick={item.onClick} color={item.color} appearance={item.appearance}>
                                {item.icon === true ? <i className={item.nameIcon} style={{marginRight:'7%'}}></i> : ''}
                                {item.labelButton}
                            </Button>
                        )
                    })
                  }
              </AccordionActions>
            </Accordion>
        </div>
    )
}

export default Filter
