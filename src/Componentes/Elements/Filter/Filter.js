import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './Filter.css';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
}));
  

const Filter = () => {

    const classes = useStyles();

    return (
        <div>
            <Accordion>
                <AccordionSummary
                  expandIcon={<i className="fas fa-chevron-down" style={{color:'white'}}></i>}
                  style={{
                    backgroundColor:'rgba(17, 0, 94, 0.808)', 
                    borderRadius:'5px'}}
                >
                  <p className='header-label'>Filtrar Información del usuario</p>
                </AccordionSummary>

                <AccordionDetails className={classes.details}>
                    
                </AccordionDetails>
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

export default Filter
