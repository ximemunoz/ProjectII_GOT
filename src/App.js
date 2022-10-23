import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
/*--PARA INICIAR EL CODIGO ES NECESARIO PRIMERO PONER EN TERMINAL "npm i bootstrap axios" Y PARA EJECUTAR "npm start"*/

function App() {

  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");

const peticionGet=async()=>{
  await axios.get("https://thronesapi.com/api/v2/Characters") 
  .then(response=>{
    setUsuarios(response.data);
    setTablaUsuarios(response.data);
  }).catch(error=>{
    console.log(error);
  })
}

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}
var ids="0";
const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(elemento.id.toString().toLowerCase()==terminoBusqueda.toLowerCase()
    || elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setUsuarios(resultadosBusqueda);
}

useEffect(()=>{
peticionGet();
},[])

  

  return (
    <div className="App">
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre o Empresa"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
        
          {usuarios && 
           usuarios.map((usuario)=>(
              
                    
                    <div class="col-md-4" id="secondpanel">
                        <img id="imgpanel" src={usuario.imageUrl} alt={usuario.image} class="img-thumbnail"/>
                        <h4>{usuario.title}</h4>
                        <h5>First Name: {usuario.firstName}</h5>
                        <h5>Last Name: {usuario.lastName}</h5>
                        <h5>Family: {usuario.family}</h5>
                        <h5>ID: {usuario.id}</h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div> 
                    
                       
                    
                    
               
              
             ))}
              

 
 
    </div>
 );
}

export default App;
