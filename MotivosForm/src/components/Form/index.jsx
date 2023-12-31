import {useState} from 'react'
import './Form.scss';
import { Grid, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';


const Form = ({ xsResolution }) => {
  
  const [form, setForm] = useState({nombre:'', motivos: '', invalidName: true, invalidMotivos: true});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessages, setSnackBarMessages] = useState({message:"", severity:""});
  const handleClose=()=>{
    setOpenSnackBar(false);
  }


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

  const sendMotivos = () => {
    fetch(`https://iceparodi.bsite.net/api/message?user=${form.nombre}&message=${form.motivos}`)
      .then((response)=>{
        console.log("le mande los motivos a juan" + response.status);
        setSnackBarMessages({...snackBarMessages, message:"Tu motivo fue enviado con exito!", severity:"success"});
        setOpenSnackBar(true);
        setTimeout(()=>{
          setForm({...form, nombre:"", motivos:"", invalidName: true, invalidMotivos:true})
        },1500);

      }).catch((err)=>{
        setSnackBarMessages({...snackBarMessages, message:"Lo sentimos, no pudimos enviar el motivo", severity:"error"});
        setOpenSnackBar(true);
        console.log("hay un error" + err);
      })
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
            <Button onClick={sendMotivos} variant="contained" disabled={(form.nombre.length < 3 || !form.invalidName) || (form.motivos.length < 5 || !form.invalidMotivos)}>Enviar motivo</Button>
          </Grid>
          
            <Snackbar className='snack' open={openSnackBar} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <Alert onClose={handleClose} severity={snackBarMessages.severity} sx={{ width: '100%' }}>
                {snackBarMessages.message}
              </Alert>
            </Snackbar>
        
        </Grid>
        
    </div>
  )
}

export default Form
