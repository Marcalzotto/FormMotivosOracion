import {useState} from 'react'
import './Form.scss';
import { Grid, Typography, TextField, Button } from '@mui/material';


const Form = ({ xsResolution }) => {
  
  const [form, setForm] = useState({nombre:'', motivos: '', invalidName: true, invalidMotivos: true})
  const changeText = (e) => {

  
    
    if(e.target.name === "nombre"){

      if(e.target.value.length < 3){
        setForm({...form, [e.target.name]: e.target.value, invalidName: false})
      }else{
        setForm({...form, [e.target.name]: e.target.value, invalidName: true})
      }
    }

    if(e.target.name === "motivos"){
      if(e.target.value.length < 5){
        setForm({...form, [e.target.name]: e.target.value, invalidMotivos: false})
      }else{
        setForm({...form, [e.target.name]: e.target.value, invalidMotivos: true})
      }
    }
  }

  return (
    <div id={xsResolution ? "form_mobile" : "form"}>
        <Grid container rowSpacing={4}>
          <Grid item xs={12} className="items">
            {
             xsResolution ?
             <Typography variant='h6' component='p'>Envianos tu motivo de agradecimiento!!!</Typography>
             :  
            <Typography variant='h4' component='h2'>Envianos tu motivo de agradecimiento!!!</Typography>
            }
          </Grid>
          <Grid item xs={12} className='items'>
            <TextField 
                       id="outlined-basic" 
                       label="Nombre" 
                       variant="outlined" 
                       placeholder='Pon aqu tu nombre' 
                       name='nombre'
                       className="motivos" 
                       value={form.nombre} 
                       onChange={changeText}
                       error={form.nombre.length < 3 && !form.invalidName ? true : false}
                       helperText={form.nombre.length < 3 && !form.invalidName ? "El nombre debe tener por lo menos 3 caracteres Ej: Ian.":""}
                       
          />
          </Grid>
          <Grid item xs={12} className='items'>
          <TextField
            id="outlined-multiline-static"
            label="Motivos"
            multiline
            minRows={4}
            maxRows={4}
            className="motivos"
            placeholder='Pon aqui tus motivos de agradecimiento'
            value={form.motivos}
            name='motivos'
            onChange={changeText}
            error={form.motivos.length < 5 && !form.invalidMotivos ? true : false}
            helperText={form.motivos.length < 5 && !form.invalidMotivos ? "Debes completar los motivos..." : ""}
        />
          </Grid>
          <Grid item xs={12} className='items'>
            <Button variant="contained" disabled={(form.nombre.length < 3 || !form.invalidName) || (form.motivos.length < 5 || !form.invalidMotivos)}>Enviar motivo</Button>
          </Grid>
        </Grid>
    </div>
  )
}

export default Form
