import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FindAsync } from './Store';

class FindForm extends Component {
    input = {
        fontSize:"14pt",
        color:"#006",
        padding:"0px",
    }
    btn = {
        fontsize:"12pt",
        color:"#006",
        padding:"1px 10px",
    }

    constructor(props){
        super(props);
        this.state = {
            find:''
        }
        this.doChange = this.doChange.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    doChange(e){
        this.setState({
            find: e.target.value
        });
    }

    doAction(e){
        e.preventDefault();
        // 呼び出し
        FindAsync(this.props.data, this.state.find).then(
            // 成功処理の定義
            (fdata) => {
                this.props.dispatch({
                    type: 'FIND',
                    text: this.state.find,
                    fdata: fdata
                });
            },
            // 失敗処理の定義
            error => {
                console.log(`Error:${error}`);
            }
        )
    }

    render(){
        return (
            <form onSubmit={this.doAction}>
                <input type="text" size="10" onChange={this.doChange}
                    style={this.input} value={this.state.message} />
                <input type="submit" style={this.btn} value="Find"/>
            </form>
        );
    }
}
export default connect((state)=>state)(FindForm);
