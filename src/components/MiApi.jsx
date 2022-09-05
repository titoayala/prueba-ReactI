import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const MiApi = () => {

    //DEFINICION DE MIS ESTADOS
    const [aves, setAves] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [lista, setLista] = useState([]);

    //FUNCION PARA CONSUMO DE LA API
    const apiAves = async () => {
        const data = await fetch("https://aves.ninjas.cl/api/birds"); //API PUBLICA 100% DISPONIBLE SIN REGISTRO
        const dataAves = await data.json();
        setAves(dataAves);
        setLista(dataAves);
    };

    //FUNCION DE BUSQUEDA
    const nuevaBusqueda = (e) => {
        setBusqueda(e.target.value);
        filtro(e.target.value);
    };

    //FUNCION FILTRO DEVUELVE LA INFO PARA LA BUSQUEDA
    const filtro = (valor) => {
        let resultadoBusqueda = lista.filter((e) => {
            if (e.name.spanish.toString().toLowerCase().includes(valor.toLowerCase())) {
                return e;
            }
        });
        setAves(resultadoBusqueda);
    };

    //FUNCIONES PARA ORDENAR
    const ordenaNombre = () => {
        const ordenaAves = [...aves].sort((a, b) =>
            a.name.spanish > b.name.spanish ? 1 : -1 //OPERADOR TERNARIO PARA ORDENAR EL ARREGLO SEGUN FUNCION DE COMPARACION.
        );
        setAves(ordenaAves);
    };

    const ordenaId = () => {
        const ordenaAves = [...aves].sort((a, b) =>
            a.uid > b.uid ? 1 : -1
        );
        setAves(ordenaAves);
    };

    useEffect(() => {
        apiAves(); //LLAMADO A LA FUNCION DE CONSUMO DE LA API
    }, []); // ARREGLO DE DEPENDECIAS VACIO

    //RENDER CON EVENTOS ONCHANGE Y ONCLICK
    return (
        <div className="contenedor">
            <h1>Buscador de Aves Chilenas</h1>
            <input className="form-control" value={busqueda} placeholder="Escriba el nombre del ave a buscar..." onChange={nuevaBusqueda} />
            <hr />
            <h1>Listado de Aves</h1>
            <Table striped bordered hover variant="info">
                <thead>
                    <tr className="encabezados">
                        <th>IMAGEN</th>
                        <th>NOMBRE <Button variant="primary" size="sm" onClick={ordenaNombre}>A-Z</Button></th>
                        <th>ID <Button variant="primary" size="sm" onClick={ordenaId}>A-Z</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {aves.map((ave) => ( //RECORRIDO DEL ARREGLO PARA MOSTRAR LOS DATOS SETEADOS
                        <tr className="contenido" key={ave.uid}>
                            <td className="imagenes"><Image src={ave.images.main} /></td>
                            <td>{ave.name.spanish}</td>
                            <td>{ave.uid}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MiApi;
