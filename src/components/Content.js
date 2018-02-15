import React, {Component} from 'react';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { Link } from "react-router-dom";

class Content extends Component {
    render() {

        const data = [{
            name: 'João Almeida',
            age: 24,
            room: 101
        },{
            name: 'Maria Ferreia',
            age: 26,
            room: 102
        },{
            name: 'Marta Pereira',
            age: 35,
            room: 103
        },{
            name: 'José Oliveira',
            age: 45,
            room: 104
        },{
            name: 'Sofia Alves',
            age: 26,
            room: 105
        },{
            name: 'Ana Rodrigues',
            age: 29,
            room: 106
        }];

        const columns = [{
            Header: 'Nome',
            accessor: 'name', // String-based value accessors!
            Cell: props => <Link to={"protocol/" + props.value}>{props.value}</Link>// Custom cell components!
        }, {
            Header: 'Idade',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Quarto',
            accessor: 'room',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }];


        return (
            <div className="Content">
                <ReactTable
                    data={data}
                    columns={columns}/>
            </div>
        );
    }
}

export default Content;