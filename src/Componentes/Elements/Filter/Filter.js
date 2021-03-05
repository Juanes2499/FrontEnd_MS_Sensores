import React, {useState,useEffect, useContext} from 'react'
import { Form, Button, FormGroup, Toggle, DatePicker, SelectPicker, MultiCascader, Input } from 'rsuite';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionActions from '@material-ui/core/AccordionActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { operadoresFiltro, operadoresConectoresFiltro } from '../../../Shared/maestras';
import './Filter.css';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import userEvent from '@testing-library/user-event';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';



const SelectPickerMaestra = ({selectPickerType, data, handleOperator}) => {
  return (
    <MultiCascader
      size="md"
      placeholder="Select"
      data={data}
      searchable={false}
      style={{ width: 100, height:35, display: 'block', marginBottom: 1, fontFamily:'Arial'}}
      onChange={handleOperator}
    />
  )
  // if(selectPickerType === 1){
  //   console.log(selectPickerType)
  //   return (
  //     <SelectPicker
  //       size="md"
  //       placeholder="Select"
  //       data={data}
  //       style={{ width: 100, display: 'block', marginBottom: 1, fontFamily:'Arial'}}
  //       onChange={handleOperator}
  //     />
  //   )
  // }else if(selectPickerType === 2){
  //   console.log(selectPickerType)
  //   return (
  //     <MultiCascader
  //       size="md"
  //       placeholder="Select"
  //       data={data}
  //       style={{ width: 100, display: 'block', marginBottom: 1, fontFamily:'Arial'}}
  //       onChange={handleOperator}
  //     />
  //   )
  // }
}

const TypeField = ({dataEntryType, key, name, label, accepter, type, handlerValue, handleOperator, value, selectPickerType, valueSelectPicker, inputFieldStyle, ...rest }) => {
    
  dataEntryType = dataEntryType.toLowerCase();
  
  if (dataEntryType === 'input'){
    return (
        <FormGroup key={key} >
            <div className='label-maestra-field-box'>
              <div className='label-box'>
                <p className='label-field'  key={key} >{label} </p>
              </div>
              <SelectPickerMaestra key={key}  selectPickerType={selectPickerType} data={valueSelectPicker} handleOperator={handleOperator}/>
              <Input
                  key={key}
                  name={name} 
                  accepter={accepter} 
                  type={type} 
                  onChange={handlerValue} 
                  style={inputFieldStyle.field} 
                  value={value}
                  {...rest}
              />
              <div style={{width:'3%', color:'white'}}>hi</div>
            </div>
        </FormGroup>
    );
  }else if(dataEntryType === 'toggle'){
    return (
        <FormGroup key={key} >
            <div className='toggle-box'>
                <div className='label-box'>
                  <p className='label-field'  key={key} >{label} </p>
                </div>
                <SelectPickerMaestra key={key} data={valueSelectPicker} handleOperator={handleOperator}/>
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
        <div className='label-maestra-field-box'>
          <div className='label-box'>
            <p className='label-field'  key={key} >{label} </p>
          </div>
          <SelectPickerMaestra key={key} data={valueSelectPicker} handleOperator={handleOperator}/>
          <DatePicker 
            key={key}
            format='YYYY-MM-DD'
            style={inputFieldStyle.field} 
            onChange={handlerValue} 
          />
          <div style={{width:'3%', color:'white'}}>hi</div>
        </div>
      </FormGroup>
    );
  }else if(dataEntryType === 'timepicker'){
    return (
      <FormGroup key={key} >
        <div className='label-maestra-field-box'>
          <div className='label-box'>
            <p className='label-field'  key={key} >{label} </p>
          </div>
          <SelectPickerMaestra key={key} data={valueSelectPicker}handleOperator={handleOperator}/>
          <DatePicker 
            key={key}
            format="HH:mm"
            ranges={[]}
            style={inputFieldStyle.field} 
            onChange={handlerValue} 
          />
          <div style={{width:'3%', color:'white'}}>hi</div>
        </div>
      </FormGroup>
    );
  }
}

const lgStyle ={
  field: {marginLeft:'1%', width: 230, fontFamily: 'Arial',fontSize:15, zIndex:999}
}

const mdStyle ={
  field: {marginLeft:'3%', width: 200, fontFamily: 'Arial',fontSize:15 }
}

const smStyle ={
  field: {marginLeft:'3%', width: 170, fontFamily: 'Arial',fontSize:15 }
}

const CustomToggle = ({ children, eventKey, callback }) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Button
      appearance="subtle"
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'rgba(15, 0, 83, 0.863)' : 'white', marginLeft:'1%'}}
      onClick={decoratedOnClick}
    >
      <span style={{fontFamily: 'Arial', fontSize:15,color: isCurrentEventKey ? 'white' : 'grey' }}>{children}</span>
    </Button>
  );
}

const Filter = ({bottonsHeader, formFilter, configuration, actions, ...props}) => {
  
  const styleFields = (screenWidth) => {
    if (isWidthUp('lg', screenWidth)) {
      return lgStyle;
    }
    
    if (isWidthUp('md', screenWidth)) {
      return mdStyle;
    } 
    return smStyle;
  };

  window.addEventListener('resize', styleFields); //Es un listener para detectar cuando cambia el tamaño de la pantalla

  function getCols(screenWidth) {
    if (isWidthUp('lg', screenWidth)) {
      return 3;
    }

    if (isWidthUp('md', screenWidth)) {
      return 2;
    }

    return 1;
  }

  const cols = getCols(props.width); // width is associated when using withWidth()
  const fieldStyle = styleFields(props.width);

  return (
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', alignContent:'flex-end'}}>
            <CustomToggle eventKey="0">Click me!</CustomToggle>
            {
              bottonsHeader.map((item, index) => {
                return(
                    <Button key={index} onClick={item.onClick} color={item.color} appearance={item.appearance} style={{marginLeft:'1%'}}>
                        {item.icon === true ? <i className={item.nameIcon} style={{marginRight:'7%'}}></i> : ''}
                        <span style={{fontFamily: 'Arial', fontSize:15}}>{item.labelButton}</span>
                    </Button>
                )
              })
            }
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0" >
            <div>
              <Card.Body className='accordion-details'>
                <GridList cellHeight={configuration.cellHeight} cols={cols}>
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
                                handleOperator={item.handleOperator}
                                selectPickerType={1}
                                inputFieldStyle={fieldStyle}
                                valueSelectPicker={operadoresConectoresFiltro}
                              />
                            </Form>
                            
                        </GridListTile>
                      )
                    })
                  }
                </GridList>
              </Card.Body>
              <Card.Footer>
                <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', alignContent:'flex-end'}}>
                  {
                    actions.map((item, index) => {
                        return(
                            <Button key={index} onClick={item.onClick} color={item.color} appearance={item.appearance} style={{marginLeft:'1%'}}> 
                                {item.icon === true ? <i className={item.nameIcon} style={{marginRight:'7%'}}></i> : ''}
                                <span style={{fontFamily: 'Arial', fontSize:15}}>{item.labelButton}</span>
                            </Button>
                        )
                    })
                  }
                </div>
              </Card.Footer>
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default withWidth()(Filter)
