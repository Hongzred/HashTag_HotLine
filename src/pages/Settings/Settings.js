

import React, {Component} from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

const dummySettings = {
    botMessage: "Your report is in review",
    hashtags:["#abc", "#cba", "#qwe"]
};
export default class Settings extends Component {
    state = {
        botMessage:"",
        hashtags:[]
    }

    componentDidMount(){
        this.setState(dummySettings)
    }
    onMessageChange = (e) => {
        this.setState({
            botMessage:e.target.value
        })
    }

    onHashtagsChange = (e) => {
        this.setState({
            hashtags:e
        })        
    }

    onSave = (e) => {
        e.preventDefault()
        console.log("Submitted",this.state)
    }

    render(){
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 20,
                    padding: 20
                }}
            >
                <form style={{ width: "80%" }} onSubmit={this.onSave}>
                    <ChipInput
                        defaultValue={this.state.hashtags}
                        fullWidth
                        label="Hashtags"
                        placeholder="Type and press enter to add hashtags"
                        onChange={this.onHashtagsChange}
                    />
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="botMessage">
                            Bot Message
                        </InputLabel>
                        <Input id="botMessage" type="text" onChange={this.onMessageChange} value={this.state.botMessage}/>
                    </FormControl>
                    <Button variant="contained" color="primary" size="medium" type="submit">
                        Save
                    </Button>
                </form>
            </div>
    );
    } 
    
}
