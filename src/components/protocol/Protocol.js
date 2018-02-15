import React, { Component } from 'react';
import ProtocolElement from './ProtocolElement.js';
import ProtocolRadioElement from './ProtocolRadioElement.js';

class Protocol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atualComponent: 1,
            items: []
        };

        this.setAtualComponent = this.setAtualComponent.bind(this);
    }

    search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].componentId === nameKey) {
                return myArray[i];
            }
        }
    }

    setAtualComponent(id){
        console.log(id);
        this.setState({atualComponent: id});
    }

    render() {
        let params = this.props.match.params;

        let composition = [{
            componentId: 1,
            label: "Toma anti-diabéticos?",
            type: "choice",
            options: [{option: "Sim", next: 2},{option: "Não", next: 3}]
        }, {
            componentId: 2,
            label: "Suspender a toma de anti-diabéticos",
            type: "action",
            next: 3
        },{
            componentId: 3,
            label: "Faz tratamento com insulina ao domicilio?",
            type: "choice",
            options: [{option: "Sim", next: 4},{option: "Não", next: 7}]
        },{
            componentId: 4,
            label: "Regime de dieta oral?",
            type: "choice",
            options: [{option: "Sim", next: 6},{option: "Não", next: 5}]
        },{
            componentId: 5,
            label: "Suspender tratamento",
            type: "action",
            next: 7
        }, {
            componentId: 6,
            label: "Se possivel, manter o tratamento e dieta oral",
            type: "action",
            next: 7
        },{
            componentId: 7,
            label: "Calcular o tratamento adequado",
            type: "action",
            next: 8
        },{
            componentId: 8,
            label: "Já tem um tratamento registado no sistema?",
            type: "choice",
            options: [{option: "Sim", next: 9},{option: "Não", next: 10}]
        },{
            componentId: 9,
            label: "Verificar medições em jejum",
            type: "action",
            next: 15
        },{
            componentId: 10,
            label: "Valores glicémia maiores que 180?",
            type: "choice",
            options: [{option: "Sim", next: 12},{option: "Não", next: 11}]
        },{
            componentId: 11,
            label: "Não é necessário qualquer ajuste. Manter o regime de medicações",
            type: "action",
            next: null
        },{
            componentId: 12,
            label: "Valores de glicémia maiores que 250?",
            type: "choice",
            options:[{option: "Sim", next: 13},{option: "Não", next: 14}]
        },{
            componentId: 13,
            label: "Administrar 10U de insulina basal mais suplemento de insulina Prandial",
            type: "action",
            next: null
        },{
            componentId: 14,
            label: "Administrar 0.1U por Kg de insulina basal mais suplemento de insulina Prandial",
            type: "action",
            next: null
        },{
            componentId: 15,
            label: "Valores glicémia maiores que 180?",
            type: "choice",
            options: [{option: "Sim", next: 17},{option: "Não", next: 16}]
        },{
            componentId: 16,
            label: "Verificar medições após as refeições",
            type: "action",
            next: 18
        },{
            componentId: 17,
            label: "Aumentar a quantidade de insulina Basal em 10%",
            type: "action",
            next: null
        },{
            componentId: 18,
            label: "Valores glicémia maiores que 180?",
            type: "choice",
            options: [{option: "Sim", next: 19},{option: "Não", next: 20}]
        },{
            componentId: 19,
            label: "Adicionar mais 4 unidade de insulina prandial",
            type: "action",
            next: null
        },{
            componentId: 20,
            label: "Manter tratamento",
            type: "action",
            next: null
        }];

        let items = [];
        for (let index = 0; index < this.state.items.length; index++)
        {
            let component = this.search(this.state.items[index].componentId, composition);
            switch(component.type)
            {
                case "choice": items.push(<ProtocolRadioElement label={component.label} options={component.options} next={this.setAtualComponent}/>); break;
                case "action": items.push(<ProtocolElement label={component.label} options={component.next} next={this.setAtualComponent}/>); break;
            }
        }

        if(this.state.atualComponent > 0){
            let component = this.search(this.state.atualComponent, composition);
            console.log(component.next);
            switch(component.type)
            {
                case "choice": items.push(<ProtocolRadioElement label={component.label} options={component.options} next={this.setAtualComponent}/>); break;
                case "action": items.push(<ProtocolElement label={component.label} options={component.next} next={this.setAtualComponent}/>); break;
            }

            let stateItems = this.state.items;
            stateItems.push({componentId: component.componentId});

            this.setState({
                atualComponent: 0-this.state.atualComponent,
                items: stateItems
            });
        }
        return (
            <div className="Protocol">
                <h2>Protocolo para o paciente {params.object}</h2>
                    {items}
            </div>
        );
    }
}

export default Protocol;
